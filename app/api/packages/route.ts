import { NextResponse, NextRequest } from 'next/server';

// Graph Definition
interface Edge {
    to: string;
    distance: number;
}

// Define the structure of each place node
interface PlaceNode {
    id: string;
    name: string;
    rating: number;
    location: {
        latitude: number;
        longitude: number;
    };
    photos: [];
    edges: Edge[];
}


// Haversine formula to calculate distance between two lat/long points
function haversineDistance(loc1: { latitude: number, longitude: number }, loc2: { latitude: number, longitude: number }): number {
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(loc2.latitude - loc1.latitude);
    const dLon = toRadians(loc2.longitude - loc1.longitude);
    const lat1 = toRadians(loc1.latitude);
    const lat2 = toRadians(loc2.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
}

function createGraph(hotel: any, nearbyPlaces: any[]): PlaceNode[] {
    const nodes: PlaceNode[] = [];

    // Step 1: Add the hotel as the root node
    const hotelNode: PlaceNode = {
        id: hotel.id,
        name: hotel.displayName.text,
        rating: hotel.rating,
        location: hotel.location,
        photos: hotel.photos,
        edges: []
    };
    nodes.push(hotelNode);

    // Step 2: Add nearby places as nodes
    nearbyPlaces.forEach((place) => {
        const placeNode: PlaceNode = {
            id: place.id,
            name: place.displayName.text,
            rating: place.rating,
            location: place.location,
            photos: place.photos,
            edges: []
        };

        // Calculate the distance between the hotel and this place
        const distanceToHotel = haversineDistance(hotel.location, place.location);
        
        // Add an edge from the hotel to this place and vice versa (bi-directional)
        hotelNode.edges.push({ to: placeNode.id, distance: distanceToHotel });
        placeNode.edges.push({ to: hotelNode.id, distance: distanceToHotel });

        nodes.push(placeNode);
    });

    // Step 3: Create edges between all nearby places (complete graph)
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const distance = haversineDistance(nodes[i].location, nodes[j].location);
            
            // Add edges in both directions (bi-directional)
            nodes[i].edges.push({ to: nodes[j].id, distance });
            nodes[j].edges.push({ to: nodes[i].id, distance });
        }
    }

    return nodes;
}

function createPaths(graph: PlaceNode[], pathLength: number = 5): PlaceNode[][] {
    const hotelNode = graph[0]; // Assuming the hotel is always the first node in the graph
    const nearbyNodes = graph.slice(1); // All other places except the hotel

    // Sort the nearby nodes by rating (highest first)
    const sortedNearby = nearbyNodes.sort((a, b) => b.rating - a.rating);

    // Generate paths of length 5, each starting with the hotel
    const paths: PlaceNode[][] = [];

    // Generate combinations of 4 places from the sorted nodes
    for (let i = 0; i < sortedNearby.length - (pathLength - 2); i++) {
        const path = [hotelNode];
        path.push(...sortedNearby.slice(i, i + (pathLength - 1))); // Take the next 4 highest-rated places
        paths.push(path);
    }

    return paths;
}



export async function POST(request: NextRequest) {
    // parse query
    const { query } = await request.json();

    // Make sure all necessary query parameters exist
    // console.log(query);
    if (!query) {
        return NextResponse.json({error: "Missing required params: query"}, {status: 400})
    }

    // Fetch data from google places API
    try {
        // Might have to protect this somehow so there isn't a leak on your api key
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

        // Hotel Response
        const response_hotel = await fetch('https://places.googleapis.com/v1/places:searchText',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': [
                    'places.id',
                    'places.displayName',
                    'places.rating',
                    'places.location',
                ].join(','),
            },
            body: JSON.stringify({
                textQuery: "Hotels in " + query,
                maxResultCount: 1, // Change this later because this isn't even the highest rated hotel.
            }),
        });

        // Process Hotel Response to give best Hotel Option
        const hotel_data = await response_hotel.json();
        
        const response_nearby = await fetch('https://places.googleapis.com/v1/places:searchNearby',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': [
                    'places.id',
                    'places.displayName',
                    'places.priceLevel',
                    'places.rating',
                    'places.location',
                    'places.photos',
                ].join(','),
            },
            body: JSON.stringify({
                includedTypes: ["restaurant", "tourist_attraction"],
                locationRestriction: {
                    circle: {
                        center: {
                            latitude: hotel_data["places"][0]["location"]["latitude"],
                            longitude: hotel_data["places"][0]["location"]["longitude"]
                        },
                        radius: 500,
                    }
                },
                maxResultCount: 20,
            }),
        });

        const nearby_data = await response_nearby.json();

        // Hotel Response Fails
        if (!response_hotel.ok) {
            return NextResponse.json(hotel_data, { status: response_hotel.status });
        }
        // Nearby Response Fails
        else if(!response_nearby.ok) {
            return NextResponse.json(nearby_data, { status: response_nearby.status });
        }

        // Perform Graph Creation
        const hotel = hotel_data["places"][0];
        const nearbyPlaces = nearby_data["places"];
        const graph = createGraph(hotel, nearbyPlaces);

        // Generate paths with the hotel as the root node
        const paths = createPaths(graph);
        // You can choose to not return the data if the search result is too specific and only gives one result (to avoid problems down the line)
        return NextResponse.json(paths);

    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data from Google Places API"}, {status: 500});
    }
}
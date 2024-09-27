import { NextResponse, NextRequest } from 'next/server';

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
                ].join(','),
            },
            body: JSON.stringify({
                textQuery: "Hotels in " + query,
            }),
        });

        // Process Hotel Response to give best Hotel Option
        const data = await response_hotel.json();

        // const response_nearby = await fetch('https://places.googleapis.com/v1/places:searchNearby',{
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-Goog-Api-Key': apiKey,
        //         'X-Goog-FieldMask': [
        //             'places.id',
        //             'places.displayName',
        //             'places.priceLevel',
        //             'places.rating',
        //         ].join(','),
        //     },
        //     body: JSON.stringify({
        //         includedTypes: ["restaurant"],
        //         locationRestriction: {
        //             circle: {
        //             }
        //         }
        //     }),
        // });

        // Perform Graph Creation and A* Algorithm
        
        if(!response_hotel.ok) {
            return NextResponse.json(data, { status: response_hotel.status });
        }

        // You can choose to not return the data if the search result is too specific and only gives one result (to avoid problems down the line)
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data from Google Places API"}, {status: 500});
    }
}
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
    // parse query
    const { query} = await request.json();

    // Make sure all necessary query parameters exist
    if (!query) {
        return NextResponse.json({error: "Missing required params: query and radius"}, {status: 400})
    }

    // Fetch data from google places API
    try {
        // Might have to protect this somehow so there isn't a leak on your api key
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

        const response = await fetch('https://places.googleapis.com/v1/places:searchText',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': [
                    'places.id',
                    'places.displayName',
                    'places.priceLevel',
                    'places.rating',
                ].join(','),
            },
            body: JSON.stringify({
                textQuery: query,
                languageCode: 'en',
            }),
        });

        const data = await response.json();

        // Perform Graph Creation and A* Algorithm
        
        if(!response.ok) {
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json({error: "Failed to fetch data from Google Places API"}, {status: 500});
    }
}
'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "../components/spinner";

export default function PackageList() {
    const [search, setSearch] = useState("");
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Search Handler
    const handleSearch = async () => {
        setLoading(true); // You can add a loading icon animation thing for this

        try {
            const response = await fetch('/api/packages', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: "tourist places in " + search }), // Send the search term to the API
            });
        
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
        
            const data = await response.json();
            setResultData(data); // Set the result data from the API call
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // handleSearch();
        }
    };

    return (
        <div>
            <div className="flex w-full h-[40vh] bg-[#FAF9F6] pt-10 justify-center items-center relative">
                <h2 className="text-4xl font-semibold mb-[20vh]">Find Packages Now</h2>
                <div className="absolute w-[35%] h-8 bg-[#d1cfc9] rounded-full flex items-center px-4">
                    <img
                    className="w-5 h-5"
                    src="search_icon.png"
                    alt=""
                    />
                    <Input className="outline-none border-none p-3" 
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
                <h3 className="absolute text-orange-500 text-xs font-medium mt-[10vh]">*Enter the name of the country or city you want to visit</h3>
            </div>
            <div className="flex-col w-full h-full">
                <p className="text-black">{search}</p>
                {loading && <LoadingSpinner className="ml-[50vw]"/>}
                {/* {loading && <p className="text-black">Loading...</p>} */}
                {/* {resultData && <p className="text-black">{JSON.stringify(resultData)}</p>} */}
            </div>
        </div>
    )
}
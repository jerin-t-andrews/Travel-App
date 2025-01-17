'use client'

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "../components/spinner";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import supabase from '../../supabase';
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import Navbar from "../components/navbar";

interface ResultData {
    id: string;
    name: string;
    rating: number;
    location: {
        latitude: number;
        longitude: number;
    };
    photos: [];
    edges: {
        to: string;
        distance: number;
    }[];
}

export default function PackageList() {
    const [search, setSearch] = useState("");
    const [resultData, setResultData] = useState<ResultData[][]>([]);
    const [loading, setLoading] = useState(false);
    const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;

    const searchParams = useSearchParams()
    const loc = searchParams.get("loc")
    
    // Search Handler
    const handleSearch = async (search: string) => {
        setLoading(true); // You can add a loading icon animation thing for this

        try {
            const response = await fetch('/api/packages', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: search }), // Send Location for the API (API will get all relevant data and form graph)
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

    async function updateSavedPackages(index: number) {
        const selected_package = resultData[index]

        var check = undefined;
        try {
            check = await (await supabase.auth.getSession()).data.session?.user;
            console.log(check?.id);
        } catch(error) {
            console.error('Error fetching user state:', error)
        }

        try {
            const response = await fetch('/api/add-package', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_id: check?.id, new_package: selected_package})
            });
        
            if (!response.ok) {
                throw new Error('Failed to add package');
            }

            toast("Package saved!")
        } catch (error) {
            console.error('Error updating data:', error);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch(search);
        }
    };

    useEffect(() => {
        if (loc) {
            setSearch(loc);
            console.log(loc);
            handleSearch(loc);
        }
    }, [loc]);

    return (
        <div>
            <div className="flex w-full h-[40vh] bg-[#FAF9F6] pt-10 justify-center items-center relative">
                <Button asChild variant="outline" size="icon" className="absolute w-8 h-8 mr-[95vw] mb-[35vh]">
                    <Link href="/" className="flex items-center"> 
                        <ChevronLeft className="h-6 w-6"/> 
                    </Link>
                </Button>
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
                <h3 className="absolute text-orange-500 text-xs font-medium mt-[10vh]">*Enter the name of the city you want to visit</h3>
            </div>
            <div className="flex-col w-full h-full">
                {loading && <LoadingSpinner className="ml-[50vw]"/>}
                {/* {loading && <p className="text-black">Loading...</p>} */}
                {/* {resultData && <p className="text-black">{JSON.stringify(resultData)}</p>} */}
                {resultData ? (
                    resultData.map((package_list, package_index) => (
                        <div key={package_index} className="flex justify-center items-center gap-5 py-10">
                            {package_list.map((object) => (
                                // {style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/place/photo?photoreference=${}&sensor=false&maxheight=${}&maxwidth=${}&key=${}')` }}}
                                <Card className="relative rounded-xl w-[250px] h-[250px] bg-cover bg-center" >
                                    <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex flex-col justify-between items-center py-2">
                                        <h2 className="text-white font-bold text-md text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{object.name}</h2>
                                        {(object && object.photos) ? (
                                            <div className="flex justify-center items-center">
                                                <img 
                                                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${object?.photos[0]?.name.slice(42)}&key=${googleAPIKey}`}
                                                    className="w-[230px] h-[200px] object-cover rounded-lg"
                                                    alt={object.name}
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex justify-center items-center">
                                                <img
                                                    src="hotel_icon.png"
                                                    className="w-[150px] h-[150px] object-cover rounded-lg"
                                                    alt={object.name}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Card>
                            ))}
                            <Button 
                                variant="outline" 
                                className="rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 ease-in-out"
                                // onClick={()=>{console.log(package_index)}}
                                onClick={() => updateSavedPackages(package_index)}
                                >
                                +
                            </Button>
                        </div>
                    ))
                ) : (
                    !loading && <p>No results found</p>
                )}
            </div>
        </div>
    )
}
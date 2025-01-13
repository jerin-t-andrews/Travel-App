'use client'
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "../components/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from 'next/navigation'
import supabase from "../../supabase"

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

export default function Dashboard() {
    const [userData, setUserData] = useState<any>(null);
    const [packages, setPackages] = useState<ResultData[][]>([]);
    const [loading, setLoading] = useState(true);
    const googleAPIKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string;
    const router = useRouter()

    async function getPackages() {
        const fetchData = async () => {
            const check = (await supabase.auth.getSession()).data.session?.user
            setUserData(check?.user_metadata);

            try {
                const response = await fetch('/api/get-packages', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({user_id: check?.id}),
                });

                if (!response.ok) {
                    throw new Error('Failed to get packages!');
                }

                const data = await response.json()
                setPackages(data)
            } catch(error) {
                console.error('Error Getting Packages:', error);
            }
        };
        fetchData();
    }

    useEffect(() => {
        getPackages();
        setLoading(false);
    }, []);

    async function deletePackage(index: number) {
        var check = undefined;
        try {
            check = await (await supabase.auth.getSession()).data.session?.user;
            console.log(check?.id);
        } catch(error) {
            console.error('Error fetching user state:', error)
        }

        try {
            const response = await fetch('/api/delete-package', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({user_id: check?.id, package_index: index})
            });
        
            if (!response.ok) {
                throw new Error('Failed to delete package');
            }

            toast("Package removed!")
        } catch (error) {
            console.error('Error updating data:', error);
        } finally {
            getPackages();
        }
    }
    
    return (
        <div className="min-h-screen bg-[#FAF9F6] flex">
            <div className="w-[15vw] min-h-screen bg-[#294530] flex flex-col items-center gap-5">
                <h1 className="text-4xl mt-20 text-[#FAF9F6]">
                    VOYAGR
                </h1>

                <Button className="bg-white rounded-md" onClick={()=>{router.push("/");}}> 
                    <h1>
                        Home
                    </h1>
                </Button>
            </div>
            <div className="w-[85vw] min-h-screen bg-[#e8ebe9] flex flex-col items-center">
                <h1 className="text-4xl mt-10 text-[#363636]">
                    Saved Packages
                </h1>
                <div className="w-[85vw] min-h-screen bg-white mt-10">
                    {loading && <LoadingSpinner className="ml-[50%] mt-4"/>}
                    {packages ? (packages.map((package_list, package_index) => (
                        <div key={package_index} className="flex justify-center items-center gap-5 py-7">
                            {package_list.map((object) => (
                                <Card className="relative rounded-xl w-[220px] h-[220px] bg-cover bg-center" >
                                <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex flex-col justify-between items-center py-2">
                                    <h2 className="text-white font-bold text-md text-center overflow-hidden text-ellipsis whitespace-nowrap max-w-full">{object.name}</h2>
                                    {(object && object.photos) ? (
                                        <div className="flex justify-center items-center">
                                            <img 
                                                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${object?.photos[0]?.name.slice(42)}&key=${googleAPIKey}`}
                                                className="w-[200px] h-[170px] object-cover rounded-lg"
                                                alt={object.name}
                                            />
                                        </div>
                                    ) : (<p>No Image</p>)}
                                </div>
                                </Card>
                            ))}
                            <Button 
                                variant="outline" 
                                className="rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 ease-in-out"
                                // onClick={()=>{console.log(package_index)}}
                                onClick={() => deletePackage(package_index)}
                                >
                                -
                            </Button>
                        </div>
                    ))) 
                    : 
                    (<p> No Saved Packages </p>)}
                </div>
            </div>
        </div>
    )
}
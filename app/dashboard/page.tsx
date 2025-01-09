'use client'
import { useEffect, useState } from "react";
import supabase from "../../supabase"

export default function Dashboard() {
    const [userData, setUserData] = useState<any>(null);
    const [packages, setPackages] = useState<any>(null);

    useEffect(() => {
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
    }, []);
    
    return (
        <div className="w-full h-screen bg-[#FAF9F6] flex">
            <div className="w-[15vw] h-screen bg-[#294530] flex flex-col items-center">
                {userData ? <h1 className="text-4xl mt-20 text-[#FAF9F6]">
                    VOYAGR
                </h1> : 
                <h1> 
                    ERROR NO USER
                </h1>}
            </div>
            <div className="w-[85vw] h-screen bg-[#e8ebe9] flex flex-col items-center">
                {userData ? 
                <h1 className="text-4xl mt-10 text-[#363636]">
                    Saved Packages
                </h1> : 
                <h1 className="text-4xl mt-20 text-[#363636]"> 
                    No Saved Items!
                </h1>}
                <div className="w-[85vw] h-[100vh] bg-white mt-10">
                    {packages ? (<p> YES Package </p>) 
                    : 
                    (<p> null packages </p>)}
                </div>
            </div>
            {/* <p>WELCOME!</p>
            {data ? (<p>{data.username}</p>):(<p>No Data</p>)} */}
        </div>
    )
}
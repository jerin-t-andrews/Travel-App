'use client'
import { useEffect, useState } from "react";
import supabase from "../../supabase"

export default function Dashboard() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const check = (await supabase.auth.getSession()).data.session?.user
            setData(check?.user_metadata);
        };
        fetchData();
    }, []);
    
    return (
        <div className="w-full h-screen bg-[#FAF9F6] flex">
            <div className="w-[25vw] h-screen bg-[#294530] flex flex-col items-center">
                {data ? <h1 className="text-4xl mt-48 text-[#FAF9F6]">
                    WELCOME {data.first_name}!
                </h1> : 
                <h1> 
                    WELCOME, USER 
                </h1>}
            </div>
            <div className="w-[75vw] h-screen bg-[#e8ebe9]">
                
            </div>
            {/* <p>WELCOME!</p>
            {data ? (<p>{data.username}</p>):(<p>No Data</p>)} */}
        </div>
    )
}
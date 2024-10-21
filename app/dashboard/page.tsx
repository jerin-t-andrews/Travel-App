'use client'
import { useEffect, useState } from "react";
import supabase from "../../supabase"

export default function Dashboard() {
    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
        const check = (await supabase.auth.getSession()).data.session?.user
        setData(check!.email as string);
    };
        fetchData();
    }, []);
    
    return (
        <div>
            <p>WELCOME!</p>
            {data ? (<p>{data}</p>):(<p>No Data</p>)}
        </div>
    )
}
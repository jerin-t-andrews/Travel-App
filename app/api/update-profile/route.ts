import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../supabase"

export async function POST(request: NextRequest) {
    const { user_id, new_package } = await request.json();
    try {
        const {data, error} = await supabase.from("profiles").select("saved_packages").eq("id", user_id).single();

        if (error) { console.error(error); } else { console.log("data:\n", data); }

        const currentPackages = data?.saved_packages?.packages || []; 
        console.log(currentPackages)
        const updatedPackages = [...currentPackages, new_package];
        
        const { data: dataU, error: errorU} = await supabase.from("profiles").update({saved_packages: {packages: updatedPackages}}).eq("id", user_id).select();
        if (errorU) { console.error("Error 2:", errorU); } else { console.log("dataU:\n ", dataU); }
        return NextResponse.json(data)
    } catch {
        console.log("Failed Update");
        return NextResponse.json({error: "Failed to update profile database"}, {status: 500})
    }
}
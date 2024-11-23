import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../supabase"

export async function POST(request: NextRequest) {
    const { user_id } = await request.json();
    try {
        const {data, error} = await supabase.from("profiles").select("saved_packages").eq("id", user_id).single();
        console.log(data);
        const new_package = ["yes", "no"]
        const currentPackages = data?.saved_packages || []; 
        const updatedPackages = [...currentPackages, new_package];
        // FOR THIS TO WORK YOU NEED TO SETUP THE CORRECT POLICY FOR UPDATE
        const { data: updatedData, error: updatedError } = await supabase.from('profiles').update({ saved_packages: updatedPackages}).eq('id', user_id).select()
        if (updatedError) {
            console.error("Error:", updatedError);
        } else {
            console.log(updatedData);
        }

        return NextResponse.json(data)
    } catch {
        console.log("Failed Update");
        return NextResponse.json({error: "Failed to update profile database"}, {status: 500})
    }
}
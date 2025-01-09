import { NextRequest, NextResponse } from "next/server";
import supabase from "../../../supabase"

export async function POST(request: NextRequest) {
    const { user_id } = await request.json();
    try {
        const {data, error} = await supabase.from("profiles").select("saved_packages").eq("id", user_id).single();
        //if (error) { console.error(error); } else { console.log("data:\n", data); }
        console.log(data?.saved_packages?.packages)
        return NextResponse.json(data?.saved_packages?.packages[0])
    } catch {
        console.log("Failed Update");
        return NextResponse.json({error: "Failed to update profile database"}, {status: 500})
    }
}
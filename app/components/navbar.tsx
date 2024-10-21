// import { Box, Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link"
import supabase from "../../supabase"

export default function Navbar() {
    return(
        <div className="fixed w-full flex justify-between items-center bg-[#FAF9F6] px-2 py-0 h-[60px] z-[99]">
            <div className="flex-shrink-0">
                <img
                    src="TravelLogo.svg"
                    alt="Logo"
                    className="h-[40px]"
                />  
            </div>
            <div className="flex justify-center items-center absolute left-1/2 transform -translate-x-1/2 flex-grow">
                <Button variant="ghost" className="bg-transparent text-neutral-700 h-[60px] px-4">About</Button>
                <Button variant="ghost" className="bg-transparent text-neutral-700 h-[60px] px-4">Trips</Button>
                <Button variant="ghost" className="bg-transparent text-neutral-700 h-[60px] px-4">Review</Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="bg-transparent text-neutral-700 h-[60px] px-4">More</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white shadow-md p-2">
                        <DropdownMenuItem>Item 1</DropdownMenuItem>
                        <DropdownMenuItem>Item 2</DropdownMenuItem>
                        <DropdownMenuItem>Item 3</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex flex-shrink-1 ml-2">
                <Link href="/sign-in">
                    <Button className="border-neutral-700 border-[1.5px] rounded-lg text-neutral-700 mx-1 px-4 py-1">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                    <Button className="border-neutral-700 border-[1.5px] rounded-lg text-neutral-700 mx-1 px-4 py-1">Sign Up</Button>
                </Link>
            </div>
        </div>
    )
}
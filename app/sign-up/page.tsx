//import { Box, Button, Input, Typography } from "@mui/joy";
'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import supabase from "../../supabase"
import { useState } from "react"
import { useRouter } from 'next/navigation'

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");

    const router = useRouter();

    // Sign Up Supabase Connection
    const handleSignUp = async(email: string, password: string, username: string, first: string, last: string) => {
        try {
            // Using auth schema
            // const { data, error } = await supabase.auth.signUp({
            //     email: email,
            //     password: password,

            // });

            // Using Public Schema
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        first_name: first,
                        last_name: last,
                        username: username,
                    },
                },
            })
    
            if (error) {
                console.error('Sign-up error:', error.message);
                alert(`Sign-up error: ${error.message}`);
            } else {
                console.log('Sign-up successful:', data);
                router.push("/");
            }
        } catch (err) {
            console.error('Error during sign-up:', err);
        }
    }

    return(
        <div className="w-full h-screen bg-[#FAF9F6] flex">
            <div className="w-[60vw] h-screen flex justify-center items-center bg-gradient-to-br from-[#014000] via-[#4c7041] to-[#23d5ab] animate-moveGradient"> 
                <style jsx>{`
                    @keyframes moveGradient {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-moveGradient {
                        background-size: 400% 400%;
                        animation: moveGradient 15s ease infinite;
                    }
                `}</style>
            </div>
            <div className="w-[40vw] h-screen flex flex-col justify-center items-center">
                <Button asChild variant="outline" size="icon" className="absolute w-8 h-8 mb-[92vh] mr-[35vw]">
                    <Link href="/" className="flex items-center"> 
                        <ChevronLeft className="h-6 w-6"/> 
                    </Link>
                </Button>
                <div className="flex flex-col justify-center items-center w-[40vw] gap-2 mb-3 pb-4 pt-2">
                    <h1 className="mb-12 text-5xl font-bold text-[#333]"> 
                        Sign Up
                    </h1>
                    <Input
                        placeholder="Username"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <Input
                        placeholder="Email"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <Input
                        placeholder="First Name"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setFirst(e.target.value)}
                    />

                    <Input
                        placeholder="Last Name"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setLast(e.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button 
                        className="w-[50%] p-2 mt-3 rounded-[8px] bg-[#e0e0e0] transition-all duration-300 hover:bg-[#d0d0d0] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] active:bg-[#c0c0c0] active:shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                        onClick={() => handleSignUp(email, password, username, first, last)}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    )
}
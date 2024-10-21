'use client'
// import { Box, Button, Input, Typography } from "@mui/joy";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import supabase from "../../supabase"
import Link from "next/link"
import { useRouter } from 'next/navigation'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    // Sign In Supabase Connection
    const handleSignIn = async(email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
    
            if (error) {
                console.error('Sign-in error:', error.message);
                alert(`Sign-in error: ${error.message}`);
            } else {
                console.log('Sign-in successful:', data);
                const check = (await supabase.auth.getSession()).data.session?.user
                console.log(check);
                router.push("/");
            }
        } catch (err) {
            console.error('Error during sign-in:', err);
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
                        Sign In
                    </h1>
                    <Input
                        placeholder="Email"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        placeholder="Password"
                        className="w-[50%] p-2 rounded-[8px] bg-[#F7F7F7] border border-[#E0E0E0] transition-all duration-300 hover:border-[#B0B0B0] focus:border-[#000000] focus:shadow-[0_0_5px_rgba(0,0,0,0.5)] outline-none"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button 
                        className="w-[50%] p-2 mt-3 rounded-[8px] bg-[#e0e0e0] transition-all duration-300 hover:bg-[#d0d0d0] hover:shadow-[0_2px_4px_rgba(0,0,0,0.1)] active:bg-[#c0c0c0] active:shadow-[0_2px_4px_rgba(0,0,0,0.2)]"
                        onClick={() => handleSignIn(email, password)}
                        >
                        Sign In
                    </Button>
                </div>
            </div>
        </div>
    )
}
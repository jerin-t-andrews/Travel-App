import Image from "next/image";

import Navbar from "./components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import supabase from "../supabase"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center">
        <img
          className="max-w-full mt-[-60px]" // Tailwind for max-width and margin-top
          src="home_page_img.jpeg"
          alt=""
        />

        <div className="absolute flex flex-col justify-center items-start w-[30vw] z-10 mr-[35vw] mb-[18vh]">
          <h1 className="text-[#FAF9F6] text-[3rem] font-bold">
            Travel With Us
          </h1>
          <p className="font-medium ml-2 mb-3 text-[#10614e] text-xl">
            Say hello to the world with our Package Plans!
          </p>
        
          <Button asChild className="flex bg-[#00C0A6] w-[30%] h-8 text-white py-2 px-5 rounded-[25px] text-sm hover:bg-[#009980]">
            <Link href="/sign-up">
              Sign Up Now
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex w-full h-[58vh] p-8 gap-6 justify-center items-center bg-[#FAF9F6]">
        <Card className="relative rounded-xl w-[450px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Feature</h2>
          </div>
        </Card>
        
        <Card className="relative rounded-xl w-[450px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Feature</h2>
          </div>
        </Card>

        <Card className="relative rounded-xl w-[450px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Feature</h2>
          </div>
        </Card>
      </div>

      

      <div className="flex w-full h-[40vh] bg-[#FAF9F6] pt-10 justify-center items-center relative">
        <h2 className="text-4xl font-semibold mb-[20vh]">Find Packages Now</h2>
        <div className="absolute w-[35%] h-8 bg-[#d1cfc9] rounded-full flex items-center px-4">
          <img
            className="w-5 h-5"
            src="search_icon.png"
            alt=""
          />
          <Input className="outline-none border-none p-3">
          </Input>
        </div>
      </div>

      <div className="flex w-full h-[80vh] bg-[#FAF9F6] pt-7 gap-6 justify-center items-center">
        <Card className="relative rounded-xl w-[450px] h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Review</h2>
          </div>
        </Card>
        
        <Card className="relative rounded-xl w-[450px] h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Review</h2>
          </div>
        </Card>

        <Card className="relative rounded-xl w-[450px] h-[500px] bg-cover bg-center" style={{ backgroundImage: "url('/chin_tour.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex justify-center items-center">
            <h2 className="text-white font-bold text-lg">Review</h2>
          </div>
        </Card>
      </div>

      <div className="flex w-full h-[40vh] bg-[#FAF9F6]">
        <h2 className="text-2xl font-semibold">Footer</h2>
      </div>
    </div>
  );
}

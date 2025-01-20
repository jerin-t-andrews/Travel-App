'use client'
import Image from "next/image";

import Navbar from "./components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import supabase from "../supabase"
import { useRouter } from 'next/navigation'
import Star from "@/components/ui/star";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("")
  const router = useRouter()

  const [data, setData] = useState<any>(null);

  useEffect(() => {
      const fetchData = async () => {
          const check = (await supabase.auth.getSession()).data.session?.user
          setData(check?.user_metadata);
      };
      fetchData();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        if (data) {
          e.preventDefault()
          const url = `/package-list?loc=${encodeURIComponent(search)}`;
          router.push(url)
        } else {
          const url = `/sign-in`;
          router.push(url)
        }
    }
  };  

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
        <Card className="relative rounded-xl w-[475px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/china_feature.png')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
            <h2 className="text-white font-bold text-3xl mb-14">Search</h2>
            <h2 className="text-white font-extralight text-base px-16 text-center">Search to create packages from 200+ million locations around the world</h2>
          </div>
        </Card>
        
        <Card className="relative rounded-xl w-[475px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/feature_image_4.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
            <h2 className="text-white font-bold text-3xl mb-14">Save</h2>
            <h2 className="text-white font-extralight text-base px-16 text-center">Save your favorite travel packages and access them anytime</h2>
          </div>
        </Card>

        <Card className="relative rounded-xl w-[475px] h-[400px] bg-cover bg-center" style={{ backgroundImage: "url('/feature_image_3.jpg')" }}>
          <div className="absolute rounded-xl inset-0 bg-black bg-opacity-30 flex flex-col justify-center items-center">
            <h2 className="text-white font-bold text-3xl mb-14">Travel</h2>
            <h2 className="text-white font-extralight text-base px-16 text-center">Turn your dream itinerary into reality with personalized travel plans</h2>
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
          <Input className="outline-none border-none p-3" 
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <h3 className="absolute text-orange-500 text-xs font-medium mt-[10vh]">*Enter the name of the city you want to visit</h3>
        </div>
      </div>

      <div className="flex w-full h-[80vh] bg-[#FAF9F6] pt-7 gap-6 justify-center items-center">
        <Card className="relative rounded-xl w-[450px] h-[500px] bg-[#ececec] border-transparent">
          <div className="absolute rounded-xl inset-0 flex flex-col items-center">
            <div className="flex flex-row w-full h-[40%] items-center">
              <img
                src="question_guy.jpg"
                alt="person"
                className="rounded-full w-[100px] h-[150px] object-cover ml-6"
              />
            </div>
            <div className="flex flex-col w-full h-[30%] items-center gap-3">
              <h2 className="text-black font-bold text-lg">"Travel Planning Made Simple"</h2>
              <h4 className="text-gray-700 text-base px-7">
                "I’ve always found travel planning overwhelming, but this website changed everything. In just a few clicks, I had a complete plan ready, including hotels and top-rated attractions."
              </h4>
            </div>
            <div className="flex flex-row w-full justify-center mt-10"> 
              <div className="flex gap-1">
                <Star viewOnly filled rating={1}/>
                <Star viewOnly filled rating={2}/>
                <Star viewOnly filled rating={3}/>
                <Star viewOnly filled rating={4}/>
                <Star viewOnly filled rating={5}/>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="relative rounded-xl w-[450px] h-[500px] bg-[#ececec] border-transparent">
          <div className="absolute rounded-xl inset-0 flex flex-col items-center">
            <div className="flex flex-row w-full h-[40%] items-center">
              <img
                src="guy_image.jpg"
                alt="person"
                className="rounded-full w-[125px] h-[125px] object-cover object-center ml-6"
              />
            </div>
            <div className="flex flex-col w-full h-[30%] items-center gap-3">
              <h2 className="text-black font-bold text-lg">"Perfect for Last-Minute Trips!"</h2>
              <h4 className="text-gray-700 text-base px-7">
                "I needed a quick getaway, and this site planned everything seamlessly! The travel packages were well-organized, and I loved the recommended attractions. Will definitely use it again!"
              </h4>
            </div>
            <div className="flex flex-row w-full justify-center mt-10"> 
              <div className="flex gap-1">
                <Star viewOnly filled rating={1}/>
                <Star viewOnly filled rating={2}/>
                <Star viewOnly filled rating={3}/>
                <Star viewOnly filled rating={4}/>
                <Star viewOnly filled rating={5}/>
              </div>
            </div>
          </div>
        </Card>

        <Card className="relative rounded-xl w-[450px] h-[500px] bg-[#ececec] border-transparent">
          <div className="absolute rounded-xl inset-0 flex flex-col items-center">
            <div className="flex flex-row w-full h-[40%] items-center">
              <img
                src="woman_headshot.jpg"
                alt="person"
                className="rounded-full w-[150px] h-[100px] object-cover ml-6"
              />
            </div>
            <div className="flex flex-col w-full h-[30%] items-center gap-3">
              <h2 className="text-black font-bold text-lg">"Incredible User Experience"</h2>
              <h4 className="text-gray-700 text-base px-7">
                "The interface is super intuitive, and the recommendations felt like they were curated just for me. I saved so much time and discovered hidden gems on my trip!"
              </h4>
            </div>
            <div className="flex flex-row w-full justify-center mt-10"> 
              <div className="flex gap-1">
                <Star viewOnly filled rating={1}/>
                <Star viewOnly filled rating={2}/>
                <Star viewOnly filled rating={3}/>
                <Star viewOnly filled rating={4}/>
                <Star viewOnly filled rating={5}/>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-center w-full h-[20vh] bg-[#8fbda5]">
        <div className="flex flex-col h-full justify-center items-center px-5">
          <img
            src="TravelLogo.svg"
            alt="Logo"
            className="w-[75px] h-[75px]"
          />
          <h1 className="font-bold">
            Voyagr
          </h1>
        </div>
        <div className="flex h-full justify-center items-center">
          <Button onClick={()=>{
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }}>
            <h2 className="text-xl font-light">Back to Top</h2>
          </Button>
        </div>
        <div className="flex flex-col h-full justify-center items-center px-5">
          <h2>Contact Me</h2>
          <Link target="_blank" href="https://www.linkedin.com/in/jerin-t-andrews/">
            <Button>
              <img
                src="linkedin_logo.png"
                alt="LinkedIn"
                className="w-[30px] h-[30px]"
              />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

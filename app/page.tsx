import Image from "next/image";

import Navbar from "./components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";



export default function Home() {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center">
        <img
          className="max-w-full mt-[-50px]" // Tailwind for max-width and margin-top
          src="home_page_img.jpeg"
          alt=""
        />

        <div className="absolute flex flex-col justify-center items-start w-[30vw] z-10 mr-[35vw] mb-[16vh]">
          <h1 className="text-[#f5f5f5] text-[3.5rem] font-bold">
            Travel With Us
          </h1>
          <p className="font-medium ml-2 mb-3 text-[#f5f5f5] text-xl">
            Say hello to the world with our Package Plans!
          </p>
        
          <Button asChild className="flex bg-[#00C0A6] w-[40%] text-white py-2 px-5 rounded-[25px] text-base hover:bg-[#009980]">
            <Link href="/sign-up">
              Sign Up for Free
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex w-full h-[50vh] bg-[#f5f5f5]">
        <h2 className="text-2xl font-semibold">Popular Packages</h2>
      </div>

      <div className="flex w-full h-[50vh] bg-[#f5f5f5]">
        <h2 className="text-2xl font-semibold">User Reviews</h2>
      </div>

      <div className="flex w-full h-[40vh] bg-[#f5f5f5]">
        <h2 className="text-2xl font-semibold">Footer</h2>
      </div>
    </div>
  );
}

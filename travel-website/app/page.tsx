import Image from "next/image";
import Navbar from "./navbar";
import { Box, Typography } from "@mui/joy";
import AspectRatio from "@mui/joy";

export default function Home() {
  return (
    <Box>
      <Navbar/>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          style={{
            maxWidth: "100%",
            marginTop: "-50px"
          }}
          src="home_page_img.jpeg"
          alt=""
        />
        <Typography level="h1" sx={{color: "#F7F8FA", ml: "-600px", mt: "-150px"}} position="absolute">Travel With Us</Typography>
        <Typography level="title-lg" sx={{color: "#F7F8FA", ml: "-440px", mt: "-50px"}} position="absolute">Say hello to the world with our Package Plans!</Typography>
      </Box>

    </Box>
  );
}

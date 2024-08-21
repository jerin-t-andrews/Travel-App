import Image from "next/image";
import Navbar from "./navbar";
import { Box } from "@mui/joy";
import AspectRatio from "@mui/joy";

export default function Home() {
  return (
    <Box>
      <Navbar/>
      <img
        style={{
          maxWidth: "100%",
          marginTop: "-50px"
        }}
        src="home_page_img.jpeg"
        alt=""
      />
    </Box>
  );
}

import Image from "next/image";
import { Box } from "@mui/material";
import Navbar from "./navbar";

export default function Home() {
  return (
    <Box>
      <Navbar/>
      <img
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          marginTop: "-40px"
        }}
        src="home_page_img.jpeg"
        alt=""
      />
    </Box>
  );
}

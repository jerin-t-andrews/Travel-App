import Image from "next/image";
import Navbar from "./navbar";
import { Box, Typography, Button} from "@mui/joy";
import AspectRatio from "@mui/joy";
import Link from "next/link";
import Login from "./login";


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
        {/* <button className="signup-button">Sign Up for Free</button> */}
        <Button sx={{
          bgcolor: "#00C0A6",
          position: "absolute",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "25px",  
          fontSize: "16px",      
          cursor: "pointer",
          marginTop: "80px",
          marginLeft: "-670px",
          transition: "background-color 0.3s ease",
          '&:hover': {
            bgcolor: "#009980",
          },
        }}>Sign Up for Free</Button>
      </Box>

    </Box>
  );
}

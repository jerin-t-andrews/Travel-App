import Image from "next/image";
import Navbar from "./components/navbar";
import { Box, Typography, Button} from "@mui/joy";
import Link from "next/link";



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

        <Box width="30vw" position="absolute" display="flex" flexDirection="column" justifyContent="center" alignItems="left" gap={0.5} zIndex={1} mr={80} mb={15}>
          <Typography level="h1" sx={{color: "#f5f5f5", fontSize: '3.5rem', fontWeight: "bold"}}>
            Travel With Us
          </Typography>
          <Typography level="title-lg" ml={0.5} mb={3} sx={{color: "#f5f5f5",}}>
            Say hello to the world with our Package Plans!
          </Typography>
        
          <Button component={Link} href="/sign-up" sx={{
            bgcolor: "#00C0A6",
            width: "45%",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "25px",  
            fontSize: "16px",      
            cursor: "pointer",
            transition: "background-color 0.3s ease",
            '&:hover': {
              bgcolor: "#009980",
            },
          }}>Sign Up for Free</Button>
        </Box>
      </Box>

      <Box display="flex" width="100vw" height="50vh" bgcolor="#f5f5f5">
        <Typography level="h2">Popular Packages</Typography>
      </Box>

      <Box display="flex" width="100vw" height="50vh" bgcolor="#f5f5f5">
        <Typography level="h2">User Reviews</Typography>
      </Box>

      <Box display="flex" width="100vw" height="40vh" bgcolor="#f5f5f5">
        <Typography level="h2">Footer</Typography>
      </Box>
    </Box>
  );
}

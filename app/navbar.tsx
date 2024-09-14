import { Box, Button, Dropdown, MenuButton, Menu, MenuItem } from "@mui/joy"
import Link from "next/link"

export default function Navbar() {
    return(
        <Box display="flex" position="fixed" width="100vw" justifyContent="space-between" alignItems="center" bgcolor="white" px={2} py={0} height="60px">
            <Box flexShrink={0} mt={0.5}>
                <img
                    src="TravelLogo.svg"
                    alt=""
                    style={{
                        height: "40px",
                        objectFit: "contain",
                    }}
                />  
            </Box>
            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1} position="absolute" left="50%" sx={{ transform: "translate(-50%)"}}>
                <Button variant="plain" color="neutral" sx={{height: "60px"}}>About</Button>
                <Button variant="plain" color="neutral" sx={{height: "60px"}}>Trips</Button>
                <Button variant="plain" color="neutral" sx={{height: "60px"}}>Review</Button>
                <Dropdown>
                    <MenuButton variant="plain" color="neutral" sx={{height: "50px"}}>More</MenuButton>
                    <Menu variant="plain" size="sm">
                        <MenuItem>Item 1</MenuItem>
                        <MenuItem>Item 2</MenuItem>
                        <MenuItem>Item 3</MenuItem>
                    </Menu>
                </Dropdown>
            </Box>
            <Box display="flex" flexShrink={1} ml={2}>
                <Link href="/sign-in">
                    <Button variant="outlined" color="neutral" sx={{mx: 0.4}}>Sign In</Button>
                </Link>
                <Link href="/sign-up">
                    <Button variant="outlined" color="neutral" sx={{mx: 0.4}}>Sign Up</Button>
                </Link>
            </Box>
        </Box>
    )
}
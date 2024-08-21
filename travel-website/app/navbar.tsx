import { Box, Button } from "@mui/joy"

export default function Navbar() {
    return(
        <Box display="flex" position="fixed" width="100vw" justifyContent="center" alignItems="center" bgcolor="white">
            <Button variant="plain" color="neutral" sx={{height: "50px"}}>Button 1</Button>
            <Button variant="plain" color="neutral" sx={{height: "50px"}}>Button 1</Button>
            <Button variant="plain" color="neutral" sx={{height: "50px"}}>Button 1</Button>
        </Box>
    )
}
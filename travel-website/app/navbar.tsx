import { Box, Button } from "@mui/material"

export default function Navbar() {
    return(
        <Box position="fixed" width="100vw" display="flex" paddingTop="5px" paddingBottom="5px" justifyContent="center" alignItems="center" bgcolor="white">
            <Button disableRipple sx={{color: "black", marginRight: "20px", height: "100%"}} variant="text">Button 1</Button>
            <Button disableRipple sx={{color: "black", marginRight: "20px"}} variant="text">Button 2</Button>
            <Button disableRipple sx={{color: "black", marginRight: "20px"}} variant="text">Button 3</Button>
        </Box>
    )
}
import { Box, Button, Input, Typography } from "@mui/joy";

export default function Register() {
    return(
        <Box width="100vw" height="100vh" bgcolor="#FAF9F6" display="flex">
            <Box width="60vw" height="100vh" sx={{
                background: 'linear-gradient(135deg, #014000, #dfffd6)', // Initial gradient
                backgroundSize: '400% 400%', // Increased size for smooth animation
                animation: 'moveGradient 8s ease-in-out infinite', // Gradient animation
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '@keyframes moveGradient': {
                    '0%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                    '100%': { backgroundPosition: '0% 50%' },
                },
            }}>
            </Box>
            <Box width="40vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="40vw" gap={2} mb={3} paddingBottom={4} paddingTop={2}>
                    <Typography level="h1" mb={4.5} sx={{
                            fontSize: '3rem',
                            fontWeight: 'bold',
                            color: '#333', 
                        }}> 
                        Sign Up
                    </Typography>
                    <Input
                        placeholder="Email"
                        size="sm"
                        sx={{
                            width: '50%',
                            padding: '10px',
                            borderRadius: '8px',
                            backgroundColor: '#F7F7F7', // Light background for two-tone effect
                            border: '1px solid #E0E0E0', // Light border
                            // boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inner shadow
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#B0B0B0', // Slightly darker border on hover
                            },
                            '&:focus': {
                                borderColor: '#00aaff', // Blue border on focus
                                boxShadow: '0 0 5px rgba(0, 170, 255, 0.5)', // Outer shadow on focus
                                outline: 'none',
                            },
                        }}
                    />

                    <Input
                        placeholder="Password"
                        size="sm"
                        sx={{
                            width: '50%',
                            padding: '10px',
                            borderRadius: '8px',
                            backgroundColor: '#F7F7F7', // Light background for two-tone effect
                            border: '1px solid #E0E0E0', // Light border
                            // boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)', // Subtle inner shadow
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                borderColor: '#B0B0B0', // Slightly darker border on hover
                            },
                            '&:focus': {
                                borderColor: '#00aaff', // Blue border on focus
                                boxShadow: '0 0 5px rgba(0, 170, 255, 0.5)', // Outer shadow on focus
                                outline: 'none',
                            },
                        }}
                    />

                    <Button variant="soft" color="neutral" sx={{
                        width: '50%',
                        padding: '10px',
                        marginTop: 3,
                        borderRadius: '8px',
                        transition: 'all 0.3s ease', // Slow hover effect
                        backgroundColor: '#e0e0e0',
                        '&:hover': {
                            backgroundColor: '#d0d0d0', // Slightly darker shade on hover
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow on hover
                            transform: 'translateY(0px)', // Slight lift effect
                        },
                        '&:active': {
                            backgroundColor: '#c0c0c0', // Darker shade when pressed
                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Shadow change on press
                            transform: 'translateY(0)', // Reset lift effect on press
                        },
                        '&:focus': {
                            outline: 'none',
                        },
                    }}
                    >Sign Up</Button>
                </Box>
            </Box>
        </Box>
    )
}
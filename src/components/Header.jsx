import React from 'react'
import Appbar from '@mui/material/AppBar'
import {Toolbar, Typography, IconButton, Badge, Box, Button} from '@mui/material'

import ShoppingCartSharpIcon from '@mui/icons-material/ShoppingCartSharp'
function Header() {
  return (
    <Appbar position="sticky">
        <Toolbar>
            <Typography variant="h4" color="inherit" sx={{
                flexGrow:1,
            }}>Avicom</Typography>
            <Box sx={{display:{sx:"none", md:"flex"}}}>
            <IconButton size="large" aria-label="shows cart items count" color="inherit">
                <Badge badgeContent={1} color="error">
                    <ShoppingCartSharpIcon/>
                </Badge>
            </IconButton>
            </Box>
            <Button color="inherit">Login</Button>
        </Toolbar>
    </Appbar>
  )
}

export default Header
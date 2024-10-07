import React, { useState } from 'react'
import { ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
    CssBaseline,
    Drawer,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    IconButton,
    Box,
    AppBar,
    Typography
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

interface LayoutProps {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    const [mobileOpen, setMobileOpen] = useState(false) // State for mobile drawer

    const theme = createTheme({
        palette: {
            mode: 'light' // Set the default theme to light
        }
    })

    const isMobile = useMediaQuery(theme.breakpoints.down('md')) // Check if the device is medium or smaller
    const router = useRouter()

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    // Drawer content
    const drawer = (
        <div>
            <Toolbar />
            <List>
                {[
                    { text: 'Dashboard', href: '/' },
                    { text: 'Restaurants', href: '/restaurants' },
                    { text: 'Devices', href: '/devices' }
                ].map((item) => (
                    <ListItem
                        key={item.text}
                        component={Link}
                        href={item.href}
                        // Apply active styles when the current route matches the link
                        sx={{
                            backgroundColor: router.pathname === item.href ? 'primary.main' : 'transparent',
                            color: router.pathname === item.href ? '#fff' : 'inherit'
                        }}
                    >
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />

            <Box sx={{ display: 'flex' }}>
                {/* Drawer */}
                <Box
                    component="nav"
                    sx={{ width: { md: 240 }, flexShrink: { md: 0 } }}
                    aria-label="navigation"
                >
                    {isMobile ? (
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
                            }}
                        >
                            {drawer}
                        </Drawer>
                    ) : (
                        <Drawer
                            variant="permanent"
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 }
                            }}
                            open
                        >
                            {drawer}
                        </Drawer>
                    )}
                </Box>

                {/* Main content */}
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        p: 3,
                        width: { sm: `calc(100% - 240px)` }
                    }}
                >
                    {/* AppBar */}
                    <AppBar position="fixed">
                        <Toolbar sx={{ justifyContent: 'space-between' }}>
                            {isMobile && (
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={handleDrawerToggle}
                                    sx={{ mr: 2, display: { md: 'none' } }}
                                >
                                    <MenuIcon />
                                </IconButton>
                            )}
                            <Typography variant="h6" noWrap>
                                Responsive Layout
                            </Typography>
                        </Toolbar>
                    </AppBar>

                    {/* Spacer to account for the AppBar */}
                    <Toolbar />

                    {children}
                </Box>
            </Box>
        </ThemeProvider>
    )
}

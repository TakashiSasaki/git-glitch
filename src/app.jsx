import React, { useState, useEffect } from "react";
import { Router, Link } from "wouter";

/**
 * This code defines the react app
 *
 * Imports the router functionality to provide page navigation
 * Defines the Home function outlining the content on each page
 * Content specific to each page (Home and About) is defined in their components in /pages
 * Each page content is presented inside the overall structure defined here
 * The router attaches the page components to their paths
 */

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import PageRouter from "./components/router.jsx";

// The component that adds our Meta tags to the page
import Seo from "./components/seo.jsx";

// by TakashiSasaki
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiDrawer from "@mui/material/Drawer";

// Home function that is reflected across the site
export default function Home() {
  return (
    <Router>
      <CssBaseline />
      <MuiAppBar position="static">
        <Toolbar>
          <IconButton color="inherit" size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 10 }}>
            Schema
          </Typography>
          <Button color="inherit">button</Button>
        </Toolbar>
      </MuiAppBar>
      <MuiDrawer>
        
        <p>drawer</p>
      </MuiDrawer>
      <main role="main" className="wrapper">
        <div className="content">
          {/* Router specifies which component to insert here as the main content */}
          <PageRouter />
        </div>
      </main>
      {/* Footer links to Home and About, Link elements matched in router.jsx */}
      <footer className="footer">
        <div className="links">
          <Link href="/">Home</Link>
          <span className="divider">|</span>
          <Link href="/about">About</Link>
        </div>
        <a
          className="btn--remix"
          target="_top"
          href="https://glitch.com/edit/#!/remix/glitch-hello-react"
        >
          <img
            src="https://cdn.glitch.com/605e2a51-d45f-4d87-a285-9410ad350515%2FLogo_Color.svg?v=1618199565140"
            alt=""
          />
          Remix on Glitch
        </a>
      </footer>
    </Router>
  );
}

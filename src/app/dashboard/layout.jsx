"use client";
import { Box } from "@mui/material";
import dynamic from "next/dynamic";
// import AdminNavbar from "../components/AdminNavbar";

const AdminNavbar = dynamic(() => import("../components/AdminNavbar"), {
  ssr: false,
});

export default function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminNavbar />
      <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, md: 9 } }}>
        {children}
      </Box>
    </Box>
  );
}

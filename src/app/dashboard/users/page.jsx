"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Box,
  LinearProgress,
  IconButton,
  Chip,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import Link from "next/link";
import useAuthStore from "@/stores/authStore.js";
import useUsersStore from "@/stores/usersStore";

export default function UsersPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!token) router.push("/auth/login");
  }, [token, router]);

  const {
    users,
    total,
    loading,
    currentPage,
    searchTerm,
    limit,
    fetchUsers,
    setSearch,
    setPage,
  } = useUsersStore();

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [token]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !token) {
    return <div>Access Denied. Please login.</div>;
  }

  if (!mounted) return <div>Loading users...</div>;

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <h1>Users Management</h1>
        </Box>

        <TextField
          fullWidth
          placeholder="Search users..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
          }}
        />

        {loading ? (
          <LinearProgress />
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Company</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id} hover>
                      <TableCell>
                        {user.firstName} {user.lastName}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Chip label={user.gender} size="small" />
                      </TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>{user.company?.name}</TableCell>
                      <TableCell>
                        <Link href={`/dashboard/users/${user.id}`}>View</Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={total}
              page={currentPage}
              onPageChange={(e, page) => setPage(page)}
              rowsPerPage={limit}
              rowsPerPageOptions={[10, 25, 50]}
              onRowsPerPageChange={(e) => {
                /* implement later */
              }}
            />
          </>
        )}
      </Paper>
    </Container>
  );
}

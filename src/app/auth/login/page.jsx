"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import useAuthStore from "../../../stores/authStore.js";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { token, login } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // **BLOCK AUTHENTICATED USERS FROM LOGIN PAGE**
  useEffect(() => {
    if (mounted && token) {
      // Redirect to dashboard or previous page
      const redirectTo = searchParams.get("redirect") || "/dashboard/users";
      router.push(redirectTo);
    }
  }, [token, mounted, router, searchParams]);

  // Show loading during hydration
  if (!mounted) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <CircularProgress />
      </Container>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(credentials.username, credentials.password);
      router.push("/dashboard/users");
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box sx={{ maxWidth: 400, mx: "auto", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Admin Login
        </Typography>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Demo : [ username :- emilys , password :- emilyspass ]
        </Typography>
      </Box>
    </Container>
  );
}

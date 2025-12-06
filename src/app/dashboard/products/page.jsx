"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  TablePagination,
  CircularProgress,
  Chip,
  Button,
} from "@mui/material";
import { Search, FilterList, Clear } from "@mui/icons-material";
import Link from "next/link";
import useAuthStore from "@/stores/authStore";
import useProductsStore from "@/stores/productsStore";

export default function ProductsPage() {
  const router = useRouter();
  const { token } = useAuthStore();

  const [mounted, setMounted] = useState(false);

  const {
    products,
    total,
    categories,
    loading,
    currentPage,
    searchTerm,
    selectedCategory,
    fetchProducts,
    fetchCategories,
    setSearch,
    setCategory,
    setPage,
    clearFilters,
  } = useProductsStore();

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchProducts();
    }
  }, [token]);

  useEffect(() => {}, []);

  useEffect(() => {
    setMounted(true);
    if (!token) router.push("/auth/login");
  }, [token, router]);

  if (!mounted || !token) {
    return <div>Access Denied. Please login.</div>;
  }

  if (!mounted) return <div>Loading...</div>;

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <h1>Products Management</h1>
          <Button
            variant="outlined"
            startIcon={<Clear />}
            onClick={clearFilters}
            disabled={!searchTerm && !selectedCategory}
          >
            Clear Filters
          </Button>
        </Box>

        {/* Filters */}
        <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap" }}>
          <TextField
            size="small"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ minWidth: 250 }}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: "action.active" }} />,
            }}
          />

          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.slug} value={category.slug}>
                  {category.slug}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Products Grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.thumbnail}
                      alt={product.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent sx={{ flexGrow: 1, pb: "16px !important" }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        noWrap
                        sx={{ mb: 1 }}
                      >
                        {product.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 1 }}
                      >
                        {product.category}
                      </Typography>
                      <Typography variant="h6" color="primary" gutterBottom>
                        ${product.price}
                      </Typography>
                      <Chip
                        label={`★ ${product.rating}`}
                        size="small"
                        color="warning"
                        sx={{ position: "absolute", top: 8, right: 8 }}
                      />
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Link
                        href={`/dashboard/products/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Button fullWidth variant="contained" size="small">
                          View Details
                        </Button>
                      </Link>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            {total > 0 && (
              <Box sx={{ mt: 4 }}>
                <TablePagination
                  component="div"
                  count={total}
                  page={currentPage}
                  onPageChange={(e, page) => setPage(page)}
                  rowsPerPage={12}
                  rowsPerPageOptions={[]}
                  showFirstButton
                  showLastButton
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Container>
  );
}

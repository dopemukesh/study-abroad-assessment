"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Chip,
  Box,
  Button,
  Divider,
  CardMedia,
  Rating,
  Carousel,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import axios from "axios";
import useAuthStore from "../../../../stores/authStore.js";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { token } = useAuthStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!token) router.push("/auth/login");
  }, [token, router]);

  useEffect(() => {
    if (!mounted) return;

    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `https://dummyjson.com/products/${params.id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, mounted]);

  if (!mounted || loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h3" gutterBottom>
          {product.title}
        </Typography>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 3 }}>
          <Chip label={`$${product.price}`} color="success" size="large" />
          <Chip label={product.category} color="primary" />
          <Rating value={product.rating} readOnly precision={0.5} />
          <Typography>({product.rating})</Typography>
        </Box>

        {/* Images Carousel */}
        <CardMedia
          component="img"
          height="400"
          image={product.images?.[0] || product.thumbnail}
          alt={product.title}
          sx={{ borderRadius: 2, mb: 3, objectFit: "cover" }}
        />

        <Typography variant="h6" gutterBottom>
          Description:
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 3 }}>
          {product.description}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Brand:
            </Typography>
            <Typography>{product.brand}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Stock:
            </Typography>
            <Typography
              color={product.stock > 0 ? "success.main" : "error.main"}
            >
              {product.stock} available
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Specifications:
            </Typography>
            <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
              <Typography variant="body2">
                <strong>Weight:</strong> {product.weight}g
              </Typography>
              <Typography variant="body2">
                <strong>Warranty:</strong> {product.warrantyInformation}
              </Typography>
              <Typography variant="body2">
                <strong>Returns:</strong> {product.returnPolicy}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Container, Paper, Typography, Grid, Chip, Divider, Box, Button } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import axios from 'axios'

export default function UserDetail() {
  const params = useParams()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`https://dummyjson.com/users/${params.id}`)
        setUser(data)
      } catch (error) {
        console.error('User fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [params.id])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>User not found</div>

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button 
        startIcon={<ArrowBack />} 
        onClick={() => router.push('/dashboard/users')}
        sx={{ mb: 3 }}
      >
        Back to Users
      </Button>
      
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Email:</Typography>
            <Typography>{user.email}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Phone:</Typography>
            <Typography>{user.phone}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Gender:</Typography>
            <Chip label={user.gender} color="primary" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Age:</Typography>
            <Typography>{user.age}</Typography>
          </Grid>
          {/* Add more fields as needed */}
        </Grid>
      </Paper>
    </Container>
  )
}

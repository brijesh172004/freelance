import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CardMedia,
} from '@mui/material';
import axios from 'axios';

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkillDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/skills/${id}`);
        setSkill(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skill details:', error);
        setLoading(false);
      }
    };

    fetchSkillDetails();
  }, [id]);

  if (loading) {
    return (
      <Container>
        <Typography align="center" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  if (!skill) {
    return (
      <Container>
        <Typography align="center" sx={{ mt: 4 }}>
          Skill not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={`http://localhost:5000/${skill.image}`}
              alt={skill.skillName}
              sx={{ borderRadius: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                {skill.skillName}
              </Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Posted by: {skill.user.name}
              </Typography>
              <Typography variant="body1" paragraph>
                {skill.description}
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Details
                </Typography>
                <Typography variant="body1">
                  <strong>Location:</strong> {skill.location}
                </Typography>
                <Typography variant="body1">
                  <strong>Payment Details:</strong> {skill.paymentDetails}
                </Typography>
                <Typography variant="body1">
                  <strong>Contact Email:</strong> {skill.user.email}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default SkillDetails; 
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from '@mui/material';
import axios from 'axios';

const Profile = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user skills:', error);
        setError('Failed to fetch your skills');
        setLoading(false);
      }
    };

    fetchUserSkills();
  }, []);

  const handleDeleteClick = (skill) => {
    setSelectedSkill(skill);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/skills/${selectedSkill._id}`);
      setSkills(skills.filter((skill) => skill._id !== selectedSkill._id));
      setDeleteDialogOpen(false);
      setSelectedSkill(null);
    } catch (error) {
      console.error('Error deleting skill:', error);
      setError('Failed to delete skill');
    }
  };

  if (loading) {
    return (
      <Container>
        <Typography align="center" sx={{ mt: 4 }}>
          Loading...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Profile
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {skills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill._id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
            }}>
              <CardMedia
                component="img"
                height="200"
                image={`http://localhost:5000/${skill.image}`}
                alt={skill.skillName}
                sx={{
                  objectFit: 'cover',
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {skill.skillName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {skill.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Location:</strong> {skill.location}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Payment:</strong> {skill.paymentDetails}
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteClick(skill)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Delete Skill</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{selectedSkill?.skillName}"? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile; 
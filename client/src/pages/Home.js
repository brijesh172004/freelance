import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import axios from 'axios';

const Home = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/skills');
        setSkills(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleSkillClick = (id) => {
    navigate(`/skill/${id}`);
  };

  const handleContactClick = (e, email) => {
    e.stopPropagation();
    window.location.href = `mailto:${email}`;
  };

  const filteredSkills = skills.filter(skill =>
    skill.skillName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    skill.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          fontWeight: 'bold',
          mb: 4,
          color: 'primary.main'
        }}
      >
        Available Skills
      </Typography>

      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search skills..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              backgroundColor: 'background.paper',
            }
          }}
        />
      </Box>

      <Grid container spacing={3}>
        {filteredSkills.map((skill) => (
          <Grid item xs={12} sm={6} md={4} key={skill._id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
                borderRadius: 2,
                overflow: 'hidden',
                minHeight: '500px',
                maxHeight: '500px',
                position: 'relative',
              }}
              onClick={() => handleSkillClick(skill._id)}
            >
              <Box sx={{ 
                position: 'relative',
                width: '100%',
                paddingTop: '56.25%',
              }}>
                <CardMedia
                  component="img"
                  image={`http://localhost:5000/${skill.image}`}
                  alt={skill.skillName}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </Box>
              <CardContent sx={{ 
                flexGrow: 1, 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                height: 'calc(100% - 200px)',
              }}>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="h2"
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    minHeight: '48px',
                    maxHeight: '48px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {skill.skillName}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    mb: 2,
                    minHeight: '72px',
                    maxHeight: '72px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {skill.description.substring(0, 100)}...
                </Typography>
                <Box sx={{ 
                  mt: 'auto',
                  mb: 2,
                }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <strong>Location:</strong> {skill.location}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    <strong>Payment:</strong> {skill.paymentDetails}
                  </Typography>
                </Box>
              </CardContent>
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  p: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'translateY(100%)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(0)',
                  },
                }}
              >
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  onClick={(e) => handleContactClick(e, skill.user.email)}
                  sx={{
                    width: '100%',
                    backgroundColor: 'secondary.main',
                    '&:hover': {
                      backgroundColor: 'secondary.dark',
                    }
                  }}
                >
                  Contact
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 
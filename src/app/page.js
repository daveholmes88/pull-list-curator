'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Alert, CircularProgress, Container, AppBar, Toolbar, Link, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import Image from 'next/image';

const NextImage = ({ src, alt, style }) => {
  // Styles applied to simulate next/image's 'fill' and 'cover' behavior
  const imageStyle = {
    position: 'flex-center',
    top: 0,
    left: 0,
    width: 'auto',
    maxHeight: '300px',
    objectFit: 'cover', // Ensures the aspect ratio is maintained and the container is covered
    ...style,
  };
  return <img src={src} alt={alt} style={imageStyle} className="rounded-lg transition-opacity duration-500 opacity-100" />;
}

export default function Home() {
  const imageUrl = "https://s3.amazonaws.com/comicgeeks/comics/covers/large-4715821.jpg?1752723834"

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        // Log the specific error message from the API if possible
        const errorData = await response.json();
        console.error('API Error:', errorData.error);
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/davelovescomics/', color: '#E1306C' },
    { name: 'Email', icon: <EmailIcon />, url: 'mailto:daveholmes88@gmail.com', color: '#FF3131' },
    { name: 'Blue Sky', icon: <Typography sx={{ fontWeight: 'bold' }}>BS</Typography>, url: 'https://bsky.app/profile/daveholmes88.bsky.social', color: '#ffffff' }
  ];

  return (
    <>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        enableColorOnDark
        sx={{ 
              backgroundColor: '#4d9fd7', 
              color: '#ffffff'
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ 
              flexGrow: 1, 
              fontWeight: 'bold', 
              letterSpacing: 1,
              textTransform: 'uppercase', 
              backgroundColor: '#4d9fd7', 
              color: '#ffffff'
            }}
          >
            <Image src='/IMG_5948.PNG' alt='Pull List Curator Logo' width={1000} height={1000} style={{ width: '30%', height: 'auto', maxWidth: '125px' }}/>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Centers horizontally
          textAlign: 'center'
        }}
      >
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h2>Welcome to your comic book shop's newest marketing feature: personalized comic book recommendations every week!</h2>
      <br></br>
      <h2>Thanks to our new algorithm, we will take the data of your customer purchases and deliver your customers recommendations of the best new comic books delivered right to their inbox, boosting your sales and pre-orders.</h2>
      <br></br>
      <br></br>
      <br></br>
      <h3>Here's an example of what would be emailed to your customers on a regular basis:</h3>
      <br></br>
      <br></br>
      <h2>
        The Moon Is Following Us #1
      </h2>
        <br></br>
      <div>
        <NextImage
          src={imageUrl}
          alt="comic book cover"
        />
        </div>
            <br></br>
            <p><strong>Publisher: Image</strong></p>
            <br></br>
            <p><strong>Writer: Daniel Warren Johnson</strong> (Writer of Transformers & Do A Powerbomb)</p>
            <br></br>
            <p><strong>Artist: Daniel Warren Johnson & Riley Rossmo</strong> (Artist of Proof & Harley Quinn)</p>
            <br></br>
            <p>Sam and Duncan LaMarr love their six-year-old daughter, Penny, more than anything in the whole world. But half a year ago, she was taken by the Cascade, an evil force they barely understand. Now, Sam and Duncan must fight side by side with the magical beings Penny cherished to try and get her back…before she’s gone forever.</p>
            <br></br>
            <Button sx={{padding: '15px', borderRadius: '30px', backgroundColor: '#4d9fd7', color: '#ffffff'}} variant="contained">Link To Your Website</Button>
            <br></br>
      </Box>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        maxWidth: 400,
        margin: '20px auto',
        padding: 4,
        borderRadius: 2,
        boxShadow: 8, // Increased shadow for better visual depth
        backgroundColor: '#ffffff',
        border: '1px solid #e0e0e0',
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ color: '#1976d2' }}>
        Get in Touch
      </Typography>
      <p><strong>If you're interested in utilizing the Pull List Curator in your comic book store, let me know. We would love to be in touch.</strong></p>
      
      {status === 'success' && (
        <Alert severity="success" sx={{ borderRadius: 1 }}>
          Success! Your message has been sent to daveholmes88@gmail.com.
        </Alert>
      )}
      {status === 'error' && (
        <Alert severity="error" sx={{ borderRadius: 1 }}>
          Sorry, something went wrong. Please check your network or try again later.
        </Alert>
      )}

      <TextField
        label="Your Name"
        name="name"
        variant="outlined"
        required
        value={formData.name}
        onChange={handleChange}
        fullWidth
        disabled={loading}
      />
      <TextField
        label="Your Email"
        name="email"
        type="email"
        variant="outlined"
        required
        value={formData.email}
        onChange={handleChange}
        fullWidth
        disabled={loading}
      />
      <TextField
        label="Message"
        name="message"
        variant="outlined"
        multiline
        rows={6}
        required
        value={formData.message}
        onChange={handleChange}
        fullWidth
        disabled={loading}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        size="large"
        sx={{ height: 50, padding: '15px', borderRadius: '30px', backgroundColor: '#4d9fd7', color: '#ffffff' }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          'Send Message'
        )}
      </Button>
    </Box>
     </Container>
     <br></br>
     <br></br>
     <Box
        component="footer"
        sx={{
          width: '100%',
          padding: 3,
          mt: 4,
          backgroundColor: '#4d9fd7',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ color: '#fff' }}>
          Connect with Dave
        </Typography>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', mb: 2, width: 150, margin: '8px auto' }} />

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mb: 2 }}>
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              color="inherit"
              underline="none"
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                transition: 'transform 0.2s',
                '&:hover': { transform: 'scale(1.1)' }
              }}
            >
              <IconButton sx={{ color: link.color, border: '1px solid', borderColor: link.color, p: 1, mr: 0.5 }}>
                {link.icon}
              </IconButton>
              <Typography variant="body1" sx={{ display: { xs: 'none', sm: 'block' } }}>
                {link.name}
              </Typography>
            </Link>
          ))}
        </Box>
        </Box>
     </>
  );
}

/* eslint-disable prettier/prettier */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {useState} from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/router';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'

const theme = createTheme();

export default function SignIn(props) {
    const [formData, setFormData] = useState({ name: '', password: '' });
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();
    
    const obj =[{
      "name":"manish@gmail.com",
      "password":"manish123",
    },
    {
      "name":"sumit@gmail.com",
      "password":"sumit123",
    },
  

  ]

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = (event) => {
      event.preventDefault();
    
      // Loop through each object in the array
      for (let i = 0; i < obj.length; i++) {
        const currentObj = obj[i];
    
        // Check if the submitted data matches the current object's username and password
        if (formData.name === currentObj.name && formData.password === currentObj.password) {
          Swal.fire({
            title: 'Success',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'Ok'
          }).then(() => props.onLogin("2",formData.name));
          return; // Exit the function once a match is found
        }
      }
    
      // If no match is found, show an error message
      setErrorMsg('Invalid username or password');
    };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
      };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
           label="Email" 
           id="email"
          name="name"
          type='email'
          fullWidth
          variant="outlined"
            value={formData.name}
          onChange={handleChange} 
            required
          />
           
            <FormControl sx={{ my: 2, width: '100%' }} variant="outlined" required >
          <InputLabel htmlFor="outlined-adornment-password" fullwidth="true" >Password</InputLabel>
          <OutlinedInput
            id="password"
            name='password'
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            
          />
        </FormControl>
           
            <Button
                className='bg-blue-500'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {errorMsg && <p>{errorMsg}</p>}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
import React, { useState } from 'react';
import { Box, Button, TextField, Modal, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../reducers/login/loginSlice'; 
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, handleClose }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Use selector to get the loading and error state
  const { loading, error } = useSelector((state) => state.login || { loading: false, error: null });

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(postLogin({ userName, password })).unwrap();
      navigate('/'); 
      handleClose(); 
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
      aria-describedby="login-modal-description"
    >
      <Box sx={style}>
        <Typography id="login-modal-title" variant="h6" component="h2">
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default LoginModal;

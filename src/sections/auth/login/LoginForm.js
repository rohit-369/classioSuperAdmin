import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { useSnackbar } from 'notistack';
import Iconify from '../../../components/iconify';
import AppContext from '../../../context/appContext';

import axios from '../../../api/axios';

const LOGIN_URL = "/superadmin/login";

// ----------------------------------------------------------------------

export default function LoginForm() {

  const { enqueueSnackbar } = useSnackbar()

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [instId, setInstId] = useState(1);

  const { auth, setAuth, userId, setUserId } = useContext(AppContext);

  const [adminValue, setAdminValue] = useState("admin");

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ userName: username, password, instId }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      const accessToken = response?.data?.authToken;
      console.log('accessToken', accessToken)
      const id = response.data.userId;
      // setAuth(accessToken);
      // setUserId(id);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('userType', adminValue);
      setIsLoading(true);
      setUsername('');
      setPassword('');
      if (accessToken !== "" && accessToken !== undefined) {
        setIsLoading(false);
      }
      if (response.data.errorCode !== 0) {
        enqueueSnackbar(`${response.data.errorDescription}`, { variant: 'error', autoHideDuration: 5000 })
      }
      if (response.data.status === true) {
        navigate('/dashboard/app')
      }

    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <form>
        <Stack spacing={3}>
          <TextField fullWidth variant="outlined" type="text" label="User Name" name="username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ gridColumn: 'span 12', marginTop: '-8px' }} />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ gridColumn: 'span 12' }}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <Checkbox name="remember" label="Remember me" />
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
          Login
        </LoadingButton>
      </form>
      {isLoading && <p>Redirecting to dashboard</p>}
    </>
  );
}

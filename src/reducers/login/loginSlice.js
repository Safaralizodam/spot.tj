import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosLogin } from '../../utils/axiosRequest/axiosRequest'; 
import { saveToken } from '../../utils/token/token'; 

// Define the asynchronous thunk action
export const postLogin = createAsyncThunk(
  'login/postLogin',
  async (loginCredentials, { rejectWithValue }) => {
    try {
      const { data } = await axiosLogin.post('/api/Auth/Login', loginCredentials);
      saveToken(data.token); 
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create the login slice
export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.data = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem('user', JSON.stringify(action.payload)); 
      })

  },
});

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
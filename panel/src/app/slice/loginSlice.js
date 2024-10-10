import { createSlice } from '@reduxjs/toolkit'
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

const initialState = {
  token: getCookie('token') ?? ''
  
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    createToken: (oldState, data) => {
      console.log(data);
      // Destructure token from payload
      const { token } = data.payload;
      oldState.token = token;
      // Set the token in cookies
      setCookie('token', token); // Use the correct token
    },
    logOut: (state) => {
      state.token = '';
      deleteCookie('token');
    }
  }
});

// Action creators are generated for each case reducer function
export const { createToken, logOut } = loginSlice.actions;

export default loginSlice.reducer;

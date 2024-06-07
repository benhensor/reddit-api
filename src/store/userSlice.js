import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setIsLoggedIn: (state, action) => { 
      state.isLoggedIn = action.payload;
    }
  },
});

export const { setName, setIsLoggedIn } = userSlice.actions;
export const selectName = (state) => state.user.name;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
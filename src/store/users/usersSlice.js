import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    id: null,
    email: null,
    error: null,
    password: null,
    display_name: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers:{
    setUser(state, action){
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.display_name = action.payload.display_name;
      state.password = action.payload.password;
    },
    setAuthError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const {setUser, setAuthError} = authSlice.actions;
export const authReducer = authSlice.reducer;
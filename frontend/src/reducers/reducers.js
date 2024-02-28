import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const isOnlineSlice = createSlice({
  name: 'isOnline',
  initialState: false,
  reducers: {
    setNetwork(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

export const { setNetwork } = isOnlineSlice.actions;
export default {
  isOnline: isOnlineSlice.reducer,
};

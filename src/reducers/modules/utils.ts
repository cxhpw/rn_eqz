import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import request from '@/request';

const isOnlineSlice = createSlice({
  name: 'isOnline',
  initialState: false,
  reducers: {
    setNetwork(state, action: PayloadAction<boolean>) {
      return action.payload;
    },
  },
});

type TFeedBack = {
  BusinessPhone: string;
  PlatformServices: string;
  ServiceTime: string;
};
const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {} as TFeedBack,
  reducers: {
    setFeedback(state, action: PayloadAction<TFeedBack>) {
      return action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFeedback.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchFeedback.rejected, () => {});
  },
});

export const fetchFeedback = createAsyncThunk('feedback', async () => {
  const res = await request({
    url: '/Include/ajax/AjaxMethod.aspx',
    params: {
      t: 'getserversummary',
    },
  });
  return res.data;
});

export const { setNetwork } = isOnlineSlice.actions;

export default {
  isOnline: isOnlineSlice.reducer,
  feedback: feedbackSlice.reducer,
};

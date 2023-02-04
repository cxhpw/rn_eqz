import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Props = {
  status: boolean;
  message: 'pending' | 'fulfilled' | 'rejected';
};

const initialState: Props = {
  status: false,
  message: 'pending',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      console.log(1);
      state.message = action.meta.requestStatus;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(2);
      state.message = action.meta.requestStatus;
      state.status = action.payload;
    });
  },
});
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id, options) => {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  },
);

export default userSlice.reducer;
// export default {
//   isOnline,
// };

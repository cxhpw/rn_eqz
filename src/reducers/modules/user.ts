import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Props = {
  status: boolean;
  message: 'pending' | 'fulfilled' | 'rejected';
  id: number;
};

const initialState: Props = {
  status: false,
  message: 'pending',
  id: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.message = action.meta.requestStatus;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.message = action.meta.requestStatus;
      state.status = action.payload.status;
      state.id = action.payload.id;
    });
  },
});
export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (id: number) => {
    return new Promise<Pick<Props, 'status' | 'id'>>(resolve => {
      setTimeout(() => {
        resolve({
          status: true,
          id,
        });
      }, 3000);
    });
  },
);

export default userSlice.reducer;
// export default {
//   isOnline,
// };

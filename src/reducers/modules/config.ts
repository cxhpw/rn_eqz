import request from '@/request';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

type Ad = {
  addesc: string;
  adlist: { image: string; name: string; url: string }[];
  adname: string;
};
type Props = {
  PrTLImg: string;
  TagImg: string;
  WeiXinTopColor: string;
  WeiXinTopImg: string;
  alipayadimg: string;
  bytedancesharetitle: string;
  jdxbadimg: string;
  weixinadimg: string;
  ad1: Ad;
  ad2: Ad;
};
const initialState = {} as Props;

const config = createSlice({
  name: 'appConfig',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      fetchAppConfig.fulfilled,
      (state, action) => action.payload,
    );
    builder.addCase(fetchAppConfig.rejected, () => {});
  },
});

export const fetchAppConfig = createAsyncThunk(
  'appConfig',
  async (p, { rejectWithValue }) => {
    try {
      return await (
        await request.get('/Include/alipay/data.aspx', {
          params: {
            apiname: 'getweixinconfig',
          },
        })
      ).data;
    } catch (error) {
      console.log(11, 'rejected');
      return rejectWithValue(error);
    }
  },
);

export const {} = config.actions;

export default config.reducer;

// export const AppConfig = createApi({
//   reducerPath: 'appConfig',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://weixinapp.wxjmei.com/' }),
//   endpoints(build) {
//     return {
//       getAppConfig: build.query({
//         query(name) {
//           return `Include/alipay/data.aspx?apiname=${name}`;
//         },
//       }),
//     };
//   },
// });
// export const { useGetAppConfigQuery } = AppConfig;

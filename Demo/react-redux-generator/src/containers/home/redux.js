import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import Fetch from "@commons/dataService.js";

const nameSpace = "home";

// 异步请求
export const fetchHome = createAsyncThunk("home/fetchSetHome", async () => {
  const response = await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("settimeout");
      resolve({ name: "fetchName", text: "fetchText" });
    }, 2000);
  });
  return response;
});

const homeSlice = createSlice({
  name: nameSpace,
  initialState: {
    name: "",
    text: "",
  },
  reducers: {
    homeSet(state, action) {
      return {
        ...state,
        name: action.payload.name,
        text: action.payload.text,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHome.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchHome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.text = action.payload.text;
      })

      .addMatcher(fetchHome.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message;
      });
  },
});

export const { homeSet } = homeSlice.actions;
export default homeSlice.reducer;
export const name = nameSpace;

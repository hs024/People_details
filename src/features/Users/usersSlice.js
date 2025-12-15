import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { fetchUsersAPI } from "./usersService";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => await fetchUsersAPI()
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(user) {
        return { payload: { ...user, id: nanoid() } };
      },
    },
    updateUser(state, action) {
      const index = state.list.findIndex((u) => u.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteUser(state, action) {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addUser, updateUser, deleteUser } = usersSlice.actions;
export default usersSlice.reducer;

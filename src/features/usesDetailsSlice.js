import { notification } from "../utils/notification";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  users: [],
  loading: true,
  error: null,
  filteredList: [],
};

// Create Action
export const createUser = createAsyncThunk(
  "userDetail/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://66d01dac181d059277dd4a6e.mockapi.io/crud",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create user"
      );
    }
  }
);

// Read Action
export const showUser = createAsyncThunk(
  "userDetail/showUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "https://66d01dac181d059277dd4a6e.mockapi.io/crud"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Failed to fetch users"
      );
    }
  }
);

//Edit Action
export const editUser = createAsyncThunk(
  "/userDetail/editUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `https://66d01dac181d059277dd4a6e.mockapi.io/crud/${user.id}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("add edited user done");
      state.loading = true;
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response.data.message || "Something went Wrong"
      );
    }
  }
);

//Delete Action
export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `https://66d01dac181d059277dd4a6e.mockapi.io/crud/${id}`
      );
      console.log(response);

      state.loading = true;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data || "Error deleting user");
    }
  }
);

// Create a slice with extra reducers using the builder callback syntax
export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    showFilteredList: (state, action) => {
      let searchResults = action.payload;
      state.filteredList = searchResults;
      console.log(action.payload);
      console.log(state.filteredList);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload); 
        notification("user Created Successfully", "success");
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        notification("Something went Wrong", "error");
      })
      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.filteredList = action.payload;
        // Replace users list with fetched data
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
export const { showFilteredList } = userDetail.actions;

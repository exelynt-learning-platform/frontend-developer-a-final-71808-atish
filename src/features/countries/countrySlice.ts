import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Country } from "../../types/country";
import { countryService } from "../../services/countryServices";

interface CountryState {
  countries: Country[];
  loading: boolean;
  error: string | null;
}

const initialState: CountryState = {
  countries: [],
  loading: false,
  error: null,
};

export const fetchCountries = createAsyncThunk<
  Country[],
  void,
  { rejectValue: string }
>("countries/fetchCountries", async (_, thunkAPI) => {
  try {
    return await countryService.getAll();
  } catch {
    return thunkAPI.rejectWithValue("Failed to load countries");
  }
});

const countrySlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default countrySlice.reducer;
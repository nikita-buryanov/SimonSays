import { createSlice } from '@reduxjs/toolkit';

const colorSeqSlice = createSlice({
  name: 'colorSequence',
  initialState: { colorSequence: [] },
  reducers: {
    addColor: (state, action) => {
      state.colorSequence = [...state.colorSequence, action.payload];
    },
    setSequence: (state, action) => {
      state.colorSequence = action.payload;
    },
    clearSequence: state => {
      state.colorSequence = [];
    },
  },
});

export const { addColor, clearSequence, setSequence } = colorSeqSlice.actions;
export default colorSeqSlice.reducer;

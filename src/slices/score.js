import { createSlice } from '@reduxjs/toolkit';

const scoreSlice = createSlice({
  name: 'score',
  initialState: { stage: 0, round: 0 },
  reducers: {
    addRound: state => {
      state.round += 1;
    },
    moveStage: state => {
      state.round = 0;
      state.stage += 1;
    },
    reset: state => {
      state.round = 0;
      state.stage = 0;
    },
  },
});

export const { addRound, moveStage, reset } = scoreSlice.actions;
export default scoreSlice.reducer;

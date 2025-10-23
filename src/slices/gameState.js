import { createSlice } from '@reduxjs/toolkit';
import { gameStates } from '../data/gameStates';

const gameStateSlice = createSlice({
  name: 'gameState',
  initialState: { gameState: gameStates[0] },
  reducers: {
    changeGameState: (state, action) => {
      if (gameStates[action.payload]) {
        state.gameState = gameStates[action.payload];
      }
    },
  },
});

export const { changeGameState } = gameStateSlice.actions;
export default gameStateSlice.reducer;

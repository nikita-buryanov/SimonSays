import { configureStore } from '@reduxjs/toolkit';
import GameStateReducer from '../slices/gameState';
import ScoreReducer from '../slices/score';
import nameModalReducer from '../slices/nameModal';
import colorSeqReducer from '../slices/colorseq';

export const store = configureStore({
  reducer: {
    gameState: GameStateReducer,
    score: ScoreReducer,
    nameModal: nameModalReducer,
    colorSeq: colorSeqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

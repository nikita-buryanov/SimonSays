import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../src/store/store';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../src/store/store';
import { changeGameState } from '../src/slices/gameState';
import { addRound, moveStage, reset } from '../src/slices/score';

import { gameStates } from '../src/data/gameStates';
import { openModal } from '../src/slices/nameModal';
import { clearSequence, setSequence } from '../src/slices/colorseq';
import soundManager from '../src/core/playSound';

export const useSimonGame = () => {
  const [activeColor, setActiveColor] = useState<string>('');

  const stage = useSelector((state: RootState) => state.score.stage);
  const round = useSelector((state: RootState) => state.score.round);
  const colorSeq = useSelector(
    (state: RootState) => state.colorSeq.colorSequence,
  );

  const dispatch: AppDispatch = useDispatch();

  const gameState = useSelector(
    (state: RootState) => state.gameState.gameState,
  );

  const delay = (ms: number) =>
    new Promise<void>(resolve => setTimeout(resolve, ms));

  const GetRandomColor = () => {
    let colors = ['green', 'blue', 'red', 'yellow'];
    const randNum = Math.floor(Math.random() * colors.length);
    return colors[randNum];
  };

  const addColorToColorArray = () => {
    const newSequence = [...colorSeq, GetRandomColor()];
    dispatch(setSequence(newSequence));
  };

  const startRound = () => {
    if (gameState != gameStates[0]) {
      return;
    }
    playSequence(colorSeq);
  };

  const playColor = async (color: string) => {
    setActiveColor(color);
    soundManager.play();
    await delay(300);
    setActiveColor('');
  };

  const playSequence = async (colorSeq: string[]) => {
    delay(250);
    for (let color of colorSeq) {
      dispatch(changeGameState(1));
      soundManager.play();
      setActiveColor(color);
      await delay(600);
      setActiveColor('');
      await delay(600);
    }
    dispatch(changeGameState(2));
  };

  const correctAnswer = () => {
    const newRound = round + 1;
    dispatch(addRound());
    if (newRound == colorSeq.length) {
      dispatch(moveStage());
      addColorToColorArray();
      dispatch(changeGameState(0));
    }
  };

  const getClickedColor = (color: string) => {
    if (gameState === gameStates[1] || gameState === gameStates[0]) {
      return;
    }
    playColor(color);
    if (color != colorSeq[round]) {
      lose();
      return;
    }
    correctAnswer();
  };

  useEffect(() => {
    console.log('Here');
    dispatch(setSequence([GetRandomColor()]));
  }, []);

  const lose = () => {
    dispatch(clearSequence());
    dispatch(setSequence([GetRandomColor()]));
    dispatch(openModal());
    dispatch(changeGameState(0));
  };

  return {
    colorSeq,
    activeColor,
    round,
    stage,
    getClickedColor,
    startRound,
  };
};

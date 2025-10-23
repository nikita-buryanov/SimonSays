import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import Game from '../src/screens/Game';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(() => 'ready'),
  useDispatch: () => jest.fn(),
}));

jest.mock('../hooks/useSimonSays', () => ({
  useSimonGame: () => ({
    stage: 1,
    activeColor: 'red',
    getClickedColor: jest.fn(),
    startRound: jest.fn(),
  }),
}));

jest.mock('../src/modals/nameInputModal', () => () => null);

describe('Game Component', () => {
  it('renders correctly', () => {
    act(() => {
      ReactTestRenderer.create(<Game />);
    });
  });
});

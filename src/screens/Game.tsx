import { View, Pressable, Text, StyleSheet } from 'react-native';
import squaresConfig from '../data/squareConfigs';

import { useSimonGame } from '../../hooks/useSimonSays';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { gameStates } from '../data/gameStates';
import { useEffect } from 'react';
import NameInputModal from '../modals/nameInputModal';

function Game() {
  const { stage, activeColor, getClickedColor, startRound } = useSimonGame();

  const gameState = useSelector(
    (state: RootState) => state.gameState.gameState,
  );

  useEffect(() => {
    console.log('Hello');
    console.log(gameState);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.stageText}>Stage = {stage}</Text>
      <View style={styles.squaresContainer}>
        {squaresConfig.map(sq => (
          <Square
            key={sq.name}
            color={sq.color}
            highlighColor={sq.highlight}
            topLeftRad={sq.corners[0]}
            topRightRad={sq.corners[1]}
            botLeftRad={sq.corners[2]}
            botRightRad={sq.corners[3]}
            colorName={sq.name}
            getClickedColor={getClickedColor}
            activeColor={activeColor}
          />
        ))}
      </View>
      <Pressable
        onPress={() => startRound()}
        style={[
          styles.startButton,
          {
            backgroundColor:
              gameState === gameStates[0] || gameState === gameStates[4]
                ? '#63aa6cff'
                : '#828282',
          },
        ]}
      >
        <Text style={{ fontSize: 50 }}>Start</Text>
      </Pressable>
      <NameInputModal></NameInputModal>
    </View>
  );
}

const Square: React.FC<SquareProps> = ({
  color,
  topLeftRad,
  topRightRad,
  botLeftRad,
  botRightRad,
  activeColor,
  colorName,
  getClickedColor,
  highlighColor,
}) => {
  const OnPress = () => {
    getClickedColor(colorName);
  };

  return (
    <Pressable onPress={OnPress}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: color,
          borderTopRightRadius: topRightRad,
          borderTopLeftRadius: topLeftRad,
          borderBottomLeftRadius: botLeftRad,
          borderBottomRightRadius: botRightRad,
          borderColor: 'black',
          borderWidth: 8,
          width: 150,
          height: 150,
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:
              activeColor === colorName ? highlighColor : '#ffffff00',
            borderTopRightRadius: topRightRad,
            borderTopLeftRadius: topLeftRad,
            borderBottomLeftRadius: botLeftRad,
            borderBottomRightRadius: botRightRad,
            borderColor: 'black',
            borderWidth: 8,
            width: 150,
            height: 150,
          }}
        ></View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebd09fff',
  },
  stageText: {
    fontSize: 50,
    paddingBottom: 100,
    fontWeight: '500',
  },
  squaresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 320,
    justifyContent: 'center',
  },
  startButton: {
    width: 300,
    height: 100,
    marginTop: 40,
    borderRadius: 25,
    borderWidth: 8,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: 'black',
    width: 150,
    height: 150,
  },
});

type SquareProps = {
  color: string;
  topLeftRad: number;
  topRightRad: number;
  botLeftRad: number;
  botRightRad: number;
  activeColor: string;
  getClickedColor: Function;
  colorName: string;
  highlighColor: string;
};

export default Game;

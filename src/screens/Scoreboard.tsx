import { View, Text, Alert, Pressable } from 'react-native';

import { useEffect, useState } from 'react';
import saveSystem from '../core/saveSystem';
import { useNavigation } from '@react-navigation/native';

function Scoreboard() {
  type PlayerScore = {
    name: string;
    score: number;
  };

  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([]);
  const navigation = useNavigation<any>();
  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const data = (await saveSystem.loadData('playerScores')) || [];
        setLeaderboard(data);
      } catch (e: any) {
        Alert.alert('Error loading scoreboard', e.message);
      }
    };
    loadLeaderboard();
  });

  const onRestartPress = () => {
    console.log('Restart');
    navigation.navigate('Game');
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#a97a21ff',
        paddingVertical: 50,
      }}
    >
      <Text
        style={{
          fontSize: 50,
          color: '#000000ff',
          padding: 10,
          borderColor: '#000000',
          backgroundColor: '#cf9c50ff',
          borderWidth: 5,
          borderRadius: 25,
        }}
      >
        Scoreboard
      </Text>
      <View
        style={{
          flexDirection: 'row',
          gap: '30%',
          paddingTop: 10,
        }}
      >
        <Text
          style={{
            fontWeight: '500',
            fontSize: 20,
          }}
        >
          Player
        </Text>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 20,
          }}
        >
          Score
        </Text>
      </View>
      <Line />

      <View
        style={{
          height: '70%',
          width: '90%',
          margin: 10,
          borderRadius: 50,
          backgroundColor: '#cf9c50ff',
          paddingTop: 10,
          justifyContent: 'center',
          borderWidth: 5,
        }}
      >
        {leaderboard.map((item, index) => (
          <View
            key={index}
            style={{
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 2,
                justifyContent: 'space-evenly',
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 20,
                }}
              >
                {item.score}
              </Text>
            </View>
            <Line />
          </View>
        ))}
      </View>
      <Pressable
        onPress={onRestartPress}
        style={{
          backgroundColor: '#63aa6cff',
          width: '30%',
          height: 70,
          marginTop: 0,
          borderRadius: 25,
          borderWidth: 8,
          borderColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 30 }}>Restart</Text>
      </Pressable>
    </View>
  );
}

const Line = () => {
  return (
    <View
      style={{
        backgroundColor: '#000000ff',
        marginVertical: 10,
        width: '80%',
        height: 2,
        borderRadius: 5,
        alignSelf: 'center',
      }}
    />
  );
};

export default Scoreboard;

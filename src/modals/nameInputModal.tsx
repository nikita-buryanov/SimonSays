import { useState } from 'react';
import {
  View,
  Modal,
  TextInput,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { closeModal } from '../slices/nameModal';
import saveSystem from '../core/saveSystem';
import { reset } from '../slices/score';
import { useNavigation } from '@react-navigation/native';

const NameInputModal = () => {
  const [name, setName] = useState('');
  const isShown = useSelector((state: RootState) => state.nameModal.isShown);
  const stage = useSelector((state: RootState) => state.score.stage);
  const dispatch: AppDispatch = useDispatch();
  const navigation = useNavigation<any>();

  const onSubmit = async () => {
    if (name === '') {
      Alert.alert('Please input a name first');
      return;
    }
    try {
      const currentLeaderBoard =
        (await saveSystem.loadData('playerScores')) || [];

      const updateLeaderBoards = [
        ...currentLeaderBoard,
        { name: name, score: stage },
      ];

      const topTen = updateLeaderBoards
        .sort((a, b) => b.score - a.score)
        .slice(0, 10);

      await saveSystem.saveData('playerScores', topTen);
      dispatch(closeModal());
      navigation.navigate('Scoreboard');
      dispatch(reset());
      console.log('Saved leaderboard:', topTen);
    } catch (e: any) {
      Alert.alert('Error saving score', e.message);
    }
  };

  return (
    <Modal visible={isShown} animationType="slide" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#505050c7',
        }}
      >
        <View
          style={{
            width: '90%',
            height: '30%',
            backgroundColor: '#b69a5ef5',
            borderRadius: 50,
            borderColor: '#000000',
            borderWidth: 5,
          }}
        >
          <View
            style={{
              marginTop: 10,
            }}
          >
            <Text style={styles.modalText}>Your Score:</Text>
            <Text style={styles.modalText}>
              Please input your name to submit (upto 6 chars)
            </Text>
            <View
              style={{
                paddingTop: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TextInput
                style={{
                  width: '80%',
                  height: 40,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  marginTop: 10,
                  marginBottom: 20,
                  textAlign: 'center',
                }}
                value={name}
                onChangeText={setName}
                placeholder="Your name"
              />
              <Pressable
                onPress={onSubmit}
                style={{
                  backgroundColor: '#63aa6c',
                  paddingVertical: 2,
                  paddingHorizontal: 30,
                  borderRadius: 15,
                  marginVertical: 2,
                }}
              >
                <Text
                  style={{ fontSize: 18, color: '#fff', fontWeight: 'bold' }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalText: {
    marginHorizontal: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NameInputModal;

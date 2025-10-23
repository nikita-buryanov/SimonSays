import SoundPlayer from 'react-native-sound-player';

const playClick = () => {
  try {
    SoundPlayer.playSoundFile('click', 'mp3');
  } catch (e) {
    console.log('Error playing sound:', e);
  }
};

export default {
  play: playClick,
};

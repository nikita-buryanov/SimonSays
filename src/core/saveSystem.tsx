import AsyncStorage from '@react-native-async-storage/async-storage';

const saveSystem = {
  saveData: async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save data', e);
    }
  },

  loadData: async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to load data', e);
    }
  },

  removeData: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error('Failed to remove data', e);
    }
  },
};

export default saveSystem;

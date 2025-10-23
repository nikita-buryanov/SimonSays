import { createSlice } from '@reduxjs/toolkit';

const nameModalSlice = createSlice({
  name: 'nameModal',
  initialState: { isShown: false },
  reducers: {
    openModal: state => {
      state.isShown = true;
    },
    closeModal: state => {
      state.isShown = false;
    },
  },
});

export const { openModal, closeModal } = nameModalSlice.actions;
export default nameModalSlice.reducer;

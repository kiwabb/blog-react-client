import { createSlice, configureStore } from '@reduxjs/toolkit';

const loadUserInfoFromLocalStorage = () => {
  try {
    const serializedUserInfo = localStorage.getItem('userInfo');
    if (serializedUserInfo === null) {
      return undefined;
    }
    return JSON.parse(serializedUserInfo);
  } catch (error) {
    console.error('Error loading userInfo from local storage:', error);
    return undefined;
  }
};

const slice = createSlice({
  name: 'state',
  initialState: {
    toolbar: {
      visible: true,
      enter: false,
    },
    headShowType: 1,
    userInfo: loadUserInfoFromLocalStorage() || null
  },

  reducers: {
    setToolbar: (state, action) => {
      state.toolbar = action.payload;
    },
    setHeadShowType: (state, action) => {
      state.headShowType = action.payload
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
      try {
        const serializedUserInfo = JSON.stringify(action.payload);
        localStorage.setItem('userInfo', serializedUserInfo);
      } catch (error) {
        console.error('Error saving userInfo to local storage:', error);
      }
    }
  }
});

export const {setToolbar, setHeadShowType, setUserInfo} = slice.actions

const store = configureStore({
  reducer: {
    state: slice.reducer
  }
})

export default store;
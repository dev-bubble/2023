import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import battleReducer from '../features/battle/battleSlice';
import bossReducer from '../features/boss/bossSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    boss: bossReducer,
    battle: battleReducer,
  },
});

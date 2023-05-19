import React from 'react'
import userSlice from '../slices/userSlice';
import documentSlice from '../slices/documentSlice';
import { combineReducers } from 'redux';
import clubSlice from '../slices/clubSlice';

const reducers = combineReducers({
  user: userSlice,
  document: documentSlice,
  club: clubSlice,

  // dodaj inne slice'y, jeśli istnieją
});


export default reducers

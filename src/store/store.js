import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import redditReducer from './redditSlice';
import subRedditsReducer from './subRedditsSlice';

export default configureStore({
  reducer: combineReducers({
    user: userReducer,
    reddit: redditReducer,
    subreddits: subRedditsReducer,
  }),
});


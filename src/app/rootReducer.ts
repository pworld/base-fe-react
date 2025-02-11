import { combineReducers } from '@reduxjs/toolkit';
// import usersReducer from '@/pages/users-redux-sample/userSlice';

const rootReducer = combineReducers({
  // Add other feature reducers here as needed
  // users: usersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

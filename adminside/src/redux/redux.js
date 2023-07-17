import { configureStore, createSlice } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    name: '',
    email: '',
    loggedIn: false,
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLogout: () => {
      return {
        name: '',
        email: '',
        loggedIn: false,
      };
    }
  },
});


const persistConfig = {
  key: 'root',
  storage,
};

const persistedAdminReducer = persistReducer(persistConfig, adminSlice.reducer);


export const { setname, setemail,   setLoggedIn,setLogout} = adminSlice.actions;

export const store = configureStore({
  reducer: {
    admin:persistedAdminReducer

  },
});

export const persistor = persistStore(store);

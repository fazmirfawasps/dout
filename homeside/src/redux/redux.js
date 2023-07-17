import { configureStore, createSlice, } from '@reduxjs/toolkit'
import { persistStore, persistReducer , FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    Verified: false,
    Hostapplied: false,
    id:'',
    isHosted:false
  },
  reducers: {
    setName: (state, action) => {
      state.name = action.payload
    },
    setVerified: (state, action) => {
      state.Verified = action.payload
    },
    setHostapplied: (state, action) => {
      state.Hostapplied = action.payload
    },
    setId:(state, action) => {
      state.id = action.payload
    },
    setIshosted:(state, action) => {
      state.isHosted = action.payload
    },
    setLogout: () => {
      return {
        name: 'John Doe',
        Verified: false,
        Hostapplied: false,
        id:'',
        isHosted:false
      };
    }
  

  }

})

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    items: []
  },
  reducers: {
    addProperty: (state, action) => {
      state.items= action.payload
    },
    removeProperty: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      state.items.splice(index, 1)
    },
    updateProperty: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      state.items[index] = action.payload
    }
  }
})


const persistConfig = {
  key: 'root',
  storage
}

const persistedUserReducer = persistReducer(persistConfig, userSlice.reducer)
const persistedPropertyReducer = persistReducer(persistConfig, propertySlice.reducer)

export const { setName, setVerified, setHostapplied,setId ,setIshosted,setLogout} = userSlice.actions
export const { addProperty, removeProperty, updateProperty } = propertySlice.actions

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    property: persistedPropertyReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistor = persistStore(store)
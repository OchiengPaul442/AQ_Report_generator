import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from 'redux'

// Slice reducers
import gridReducer from './GrideSlice'
import darkModeReducer from './DarkModeSlice'
import chartSlice from './ChartSlice'

const rootReducer = combineReducers({
  grid: gridReducer,
  darkMode: darkModeReducer,
  chart: chartSlice,
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

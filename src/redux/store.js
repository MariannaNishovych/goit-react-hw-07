import { configureStore } from "@reduxjs/toolkit";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    } from "redux-persist";

import storage from "redux-persist/lib/storage";
import { contactsReducer } from "./contactsSlice";
import { filterReducer } from "./filtersSlice";

    const userConfig = {
    key: "contacts",
    storage,
    }

export const store = configureStore({
    reducer: {
        contacts: persistReducer(userConfig, contactsReducer),
        filter: filterReducer,
    },

middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
    serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
    }),
});

export const persistor = persistStore(store);
import { createSlice } from '@reduxjs/toolkit';
import data from '../contacts.json'

const initialState = {
    items: data,
};

export const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState,
    reducers: {
    addContact: (state, action) => {
        state.items.unshift(action.payload);
    },
    deleteContact: (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
    },
});

export const contactsReducer = contactsSlice.reducer;
export const { addContact, deleteContact } = contactsSlice.actions;
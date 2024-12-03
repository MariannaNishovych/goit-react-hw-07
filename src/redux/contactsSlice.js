import { createSlice } from '@reduxjs/toolkit';
import data from '../contacts.json'
import { fetchContacts, deleteContact, addContact } from './contactsOps';

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
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.items = action.payload;
        })
        .addCase(fetchContacts.pending, (state, action) => {
            state.isLoading = true;
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
state.items = state.items.filter(item => item.id !== action.payload.id);
        })
        .addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
    }
});

export const contactsReducer = contactsSlice.reducer;
// export const { addContact} = contactsSlice.actions;
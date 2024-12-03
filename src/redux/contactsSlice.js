import { createSlice, isAnyOf } from '@reduxjs/toolkit';
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
        .addCase(deleteContact.fulfilled, (state, action) => {
state.items = state.items.filter(item => item.id !== action.payload.id);
        })
        .addCase(addContact.fulfilled, (state, action) => {
            state.items.push(action.payload);
        })
        .addMatcher(isAnyOf(fetchContacts.pending, deleteContact.pending, addContact.pending), (state) => {
            state.isError = false;
            state.isLoading = true;
        })
        .addMatcher(isAnyOf(fetchContacts.rejected, deleteContact.rejected, addContact.rejected), (state, action) => {
            state.isError = action.payload;
            state.isLoading = false;
        })
        .addMatcher(isAnyOf(fetchContacts.fulfilled, deleteContact.fulfilled, addContact.fulfilled), (state, action) => {
            state.isLoading = false;
        })
    }
});


export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
export const contactsReducer = contactsSlice.reducer;
// export const { addContact} = contactsSlice.actions;
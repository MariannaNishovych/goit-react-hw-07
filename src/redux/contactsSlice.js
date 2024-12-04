import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, deleteContact, addContact } from './contactsOps';
import { selectNameFilter } from './filtersSlice';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: "contacts",
    initialState: initialState,

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

export const selectContacts = state => state.contacts.items;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectIsError = state => state.contacts.isError;
export const contactsReducer = contactsSlice.reducer;



export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter], (contacts, filter) => {
        return contacts.filter((contact) => {
            return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
    }
);

export default contactsSlice.reducer;
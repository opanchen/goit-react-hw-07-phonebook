import { createSlice } from "@reduxjs/toolkit";
// import { defaultContacts } from "data";
import { fetchContacts, addContact, deleteContact } from "./operations";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        // items: defaultContacts,
        items: [],
        isLoading: false,
        error: null,
    },

    //! Зверни увагу на редюсер видалення, чи не мутує він стейт (властивості еррор та ісЛоадінг можуть стератися...)

    // reducers : {

    //     add: {
    //         reducer(state, action) {
    //             state.items.push(action.payload);
    //         },
    //         prepare(name, number) {
    //             return {
    //                 payload: {
    //                     name,
    //                     number,
    //                     id: nanoid(),
    //                 },
    //             };
    //         },
    //     },

    //     remove: (state, action) => {
    //         return {items: state.items.filter(contact => contact.id !== action.payload)}
    //     },

    // },

    extraReducers: {
        [fetchContacts.pending](state, action) {
            state.isLoading = true;
        },
        [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
        },
        [fetchContacts.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        [addContact.pending](state, action) {
            state.isLoading = true;
        },
        [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
        },
        [addContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        [deleteContact.pending](state, action) {
            state.isLoading = true;
        },
        [deleteContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;

            // TODO ---> first version:
            const index = state.items.findIndex(
                contact => contact.id === action.payload.id
            );
            state.items.splice(index, 1);
            // TODO ---> my version (need to check out):
            // return {
            //     ...state, 
            //     items: state.items.filter(contact => contact.id !== action.payload)
            // }
        },
        [deleteContact.rejected](state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }

});

// export const { add, remove} = contactsSlice.actions;
import { createSlice, nanoid } from "@reduxjs/toolkit";
import { defaultContacts } from "data";

export const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {items: defaultContacts},
    reducers : {

        add: {
            reducer(state, action) {
                state.items.push(action.payload);
            },
            prepare(name, number) {
                return {
                    payload: {
                        name,
                        number,
                        id: nanoid(),
                    },
                };
            },
        },

        remove: (state, action) => {
            return {items: state.items.filter(contact => contact.id !== action.payload)}
        },

    },
});

export const { add, remove} = contactsSlice.actions;
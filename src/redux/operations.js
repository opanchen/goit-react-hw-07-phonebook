import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'https://646420ce127ad0b8f8981ed4.mockapi.io/api/v1';

export const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts', {
                signal: thunkAPI.signal,
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const addContact = createAsyncThunk(
    'contacts/addContact',
    async ({name, number}, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', { name, phone: number});
            toast.success(`${name} has been added to the contact list successfully!`)
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactId}`);
            toast.success('Contact has been removed.')
            return response.data;
        } catch (error) {
            toast.error(error.response.data);
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


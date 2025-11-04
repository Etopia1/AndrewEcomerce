// src/redux/templateSlice.js
import { createSlice } from '@reduxjs/toolkit';

const templateSlice = createSlice({
  name: 'templates',
  initialState: [
    { id: 1, name: 'Welcome Email', content: 'Hello, welcome to our service!' },
    { id: 2, name: 'Reminder Email', content: 'This is a reminder email.' },
    { id: 3, name: 'Newsletter', content: 'Here’s our latest newsletter.' },
  ],
  reducers: {
    // You can add actions to manage templates here if necessary
  },
});

export default templateSlice.reducer;

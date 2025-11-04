// src/redux/emailSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Email slice to manage emails
const emailSlice = createSlice({
  name: 'emails',
  initialState: {
    emails: [],  // Store emails in an array
    token : "",
    userData :{},
    marChantId:"",
    userId:"",
    marChantData :{},
    marChantToken :"",
    allSelected: false,  // Keep track of whether all emails are selected
  },
  reducers: {
    AllData: (state, action) => {
      state.userData = action.payload;
    },
    Addtoken: (state, action) => {
      state.token = action.payload;
    },
    AddUserId: (state, action) => {
      state.userId = action.payload;
    },
    AddMarchantId: (state, action) => {
      state.marChantId = action.payload;
    },
    AddMarchanttoken: (state, action) => {
      state.marChantToken = action.payload;
    },
    clearUser: (state) => {
      state.userData = {};
      state.token = "";
    },
    clearMarchant: (state) => {
      state.marChantData = {};
      state.marChantToken = "";
    },
   AddmarchantData :(state, action)=>{
    state.marChantData =action.payload
   }
  },
});

export const {  AddmarchantData, AddMarchanttoken, AddMarchantId, AddUserId, clearMarchant, AllData, clearUser, Addtoken } = emailSlice.actions;
export default emailSlice.reducer;

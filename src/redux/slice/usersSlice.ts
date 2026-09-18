import { createSlice } from "@reduxjs/toolkit";

export type UserType = {
    id:string;
    username:string;
    password:string;
    email:string;
};

const USERS = "users";
const usersStorage = (state:UserType[])=> {
    localStorage.setItem(USERS,JSON.stringify(state))
};
const stored = localStorage.getItem(USERS);

export const usersSlice = createSlice({
    name:"users",
    initialState:(stored ? JSON.parse(stored) : [])as UserType[],
    reducers:{
        add(state,action){
            console.log(state);
            state.push(action.payload);
            usersStorage(state);
        },
    }
});

export const usersActions = usersSlice.actions;

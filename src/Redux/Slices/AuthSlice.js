import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {

    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role")  || "",
    data: localStorage.getItem('data') || {}

}

export const createAccount = createAsyncThunk("auth/signup", async (data) => {
    try {

        const response = axiosInstance.post("/user/register", data);
            toast.promise(response, {
                loading:"Wait !creating your account",
                success:(data) => {return data?. data?.message},
                error:"failed to create account"
            })
            return (await response).data;        
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})
// this is a async thunk , it's work like action, but action first ot will resloce it's promise and then action dispatch 


// login Action

export const login = createAsyncThunk("auth/login", async (data) => {
    try {

        const response = axiosInstance.post("/user/signin", data);
            toast.promise(response, {
                loading:"Wait ! Authentication in Process",
                success:(data) => {return data?. data?.message},
                error:"failed to login"
            })
            return (await response).data;        
    } catch (error) {
        toast.error(error?.reponse?.data?.message)
    }
})




const AuthSlice = createSlice({
    name:'authSlicer',
    initialState,
    reducers:{}

})

export const {}  = AuthSlice.actions;
export default AuthSlice.reducer
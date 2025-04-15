import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {

    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    role: localStorage.getItem("role")  || "",
    data: JSON.parse(localStorage.getItem('data')) || {}

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
        toast.error(error?.response?.data?.message)
    }
})


// logout action 
export const logout = createAsyncThunk("auth/logout", async()=> {
    try {
        const res = axiosInstance.get("/user/logout");
        toast.promise(res, {
            loading:"logging out",
            success:(data) =>  data?. data?.message || "Logout Successfully",
            error:"failed to logout"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})


const AuthSlice = createSlice({
    name:'authSlicer',
    initialState,
    reducers:{},
    extraReducers:(builder) => {
        builder.
        addCase(login.fulfilled, (state, action)=> {
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("role", action ?. payload?.user?.role);
            // update state
            state.isLoggedIn = true;
            state.data =  action?.payload?.user;
            state.role = action?.payload?. user?.role;
        })
        .addCase(logout.fulfilled, (state)=>{
            localStorage.clear();
            state.isLoggedIn = false;
            state.data =  {};
            state.role = ""; 

        })
    }

})

export const {}  = AuthSlice.actions;
export default AuthSlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosInstance";
 

const initialState = {
    courseData:[]
}


export const getAllCourses = createAsyncThunk("/course/get", async() => {
    try {
        const response = axiosInstance.get("/courses")
        toast.promise(response, {
            loading:"loading course data...",
            success:"Courses loaded successfully",
            error:"failed to get courses"
        })
        return (await response).data.courses
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const createCourse = createAsyncThunk("/course/get", async() => {
    try {
        const formData = new FormData()
        
        formData.append("title", data?.title)
        formData.append("description", data?.description)
        formData.append("category", data?.category)
        formData.append("creattedBy", data?.createdBy)
        formData.append("thumbnail", data?.thumbnail)
        formData.append("preveiwImage", data?.preveiwImage)

        const response = axiosInstance.post("/courses",formData)
        toast.promise(response,{
            loading:"creating new course",
            success:"Course created successfully",
            error:"failed to create course ! try again"
        })

        retrun (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const courseSlice = createSlice({
    name:"courses",
    initialState,
    reducers: {},
    extraReducers: (builder)  => {
        builder.addCase(getAllCourses.fulfilled, (state,action)=>{
            if(action.payload){
                // console.log("No Courses",action.payload)
                state.courseData = [...action.payload]
            }
        })
    }
})



export default courseSlice;

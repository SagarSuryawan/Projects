import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function CreateCourse() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:null,
        preveiwImage:""
    })   

     function handelImageUpload(e){
        e.preventDefault();
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    preveiwImage:this.image,
                    thumbnail:uploadedImage
                })
            })
        }
    }

    function handelUserInput(e){
        const {name, value} = e.target  
        setUserInput({
            ...userInput,
            [name] : value
        })

    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.description || !userInput.category || userInput.thumbnail || userInput.createdBy){
            toast.error("All feilds are required")
            return;
        }

        const response = await dispatch(creatNewCourse(userInput))
        if(response?. payload?. success){
            setUserInput({
                title:"",
                category:"",
                createdBy:"",
                description:"",
                thumbnail:null,
                preveiwImage:""
            })
        }
        navigate("/courses")

    }

    return (

    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
            <form 
                  onSubmit={onFormSubmit}
                  className = "flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">

                <h1 className="text-center text-2xl font-bold">Create New Course</h1>
                
            </form>
        </div>
    </HomeLayout>
        
    )
}


export default CreateCourse;
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [userInput, setUserInput] = useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:null,
        previewImage:""
    })   

     function handelImageUpload(e){
        // e.preventDefault();
        const uploadedImage = e.target.files[0]
        if(uploadedImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage)
            fileReader.addEventListener("load", function(){
                setUserInput({
                    ...userInput,
                    previewImage:fileReader.result  ,
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

        if(!userInput.title || !userInput.description || !userInput.category || !userInput.thumbnail || !userInput.createdBy){
            toast.error("All feilds are required")
            return;
        }

        const response =  dispatch(createCourse(userInput))
        if(response?. payload?. success){
            setUserInput({
                title:"",
                category:"",
                createdBy:"",
                description:"",
                thumbnail:null,
                previewImage:""
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

                <Link className=" absolute top-8 text-2xl link text-accent cursor-pointer">
                  <FaArrowLeftLong className="hover:cursore-pointer"/>
                </Link>
                <h1 className="text-center text-2xl font-bold">Create New Course</h1>

                <main className="grid grid-cols-2 gap-x-10">

                    <div className="gap-y-6">
                        <div>
                            <label htmlFor="image_uploads" className="cursor-pointer">
                               {userInput?.previewImage ? (
                                <img src={userInput.previewImage} alt="" className="w-full h-44 m-auto border" />
                                ):(
                                    <div className="w-full h-44 m-auto flex items-center justify-center border">
                                        <h1 className="font-bold text-lg">uplaod your course thumbnail</h1>
                                    </div>
                                )}
                            </label>
                            <input type="file" className="hidden" id="image_uploads" accept=".jpg, .jpeg, .png" name="image_uploads" onChange={handelImageUpload} />
                        </div>
                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="title" className="text-lg font-semibold">
                                Course Title
                            </label>
                            <input
                               type="text"
                               required 
                               name="title"
                               id="title"
                               placeholder="enter course title"
                               className="bg-transparent px-2 py-1 border" 
                               value={userInput.title} onChange={handelUserInput}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1">
                    <div className="flex flex-col gap-1 ">
                            <label htmlFor="createdBy" className="text-lg font-semibold">
                                Course Instructor
                            </label>
                            <input
                               type="text"
                               required 
                               name="createdBy"
                               id="createdBy"
                               placeholder="enter Instructor Name"
                               className="bg-transparent px-2 py-1 border" 
                               value={userInput.createdBy} onChange={handelUserInput}
                            />
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="createdBy" className="text-lg font-semibold">
                                Course Category
                            </label>
                            <input
                               type="text"
                               required 
                               name="category"
                               id="category"
                               placeholder="enter category"
                               className="bg-transparent px-2 py-1 border" 
                               value={userInput.category} onChange={handelUserInput}
                            />
                        </div>

                        <div className="flex flex-col gap-1 ">
                            <label htmlFor="createdBy" className="text-lg font-semibold">
                                Course Description
                            </label>
                            <textarea
                               type="text"
                               required 
                               name="description"
                               id="description"
                               placeholder="enter description"
                               className="bg-transparent px-2 py-1 h-24 border overflow-y-scrool resize-none" 
                               value={userInput.description} onChange={handelUserInput}
                               />
                        </div>

                    </div> 

                </main>

                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 py-1">
                    create course
                    </button>
                
            </form>
        </div>
    </HomeLayout>
        
    )
}

export default CreateCourse;
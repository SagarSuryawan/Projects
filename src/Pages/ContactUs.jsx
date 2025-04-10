import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast";
import { isEmail } from "../Helpers/regexMatcher";
import axiosInstance from "../Helpers/axiosInstance";

function ContactUs() {

    const[userInput, setUserInput] = useState({
        name:"",
        email:"",
        message:""
    })

    function handelInputChange(e){
        const {name, value} = e.target;
        console.log(name,value)
        setUserInput({
            ...userInput,
            [name]: value
        })
     }
    //  api call
    async function onFormSubmit(e){
      e.preventDefault();

      if(!userInput.email || !userInput.name || !userInput.message){
        toast.error("All feild are required")
        return;
      }
      if(!isEmail(userInput.email)){
         toast.error("invalid email")
         return;
      }

      try {
        
        const res = axiosInstance.post("/contact",userInput)
        toast.promise(res,{
          loading:"submitting your message",
          success:"form submitted successfully",
          error:"failed to submit"

        })
        const contactResponse = await res
        if(contactResponse?.data?.success){
          setUserInput({
            name:"",
            email:"",
            message:""
          })
        }
      } catch (error) {
        toast.error("operation failed...")
      }
    }


    return(
    <HomeLayout>
      <div className="flex items-center justify-center h-[100vh]">
        <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white w-[22rem] ">

                <h1 className="text-3xl">Contact Form</h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xl font-semibold">Name</label>

                    <input 
                     type="text"
                     id="name" 
                     name="name" 
                     value={userInput.name}
                     placeholder="Enter your name "
                     onChange={handelInputChange}
                     className="bg-transparant border px-2 py-1 rounded-sm" />
                    
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xl font-semibold">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email" 
                      value={userInput.email}
                      onChange={handelInputChange}
                      className="bg-transparant border px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-col w-full gap-1">
                  <label htmlFor="message" className="text-xl font-semibold">Message</label>
                  <textarea
                    id="message" 
                    name="message" 
                    placeholder="Enter your message" 
                    value={userInput.message}
                    onChange={handelInputChange}
                    className="bg-transparant border px-2 py-1 rounded-sm resize-none h-40"/>
                </div>

            <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-4 py-2 rounded-lg hover:text-black cursor-pointer">Submit</button>

        </form> 
      </div>
    </HomeLayout>
    )
}

export default ContactUs
import { useState } from "react"
import HomeLayout from "../Layouts/HomeLayout"
import toast from "react-hot-toast";

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

     async function onFormSubmit(e) {
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
        toast.error("All feild are mandatory")
        return;
        }
     }

    return(
    <HomeLayout>
        <div className="flex items-center justify-center h-[100vh]">
         <form onSubmit={onFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white w-[22rem] ">

                <h1 className="text-3xl">Contact Form</h1>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="name" className="text-xl font-semibold">
                      Name  
                    </label>
                    <input type="text" id="name" name="name" placeholder="Enter your name "
                    onChange={handelInputChange}
                    className="bg-transparant border px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="email" className="text-xl font-semibold">
                      Email  
                    </label>
                    <input type="email" id="email" name="email" placeholder="Enter your email " onChange={handelInputChange}
                    className="bg-transparant border px-2 py-1 rounded-sm" />
                </div>
                <div className="flex flex-col w-full gap-1">
                    <label htmlFor="message" className="text-xl font-semibold">
                      Message  
                    </label>
                    <textarea  id="message" name="meassage" placeholder="Enter your message" onChange={handelInputChange}
                    className="bg-transparant border px-2 py-1 rounded-sm resize-none h-40" />
                </div>
                <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 mt-4 py-2 rounded-lg hover:text-black">Submit</button>
         </form> 
       </div>
    </HomeLayout>
    )
}

export default ContactUs
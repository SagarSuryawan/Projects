import { Navigate, useNavigate } from "react-router-dom"
function DeniedPage() {

    const navigate = useNavigate()

    return(
        <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">403</h1>
            <div className="bg-black text-white px-2 text-sm rounded rotate-12 absolute px-3 py-2 flex justify-center items-center">
                Access denied
            </div>
            <button onClick = {()=>navigate(-1)} className="px-4 py-2 rounded bg-white text-black mt-5 cursor-pointer">
                <span>
                Go back
                </span> </button>
        </main>
    )

}

export default DeniedPage
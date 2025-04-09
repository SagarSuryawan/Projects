import { useNavigate } from "react-router-dom" 


function CourseCard() {

    return(
        <div onClick={()=>navigate("/course/description/")}
         className=" text-white w-[22rem] h-[430px] shadow-lg rounded-lg cursor-pointer group overflow-hidden ">
            <div className=" overflow hidden ">

                <img src={data?.thumbnail?.secure_url} className="h-40 w-full rounded-tl-lg rounded-tr-lg group-hover:scale=[1,2] transition-all ease-in-out duration-300"  alt="course thubnail" />
                <div className="p-3 ">
                    <h2>
                        {data?.title}
                    </h2>
                    <p>{data?. description}</p>
                    <p>
                        <span>Category:</span>
                        {data?. category}</p>

                        <p>
                        <span>total lectures:</span>
                        {data?. numberoflectures}
                        </p>

                        <p>
                        <span>instructore:</span>
                        {data?. createdBy}</p>

                </div>

            </div>
        </div>
    )

}

export default CourseCard
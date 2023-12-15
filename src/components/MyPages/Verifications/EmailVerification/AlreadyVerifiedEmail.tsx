// import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { tickImageUrl } from "./Images";
import { paths } from "@/lib/HelperFunctions/Path";
// import { useCookies } from "react-cookie";

const AlreadyVerifiedEmail = () => {
    const navigate = useNavigate();
    // const [cookie] = useCookies();
    // useEffect(()=> {
    //     const emailVerified = cookie.emailVerification;
    //     if(!emailVerified){
    //         navigate("/Sindalah/verify/email");
    //     }

    // },[])

    const handleMainPageBtnClick = () =>{
        navigate(paths.main)
    }

    return (
        <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={tickImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">
                {/* {if(cookie.EmailVerification)} */}
                Your email has already been verified</h1>
            <p className="text-lg mb-4">
            Explore and engage with the community on our main page
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300" onClick={()=> handleMainPageBtnClick()}>
                Main Page &rarr;
            </button>
          </div>
      
      );
  };

export default AlreadyVerifiedEmail
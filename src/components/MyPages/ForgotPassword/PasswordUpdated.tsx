import { useNavigate } from "react-router-dom";
import { tickImageUrl } from "../Verifications/EmailVerification/Images";
import { useEffect } from "react";
import { paths } from "@/lib/HelperFunctions/Path";

const PasswordUpdated = () => {
    const navigate = useNavigate();
    
   

    useEffect(()=>{
        if(localStorage.getItem("cookieFallback")){
            return navigate(paths.main);
        }
    },[])

    const handleMainPageBtnClick = () =>{
        return navigate(paths.signin)
    }

    return (
        <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={tickImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">
                {/* {if(cookie.EmailVerification)} */}
                Password Reset Successfull</h1>
            <p className="text-lg mb-4">
            Sign in to continue.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300" onClick={()=> handleMainPageBtnClick()}>
                Sign in &rarr;
            </button>
          </div>
      
      );
}

export default PasswordUpdated
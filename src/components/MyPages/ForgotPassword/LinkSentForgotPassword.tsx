import { useNavigate } from "react-router-dom"
import { emailImageUrl } from "../Verifications/EmailVerification/Images"
import { useEffect } from "react";
import { paths } from "@/lib/HelperFunctions/Path";

const LinkSentForgotPassword = () => {
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("cookieFallback")){
            return navigate(paths.main);
        }
    },[])
  return (
    <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={emailImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">Email Sent</h1>
        
            <p className="text-lg mb-8">
              Please check your inbox and click on the link to reset your account password.
            </p>
          </div>
  )
}

export default LinkSentForgotPassword
import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { crossImageUrl } from "./Images";
import { useCookies } from "react-cookie";
import { paths } from "@/lib/HelperFunctions/Path";

const FailedEmailVerification = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies();
    useEffect(()=> {
        const emailVerified = cookie.emailVerification;
        if(emailVerified){
            navigate(paths.verification_email_done);
        }

    },[])

    const handleMainPageBtnClick = () =>{
        navigate(paths.verification_email)
    }

    return (
        <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={crossImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">
                Email Verification Failed</h1>
            <p className="text-lg mb-4">
            Please try again.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300" onClick={()=> handleMainPageBtnClick()}>
                Verify Again
            </button>
          </div>
      
      );
}

export default FailedEmailVerification
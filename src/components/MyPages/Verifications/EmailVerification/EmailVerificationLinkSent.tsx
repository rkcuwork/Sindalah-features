import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { emailImageUrl } from "./Images";
import { useCookies } from "react-cookie";
import { paths } from "@/lib/HelperFunctions/Path";

const EmailVerificationLinkSent = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies();
    useEffect(()=> {
        const emailSent = localStorage.getItem("VerificationEmailSent");
      
        if(!emailSent){
            return navigate(paths.verification_email);
        }
        if(cookie.emailVerification){
            return navigate(paths.verification_email_done);
        }
    },[])

    return (
        <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={emailImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">
                Verification Email Sent</h1>
            <p className="text-lg mb-4">
              An email containing a verification link has been sent to your email address.
            </p>
            <p className="text-lg mb-8">
              Please check your inbox and click on the link to verify your account.
            </p>
          </div>
      
      );
  };

export default EmailVerificationLinkSent
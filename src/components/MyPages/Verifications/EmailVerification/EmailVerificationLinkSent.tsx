import { useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { emailImageUrl } from "./Images";
import { useCookies } from "react-cookie";

const EmailVerificationLinkSent = () => {
    const navigate = useNavigate();
    const [cookie] = useCookies();
    useEffect(()=> {
        const emailSent = localStorage.getItem("VerificationEmailSent");
        // const user = localStorage.getItem("user");
        // if(!user){
        //     return navigate("/Sindalah/sign-in");
        // }
        if(!emailSent){
            return navigate("/Sindalah/verify/email");
        }
        if(cookie.emailVerification){
            return navigate("/Sindalah/verify/email/done");
        }
    },[])

    return (
        <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            <img src={emailImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4" />
            <h1 className="text-4xl font-bold mb-4">
                {/* {if(cookie.EmailVerification)} */}
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
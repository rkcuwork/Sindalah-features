
import { useSendVerificationEmailLink } from "@/lib/React-Query/QueriesAndMutatiions";
import { useToast } from "@/components/ui/use-toast"
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Shared/Loader";
import { useEffect, useState } from "react";


const EmailVerification =  () => {
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState("");
  const [cookies] = useCookies();
  
  useEffect(()=>{
    if(cookies.emailVerification){
      return navigate("/Sindalah/verify/email/done");
    }
    const storedValue = localStorage.getItem('user');
    if(storedValue){
      const email = JSON.parse(storedValue).email;
      setUserEmail(email);
    }
    // else if (!storedValue){
    //   navigate("/Sindalah/Sign-in");
    // }
  },[]);
  

    const {toast} = useToast();


    const {mutateAsync: sendEmail, isPending:isSendingEmail} = useSendVerificationEmailLink();
 

    const handleSendLinkClick = async () =>{
      const mailSent = await sendEmail();

      if(mailSent){
        localStorage.setItem("VerificationEmailSent","true");
        navigate("/Sindalah/verify/email/sent");
      }
      else{
        return  toast({
          title: "Verification email was not sent. Please Try Again.",
          // description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    }


  return (
    
    <div className="min-h-screen flex items-center justify-center bg-black mx-auto">
    <div className="bg-gray-800 p-8 rounded-md shadow-md w-full sm:w-96 text-center">
      <h2 className="text-2xl font-semibold text-white mb-4">Verify Your Email</h2>
      <p className="text-gray-400 mb-6">A verification link will be sent to your email address. <br /><strong className="text-white mb-4">{userEmail}</strong></p>
      
      
      {/* Buttons */}
      <div className="flex space-x-4 justify-center">
        <button
          className="w-1/2 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={() => handleSendLinkClick()}
        >
          {isSendingEmail?
            (<div className="flex-center gap-2">
              <Loader/> Sending...
            </div>):
            ("Send Link")}
        </button>
        {/* <button
          className="w-1/2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-400"
          onClick={() => console.log('Update Email button clicked')}
        >
          Update Email
        </button> */}
      </div>
    </div>
  </div>
  )
}

export default EmailVerification

import { useSendVerificationEmailLink, useUpdateEmail } from "@/lib/React-Query/QueriesAndMutatiions";
import { useToast } from "@/components/ui/use-toast"
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import Loader from "@/components/Shared/Loader";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger, } from "@/components/ui/popover";
import { decrypt } from "@/lib/HelperFunctions/Helper";
import { paths } from "@/lib/HelperFunctions/Path";




const EmailVerification =  () => {
  const navigate = useNavigate();
  const [userEmail,setUserEmail] = useState("");
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [cookies] = useCookies();
  // const [emailUpdateFailed,setEmailUpdateFailed] = useState(false);
  const [newEmail,setNewEmail] = useState("");
  const [message,setMessage] = useState("");

  const {mutateAsync: updateEmail, isPending:isUpdatingEmail} = useUpdateEmail();
  const {mutateAsync: sendEmail, isPending:isSendingEmail} = useSendVerificationEmailLink();
  
  useEffect(()=>{
    if(cookies.emailVerification){
      return navigate(paths.verification_email_done);
    }
    const storedValue = localStorage.getItem('user');
    if(storedValue){
      const email = JSON.parse(storedValue).email;
      setUserEmail(email);
    }
 
  },[]);
  

    const {toast} = useToast();


 

    const handleSendLinkClick = async () =>{
      const mailSent = await sendEmail();

      if(mailSent){
        localStorage.setItem("VerificationEmailSent","true");
        navigate(paths.verification_email_sent);
      }
      else{
        return  toast({
          title: "Verification email was not sent. Please Try Again.",
          // description: "Friday, February 10, 2023 at 5:57 PM",
        })
      }
    }

    const handleUpdateEmailBtnClick = async () =>{
      setMessage("");
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(emailPattern.test(newEmail)){
        const en_password = localStorage.getItem('p');
        if(en_password){
          const password = decrypt(en_password);
          console.log({password});
          if(await updateEmail({newEmail,password})){
            setUserEmail(newEmail);
            const str_user = localStorage.getItem('user');
            if(str_user){
              const user = JSON.parse(str_user);
              user.email = newEmail;
              localStorage.setItem("user",JSON.stringify(user));
            }
            setPopoverOpen(false);
            
            return;
          }
          else{
            setMessage("Email not updated. Please try again!");
            return;
          }
        }
      }
      else{
        setMessage("Please enter a valid email.")
        return;
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
              Sending...
            </div>):
            ("Send Link")}
        </button>
        {/* <button
          className="w-1/2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-400"
          onClick={() => console.log('Update Email button clicked')}
        >
          Update Email
        </button> */}
        <Popover open={isPopoverOpen} onOpenChange={(isOpen) => setPopoverOpen(isOpen)}>
          <PopoverTrigger className="w-1/2 bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring focus:border-gray-400">Update Email</PopoverTrigger>
          <PopoverContent>
          {/* <div className="min-h-screen flex items-center justify-center bg-black mx-auto "> */}
            <div className="bg-gray-800 p-8 rounded-md shadow-md w-full sm:w-96 text-center ">
              <h2 className="text-2xl font-semibold text-white mb-4">Update Email</h2>
              <p className="text-gray-400 mb-6">
                Enter your new email address below:
              </p>
              
              {/* Input and Button */}
              <div className="mb-4">
                <input
                  type="email"
                  id="newEmail"
                  placeholder="Enter new email"
                  className="mt-1 p-2 border rounded-md w-full bg-gray-700 text-white"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              {message && <div className="mb-4 text-red">{message}</div>}
              <button
                onClick={handleUpdateEmailBtnClick}
                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                {isUpdatingEmail? 
                ("Updating..."):('Update Email')}
                
              </button>
            </div>
          {/* </div> */}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
  )
}

export default EmailVerification
import { verifyEmail } from "@/lib/Appwrite/api";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { tickImageUrl } from "./Images";
import Spinner from "@/components/MyConponents/Spinner";
import { paths } from "@/lib/HelperFunctions/Path";

const VerifyEmail = () => {
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();
  const [isEmailVerified,setIsEmailVerified] = useState(false);

  useEffect(() => {
    const emailSent = localStorage.getItem('VerificationEmailSent')
   
    const fetchData = async () => {
      if (!emailSent) {
        return navigate(paths.verification_email);
      }
      if (cookies.emailVerification) {
        return navigate(paths.verification_email_done);
      }

      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get('secret');
      const userId = urlParams.get('userId');

      if (secret && userId) {
        try {
          const email = await verifyEmail(userId, secret);
          if(email){
              setCookie('emailVerification', true, { path: '/' });
              // setCookie('EmailVerificationhttponly', true, { path: '/', httpOnly: true });
              setIsEmailVerified(true);
              localStorage.removeItem("VerificationEmailSent");
              localStorage.removeItem("p");

          }
          else{
            
            navigate(paths.verification_email_fail)
          }
        } catch (error) {
          console.log("components :: MyPages :: Verification :: verifyEmail :: error --> ", error);
        }
      }
      else{
        return navigate(paths.verification_email_fail)
      }
    };

    fetchData();
  }, []);

    const handleMainPageBtnClick = () =>{
        navigate(paths.main)
    }

  return (
    <div className="flex items-center justify-center flex-col m-auto h-screen">
        
            
            {isEmailVerified? <div><img src={tickImageUrl} alt="Email Icon" className="w-16 h-16 rounded-full mb-4 " /></div> :
            <div >
                <Spinner w={16} h={16}/>
            </div> }
            
            <h1 className={`text-4xl font-bold mb-4 `}>
                {/* {if(cookie.EmailVerification)} */}
                {isEmailVerified? "Email Verification Successful: Your account is now verified": "Verifying..."}
              </h1>
            <p className={`text-lg mb-4 ${isEmailVerified? "": "hidden"}`}>
            Explore and engage with the community on our main page
            </p>
            <button className={`bg-blue-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-blue-700 hover:shadow-md transition-all duration-300 ${isEmailVerified? "": "hidden"}`} onClick={()=> handleMainPageBtnClick()}>
                Get Started &rarr;
            </button>
          </div>
  );
};

export default VerifyEmail;

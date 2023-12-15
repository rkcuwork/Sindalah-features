import { getCurrentUser } from '@/lib/Appwrite/api';
import { IContextType, IUser } from '@/types';
import {createContext, useContext, useState, useEffect} from 'react';
import {  useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { paths } from '@/lib/HelperFunctions/Path';




export const INITIAL_USER = {
    id:'',
    name:'',
    username:'',
    email:'',
    imageUrl:'',
    bio:'',
    isEmailVerified:false,
    isPhoneVerified: false,
}

const INITIAL_STATE = {
    user:INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,

    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({children}:{children: React.ReactNode}) => {

    const [user, setUser] = useState<IUser>(INITIAL_USER);
    const [isLoading, setisLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [cookie,setCookie] = useCookies();
    const navigate = useNavigate();
    const location = useLocation();

    const checkAuthUser = async () =>{
      console.log("checkAuthUser called");
      setisLoading(true);
      try {
        const currentAccount = await getCurrentUser();
        console.log('currentAccount = >', currentAccount)
        
        if(currentAccount){
          console.log("setting user")
          localStorage.setItem('user', JSON.stringify(currentAccount));
          setCookie('emailVerification', currentAccount.emailVerification, { path: '/'});
          // console.log("cookie auth = ",cookie.emailVerification);
          setUser({
            id: currentAccount.$id,
            name: currentAccount.name,
            username: currentAccount.username,
            email: currentAccount.email,
            imageUrl: currentAccount.imageUrl,
            bio: currentAccount.bio,
            isEmailVerified:  currentAccount.emailVerification,
            isPhoneVerified: currentAccount.phoneVerification,
          });

          if(currentAccount.emailVerification){
            navigate(paths.main)
          }
          setIsAuthenticated(true);
          setisLoading(false);
          // console.log("user in authcontext -> ",user);
          return true;
        }
        return false;

      } catch (error) {
        console.log("Context :: AuthContext :: AuthProvider :: checkAuthUser :: error-->",error);
        return false;
      }
      finally{
        setisLoading(false);
      }
    };

    // useEffect(() => {
    //   console.log("user changed = ",user)
    //   localStorage.setItem('user', JSON.stringify(user));
    // }, [user]);

    useEffect(() => {
      const cookieFallback = localStorage.getItem("cookieFallback");
      
      if (
        cookieFallback === "[]" ||
        cookieFallback === null ||
        cookieFallback === undefined
      ) {
        navigate(paths.signin);
      }
      else if(!cookie.emailVerification && location.pathname !== "/Sindalah/verify-email"){
        navigate(paths.verification_email);
      }
  
      // checkAuthUser();
    }, []);

    

    const value = {
        user,
        setUser,
        isLoading,
        isAuthenticated,
        setIsAuthenticated,
        checkAuthUser,
    }


  return (
    <AuthContext.Provider value={value}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider

export const useUserContext = () => useContext(AuthContext);
import { paths } from "@/lib/HelperFunctions/Path"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/React-Query/QueriesAndMutatiions"
import { useToast } from "../ui/use-toast"
import { useCookies } from "react-cookie"
import { useUserContext } from "@/Context/AuthContext"

const TopBar = () => {
    const {mutateAsync:signOutAccount} = useSignOutAccount();
    const navigate = useNavigate();
    const {toast} = useToast();
    const [,,removeCookie] = useCookies();
    const {user} = useUserContext();
    console.log({user})

    const signout = async () =>{
        const result = await signOutAccount();
        if(result.success){
            localStorage.removeItem("user");
            localStorage.removeItem("cookieFallback");
            removeCookie("emailVerification");
            return navigate(paths.signout);
        }
        else{
            return(toast({
                    title:result.message,
                    description: "Please try again."
                }))
        }
    }
  return (
    <section className="topbar">
        <div className="flex-between py-4 px-5">
            <Link to={paths.main} className="flex gap-3 items-center">
                <img src={`${paths.base}/assets/images/logo.svg`} alt="Sindalah Logo" width={130} height={325} />
            </Link>

            <div className="flex gap-4">
                <Button variant="ghost" className="shad-button_ghost" onClick={signout}>
                    <img src={`${paths.base}/assets/icons/logout.svg`} className="hover:invert-white" alt="Logout" />
                </Button>
                <Link to={`${paths.profile}/${user.id}`} className="flex-center gap-3">
                    <img src={user.imageUrl || `${paths.base}/assets/images/profile-placeholder.png`} alt="Profile Picture" className="h-8 w-8 rounded-full" />
                </Link>
            </div>

        </div>
    </section>
  )
}

export default TopBar
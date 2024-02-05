import { paths } from "@/lib/HelperFunctions/Path"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { useSignOutAccount } from "@/lib/React-Query/QueriesAndMutatiions"
import { useToast } from "../ui/use-toast"
import { useCookies } from "react-cookie"
import { useUserContext } from "@/Context/AuthContext"
import { sidebarLinks } from "@/Contants/Links"
import { INavLink } from "@/types"

const LeftSideBar = () => {
  const {mutateAsync:signOutAccount} = useSignOutAccount();
  const {pathname} = useLocation();
  
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
    <nav className="leftsidebar">
      <div className="flex flex-col gap-10">

        <Link to={paths.main} className="flex gap-3 items-center">
          <img src={`${paths.base}/assets/images/logo.svg`} alt="Sindalah Logo" width={170} height={36} />
        </Link>

        <Link to={`${paths.profile}/${user.id}`} className="flex gap-3 items-center">
          <img src={user.imageUrl || `${paths.base}/assets/images/profile-placeholder.png`} alt="Profile Picture" className="h-14 w-14 rounded-full" />

          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>

          </div>
          </Link>

          <ul className="flex flex-col gap-1">
            {sidebarLinks.map((link:INavLink)=>{
              const isActive = pathname === link.route || pathname===`${link.route}/`;
              return (
                <li className={`leftsidebar-link group ${isActive && "bg-primary-500"}`} key={link.label}>
                  <NavLink to={link.route} className="flex items-center gap-4 p-4" >
                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && "invert-white"}`} />
                    {link.label}</NavLink>

                </li>
              )
            })}
          </ul>

      </div>

      <Button variant="ghost" className="shad-button_ghost" onClick={signout}>
          <div className="flex group gap-4 w-full hover:bg-primary-500 p-4 rounded-lg">
            <img src={`${paths.base}/assets/icons/logout.svg`} className="group-hover:invert-white" alt="Logout" />
            <p className="lg:base-medium text-lg text-red">Logout</p>

          </div>
                    
      </Button>
    </nav>
  )
}

export default LeftSideBar
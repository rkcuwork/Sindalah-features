import { bottombarLinks } from "@/Contants/Links"
import { INavLink } from "@/types";
import { NavLink,useLocation } from "react-router-dom"

const BottomBar = () => {
  const {pathname} = useLocation();

  return (
    <section className="bottom-bar">
       {bottombarLinks.map((link:INavLink)=>{
              const isActive = pathname === link.route || pathname===`${link.route}/`;
              return (
              
                  <NavLink to={link.route} className={`bottom-link group ${isActive && "bg-primary-500 rounded-[10px]"} flex-center flex-col gap-1 p-2 transition`} key={link.label} >
                    <img 
                      src={link.imgURL} 
                      alt={link.label} 
                      className={`group-hover:invert-white ${isActive && "invert-white"}`}
                      width={16}
                      height={16} />
                    <p className="tiny-medium text-light-2">{link.label}</p>
                    </NavLink>

               
              )
            })}
    </section>
  )
}

export default BottomBar
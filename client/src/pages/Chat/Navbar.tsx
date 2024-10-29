
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Profilesection from "./Profilesection";
import { logout } from "@/utils/Logout";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";


const Navbar = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  return (
    <div 
        className="w-full h-[15%] flex justify-end items-center"
        >
          

            <DropdownMenu>
                <DropdownMenuTrigger className="w-1/6 h-1/2 flex focus:outline-none">
                  <Profilesection />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Requests</DropdownMenuItem>
                  <DropdownMenuItem>Add Friends</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>{logout(navigate, removeCookie)}}
                    >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
    </div>
  );
};

export default Navbar;
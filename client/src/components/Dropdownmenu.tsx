import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import Profilesection from "../pages/Chat/Profilesection";
  import { logout } from "@/utils/Logout";

  import { useCookies } from "react-cookie";
  import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { popAddModal, popRequestModal } from "@/redux/slices/chatSlice";

const Dropdownmenu = () => {

    const [_cookies, _setCookie, removeCookie] = useCookies(['token']);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
  return (
    
        <DropdownMenu >
                <DropdownMenuTrigger className="w-1/6 h-1/2 flex focus:outline-none">
                  <Profilesection />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => dispatch(popRequestModal(true))}
                    >Requests</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => dispatch(popAddModal(true))}>
                    Add Friend
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>{logout(navigate, removeCookie)}}
                    >Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
  );
};

export default Dropdownmenu;
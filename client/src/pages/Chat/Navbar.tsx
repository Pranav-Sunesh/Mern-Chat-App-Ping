import DropdownMenu from "@/components/Dropdownmenu";
import { useAppSelector } from "@/hooks/reduxHooks";
import RequestModal from "@/components/RequestModal";
import Addmodal from "@/components/Addmodal";

const Navbar = () => {


  return (
    <div 
        className="w-full h-[15%] flex justify-end items-center"
        >
          <DropdownMenu />
          <RequestModal />
          <Addmodal />
    </div>
  );
};

export default Navbar;
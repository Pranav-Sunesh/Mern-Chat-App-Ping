import DropdownMenu from "@/components/Dropdownmenu";
import Addmodal from "@/components/Addmodal";
import { useAppSelector } from "@/hooks/reduxHooks";
import RequestModal from "@/components/RequestModal";

const Navbar = () => {

  const addModal: boolean = useAppSelector(state => state.chat.addModal);
  const requestModal: boolean = useAppSelector(state => state.chat.requestModal);

  return (
    <div 
        className="w-full h-[15%] flex justify-end items-center"
        >
          <DropdownMenu />
          {addModal && <Addmodal />}
          {requestModal &&  <RequestModal />}
    </div>
  );
};

export default Navbar;
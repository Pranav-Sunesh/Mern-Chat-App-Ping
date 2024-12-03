import DropdownMenu from "@/components/Dropdownmenu";
import { useAppSelector } from "@/hooks/reduxHooks";
import RequestModal from "@/components/RequestModal";
import Addmodal from "@/components/Addmodal";

const Navbar = () => {


  return (
    <div 
        className="w-full h-[15%] flex justify-between items-center"
        >
          <div
            className="h-full flex items-center">
              <div
                className="w-10">
              </div>
              <div
                className=" p-1 px-2 rounded flex justify-center text-white">
                <div
                  className="text-3xl">
                  <span
                   className="">P</span>
                  <span>i</span>
                  <span
                    className="">n</span>
                  <span>g...</span>
                </div>
              </div>
              
          </div>
          <div
            className="h-full flex items-center">
          <DropdownMenu />
          <RequestModal />
          <Addmodal />
          </div>
    </div>
  );
};

export default Navbar;
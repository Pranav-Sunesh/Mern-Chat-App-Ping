import { useAppSelector } from "@/hooks/reduxHooks";
import pfp from "../../assets/avatar/no pfp.jpg"
import Profilepic from "@/components/Profilepic";

const Profilesection = () => {

  const userDetails = useAppSelector(state => state.chat.userDetails);


  return (
    <div
        className="h-full bg-white rounded-md  mr-3 flex justify-end items-center space-x-3 p-8"
        >
        <p
            className="text-lg"
            >
                {localStorage.getItem('username')}
        </p>
        {/* <img 
            src={userDetails?.profilePicURL? userDetails.profilePicURL: pfp}
            alt="Pfp"
            className="w-12 h-12 rounded-[50%] object-contain" /> */}
        <Profilepic 
          profilePicURL={userDetails?.profilePicURL? userDetails.profilePicURL : pfp}
          width="12"
          height="12"  
          />
            
    </div>
  );
};

export default Profilesection;
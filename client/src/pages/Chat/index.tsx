
import Hero from "./Hero";
import Navbar from "./Navbar";  
import { useEffect } from "react";
import { getUser } from "@/services/api/chats/getUser";
import { useAppDispatch,  } from "@/hooks/reduxHooks";
import { setMessages, setUserDetails,  } from "@/redux/slices/chatSlice";
import { joinRoom } from "@/services/socket/socket";


const Chat = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {  

      getUser(localStorage.getItem('username'))
        .then((userDetails) => {
          dispatch(setUserDetails(userDetails));
          joinRoom(userDetails?._id);
        });

        addEventListener("keydown", (e) => {
          if(e.key === 'Escape'){
            dispatch(setMessages(null));
          }
        })

        dispatch(setMessages(null));
  }, [])

  

  return (
    <div
      className="w-screen h-screen bg-gradient-to-l from-[#30cfd0] to-[#330867]"
      >
        <Navbar />
        <Hero />
    </div>
  );
};

export default Chat;
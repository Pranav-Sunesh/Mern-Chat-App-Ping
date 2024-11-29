
import Hero from "./Hero";
import Navbar from "./Navbar";  
import { useEffect } from "react";
import { getUser } from "@/services/api/chats/getUser";
import { useAppDispatch,  } from "@/hooks/reduxHooks";
import { setUserDetails,  } from "@/redux/slices/chatSlice";


const Chat = () => {

  const dispatch = useAppDispatch();

  useEffect(() => {  

      getUser(localStorage.getItem('username'))
        .then((userDetails) => dispatch(setUserDetails(userDetails)));

  }, [])

  

  return (
    <div
      className="w-screen h-screen bg-gradient-to-br from-[#C6B38E] to-[#9A9B73]"
      >
        <Navbar />
        <Hero />
    </div>
  );
};

export default Chat;
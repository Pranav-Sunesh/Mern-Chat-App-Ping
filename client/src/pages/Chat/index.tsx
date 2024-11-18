import { Toaster } from "@/components/ui/toaster";
import Hero from "./Hero";
import Navbar from "./Navbar";  
import { useEffect } from "react";
import { getUser } from "@/services/api/chats/getUser";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setUserId } from "@/redux/slices/chatSlice";
import { joinRoom } from "@/services/socket/socket";


const Chat = () => {

  // const dispatch = useAppDispatch();

  // useEffect(() => {  

    
  //   // getUser(localStorage.getItem('username'))
  //   //   .then((userId) =>joinRoom(userId));

  // }, [])

  return (
    <div
      className="w-screen h-screen bg-gradient-to-br from-green-50 to-green-200"
      >
        <Navbar />
        <Hero />
        <Toaster />
    </div>
  );
};

export default Chat;
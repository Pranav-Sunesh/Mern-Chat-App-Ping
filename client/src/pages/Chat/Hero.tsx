import { useEffect } from "react";
import Chatsec from "./Chatsec";
import Contactsec from "./Contactsec";
import { io } from 'socket.io-client'
import { initializeSocket, socketClose } from "@/services/socket/socket";

const Hero = () => {


  useEffect(() => {
    initializeSocket();
    
    return () => {
      socketClose();
    }
  }, []);

  return (
    <div 
        className="w-full h-[85%] flex justify-around"
        >
            <Contactsec />
            <Chatsec />
    </div>
  );
};

export default Hero;
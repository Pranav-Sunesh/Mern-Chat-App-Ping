import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import Chatsecbody from "./Chatsecbody";
import Chatsecfooter from "./Chatsecfooter";
import Chatsecheader from "./Chatsecheader";
import { useEffect } from "react";
import { setIsTyping, setNewMessage, sortChats, updateLastMessage } from "@/redux/slices/chatSlice";
import { removeSocketReceiveMessage, socket, socketReceiveMessage } from "@/services/socket/socket";

const Chatsec = () => {

  const messages: string[] | [] | null= useAppSelector(state => state.chat.messages);
  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(state => state.chat.selectedChat);
  
  


  return (
    <div
        className=" w-2/3 h-[95%] rounded-md shadow bg-slate-100"
        >
          {
            messages === null? 
            <div 
            id="chat-sec"  
            className="flex h-full justify-center items-center">Start Chatting...</div>
            : 
            (
              <>
                <Chatsecheader />
                <Chatsecbody />
                <Chatsecfooter />
              </>
            )
          }
          
    </div>
  );
};

export default Chatsec;
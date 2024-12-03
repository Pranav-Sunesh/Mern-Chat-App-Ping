import { useEffect } from "react";
import Chatsec from "./Chatsec";
import Contactsec from "./Contactsec";
import { initializeSocket, removeSocketReceiveMessage, socketClose, socketReceiveMessage } from "@/services/socket/socket";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsTyping, setNewMessage, sortChats, updateLastMessage } from "@/redux/slices/chatSlice";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {


  const dispatch = useAppDispatch();
  const selectedChat = useAppSelector(state => state.chat.selectedChat);
  const { toast } = useToast();

  const callback = ({chatId, content, sender, timestamp }: any) => {

    dispatch(setIsTyping(false));
    console.log("Socket: ", selectedChat?._id, ': ', chatId);
    if(selectedChat?._id === chatId){
      dispatch(setNewMessage( {senderUserName: sender, content: content, timestamp: timestamp} ));
    }
    if(selectedChat?._id !== chatId){
      toast({
        title: sender,
        description: content,
        duration: 1500
      })
    }
    dispatch(updateLastMessage({chatId: chatId, lastMessage: {sender: sender, content: content} }));
    dispatch(sortChats());
  }

  useEffect(() => {
    initializeSocket();
    
    return () => {
      socketClose();
    }
  }, []);

  useEffect(() => {
    socketReceiveMessage(callback);
    return () => removeSocketReceiveMessage(callback);
  }, [selectedChat]);

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
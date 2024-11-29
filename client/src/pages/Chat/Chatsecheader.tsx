import { ContactType } from "@/@types";
import Profilepic from "@/components/Profilepic";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsTyping } from "@/redux/slices/chatSlice";
import { typingListener } from "@/services/socket/socket";
import { useEffect, useRef } from "react";

const Chatsecheader = () => {

  const selectedChat: ContactType | null = useAppSelector(state => state.chat.selectedChat);
  const selectedChatName: string = useAppSelector(state => state.chat.selectedChatName);
  const isTyping = useAppSelector(state => state.chat.isTyping);
  const selectedChatRef = useRef('');
  const dispatch = useAppDispatch();

  useEffect(() => {

    const callback = ({chatId, isTyping, sender}: {chatId: string, isTyping: boolean, sender: string}) => {
      if(selectedChatRef.current === chatId && isTyping){
        dispatch(setIsTyping(isTyping));
      }
      if(!isTyping){
        dispatch(setIsTyping(isTyping));
      }
    }
    typingListener(callback);
  },[]);

  useEffect(() => {
    selectedChatRef.current = selectedChat?._id!;
    console.log("selectedChat: ", selectedChat);
  }, [selectedChat?._id]);


  return (
    <div
      className="w-full h-[15%] bg-gray-200 rounded-t-md flex items-center"
      >
        <div
          
          className="flex items-center space-x-5 ml-5 cursor-pointer"
          >
            <Profilepic width='12' height="12" profilePicURL={selectedChat?.participants[0].profilePicURL!}/>
            <div className="flex items-center space-x-2">
              <div
                className="text-lg">
                  {selectedChatName}
              </div>
              {isTyping && <div
                className="text-slate-600 text-sm animate-pulse">
                is Typing....
              </div>}
            </div>
            
        </div>
    </div>
  );
};

export default Chatsecheader;
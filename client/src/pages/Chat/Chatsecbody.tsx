import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setIsTyping, setNewMessage, sortChats, updateLastMessage, updateTimestamp } from "@/redux/slices/chatSlice";
import { socketReceiveMessage } from "@/services/socket/socket";
import { useEffect, useRef } from "react";

const Chatsecbody = () => {

    const messages = useAppSelector(state => state.chat.messages)!;
    const chatBodyRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch();
    const selectedChat = useAppSelector(state => state.chat.selectedChat);
    const selectedChatRef = useRef('');
    const scrollToBottom = () => {
      if(chatBodyRef && chatBodyRef.current){
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }

    useEffect(() => {
      scrollToBottom();
    }, [messages]);


    useEffect(() => {
      selectedChatRef.current = selectedChat?._id!
    }, [selectedChat]); 

    useEffect(() => {
      const callback = ({chatId, content, sender, timestamp }: any) => {
        dispatch(setIsTyping(false));
        if(selectedChatRef.current === chatId){
          dispatch(setNewMessage( {senderUserName: sender, content: content, timestamp: timestamp} ));
          dispatch(updateTimestamp({chatId: chatId, timestamp: timestamp }));
          dispatch(updateLastMessage({chatId: chatId, lastMessage: {sender: sender, content: content} }));
        }
        dispatch(sortChats());
      }

      socketReceiveMessage(callback);
    }, [])



    
  return (
    <div
        onClick={scrollToBottom}
        ref={chatBodyRef}
        id="chat-body"
        className="w-full h-[75%] flex-col-reverse space-y-6 overflow-y-scroll"
        >
            {messages.map((message: any, index: number) => (
                <div 
                  className={`w-full flex items-center h-16 ${message.senderUserName === localStorage.getItem('username')? "justify-end": "justify-start"}`}
                  key={index}
                  >
                    <div
                      className="rounded-md mx-2 mt-10 bg-white min-w-16 px-3 py-1"
                      >
                      <div
                        className={`w-full flex ${message?.senderUserName === localStorage.getItem('username')? "justify-end text-green-400": " text-violet-600 justify-start"}`}
                        >
                          {message?.senderUserName === localStorage.getItem('username')? "You": message.senderUserName}
                        </div>
                      <div
                        className={`w-full flex ${message?.senderUserName === localStorage.getItem('username')? "justify-end": "justify-start"}`}>{message?.content}</div>
                      
                      <div
                        className="text-xs w-full flex justify-end">
                        {new Date(message.timestamp).getHours()}: {new Date(message.timestamp).getMinutes()}
                      </div>
                    </div>
                    
                  </div>
            ))}
    </div>
  );
};

export default Chatsecbody;
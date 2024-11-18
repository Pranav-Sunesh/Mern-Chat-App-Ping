import { useAppSelector } from "@/hooks/reduxHooks";
import { useEffect, useRef } from "react";

const Chatsecbody = () => {

    const messages = useAppSelector(state => state.chat.messages)!;
    const chatBodyRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
      if(chatBodyRef && chatBodyRef.current){
        chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
      }
    }

    useEffect(() => {
      scrollToBottom();
    },[messages])
    
  return (
    <div
        onClick={scrollToBottom}
        ref={chatBodyRef}
        id="chat-body"
        className="w-full h-[75%] flex-col-reverse space-y-6 overflow-y-scroll"
        >
            {messages.map((message: any, index) => (
                <div 
                  className={`w-full flex items-center h-10 ${message.sender === localStorage.getItem('username')? "justify-end": "justify-start"}`}
                  key={index}
                  >
                    <div
                      className="rounded mx-2 mt-10 bg-white min-w-16 px-3 py-1"
                      >
                      <div
                        className={`w-full flex ${message?.sender === localStorage.getItem('username')? "justify-end text-green-400": " text-violet-600 justify-start"}`}
                        >
                          {message?.sender === localStorage.getItem('username')? "You": message.sender}
                        </div>
                      <div
                        className={`w-full flex ${message?.sender === localStorage.getItem('username')? "justify-end": "justify-start"}`}>{message?.content}</div>
                    </div>
                  </div>
            ))}
    </div>
  );
};

export default Chatsecbody;
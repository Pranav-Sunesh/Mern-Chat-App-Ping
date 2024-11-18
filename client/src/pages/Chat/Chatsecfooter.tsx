import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setNewMessage } from "@/redux/slices/chatSlice";
import { sendMessage } from "@/services/api/chats/sendMessage";
import { useState } from "react";

const Chatsecfooter = () => {

  const [message, setMessage] = useState<string>('');
  const selectedChat = useAppSelector(state => state.chat.selectedChat);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    const userName = localStorage.getItem('username');
    const timestamp = new Date().toISOString();
    dispatch(setNewMessage({ sender: userName, content: message, timestamp: timestamp}));
    sendMessage(e, selectedChat, userName, message, timestamp);
  }


  return (
    <div
        className="w-full h-[10%] "
        >
            <form 
                action=""
                className="w-full h-full flex justify-center items-center space-x-2"
                >
                <Input 
                  className="w-1/2"
                  placeholder="Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)} />
                <Button 
                  onClick={handleSubmit}
                  type="submit"
                  variant={'default'}>Send</Button>
                
            </form>
    </div>
  );
};

export default Chatsecfooter;
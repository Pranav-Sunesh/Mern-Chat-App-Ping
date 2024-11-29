import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setMessageInput, setNewMessage, sortChats, updateLastMessage, updateTimestamp } from "@/redux/slices/chatSlice";
import { sendMessage } from "@/services/api/chats/sendMessage";
import { typingEvent } from "@/services/socket/socket";
import { useEffect } from "react";

const Chatsecfooter = () => {
  
  const userDetails = useAppSelector(state => state.chat.userDetails);
  const isTyping: boolean = useAppSelector(state => state.chat.isTyping);
  const messageInput: string = useAppSelector(state => state.chat.messageInput);
  // const [typing, setTyping] = useState<boolean>(false);
  const selectedChat = useAppSelector(state => state.chat.selectedChat);
  const dispatch = useAppDispatch();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setMessageInput(''));
    // setTyping(false);
    if(messageInput.length > 0){
      const userName = localStorage.getItem('username');
      const timestamp = new Date().toISOString();
      dispatch(setNewMessage({ senderUserName: userName, content: messageInput, timestamp: timestamp}));
      dispatch(updateTimestamp({ chatId: selectedChat?._id!, timestamp: timestamp }));
      dispatch(sortChats());
      dispatch(updateLastMessage({chatId: selectedChat?._id!, lastMessage: {content: messageInput, sender: localStorage.getItem('username')!}}));
      console.log("Message Length: ", messageInput.length);
      sendMessage( selectedChat?._id!, userDetails?._id!, userName, messageInput, timestamp);
    }
  }

  // useEffect(() => {
  //   console.log(typing);
  //   if(!isTyping){
  //     setTyping(false);
  //   }
  // },[isTyping]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setMessageInput(e.target.value));
    if(e.target.value.length > 0){
      typingEvent({chatId: selectedChat?._id!, isTyping: true, sender: localStorage.getItem('username')!});
      // setTyping(true);
    }else if(e.target.value.length === 0){
      typingEvent({chatId: selectedChat?._id!, isTyping: false, sender: localStorage.getItem('username')!});
      // setTyping(false);
    }
  } 

  useEffect(() => {
    console.log(isTyping);
  }, [isTyping]);


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
                  value={messageInput}
                  onChange={handleChange} />
                <Button 
                  onClick={handleSubmit}
                  type="submit"
                  variant={'default'}>Send</Button>
                
            </form>
    </div>
  );
};

export default Chatsecfooter;
import Profilepic from "@/components/Profilepic";
import { useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import { setMessages, setSelectedChat } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { getMessages } from "@/services/api/chats/getMessages";
import { joinRoom } from "@/services/socket/socket";
import { useEffect } from "react";

interface PropType{
    contacts: string
    lastMessage: string
    userId: string
    messagesIds: string[]
}

const Contacts = ( { contacts , userId, lastMessage }: PropType ) => {

    const dispatch = useAppDispatch();
    
    const selectContact = async() => {
        const chats = await getChats(localStorage.getItem('username'));
        const selectedChats = chats.find((element: any) => element._id === userId);
        const messagesIds = selectedChats.messages;
        const messages = await getMessages(messagesIds);
        console.log(selectedChats);
        dispatch(setMessages(messages));
        dispatch(setSelectedChat(userId));
        joinRoom(selectedChats._id);
    }

  return (
    <div
        onClick={selectContact}
        className="w-full h-20 border flex hover:bg-gray-50 active:bg-gray-100 transition"
        >
            <div
                className="h-full w-1/5 flex justify-center items-center"
                >
                    <Profilepic />  
            </div>
            <div
                id="contact-info"
                className="w-4/5 h-full"
                >
                    <div
                        className="w-full h-1/2 flex items-end"
                        >
                            {contacts}
                        </div>  
                    <div
                        className="h-1/2 flex items-center text-sm"
                        >
                            {lastMessage}
                    </div>
            </div>
        
    </div>
  );
};

export default Contacts;
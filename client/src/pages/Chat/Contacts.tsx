import { ContactType, LastMessageType, ParticipantType } from "@/@types";
import Profilepic from "@/components/Profilepic";
import { useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import { setIsTyping, setMessageInput, setMessages, setSelectedChat, setSelectedChatName } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { getMessages } from "@/services/api/chats/getMessages";

interface PropType{
    contacts: string
    lastMessage: LastMessageType
    userId: string
    profilePicURL: string
}

const Contacts = ( { contacts , userId, lastMessage , profilePicURL }: PropType ) => {

    const dispatch = useAppDispatch();
    const userDetails = useAppSelector(state => state.chat.userDetails);

    const selectContact = async() => {
        dispatch(setMessageInput(''));
        dispatch(setIsTyping(false));
        const chats = await getChats(localStorage.getItem('username'));
        const selectedChats: ContactType = chats.find((element: any) => element._id === userId);
        console.log(selectedChats);
        dispatch(setSelectedChat(selectedChats));
        const messagesIds = selectedChats.messages;
        const messages = await getMessages(messagesIds, [userDetails?._id!, ...selectedChats.participants.map((participant: ParticipantType) => participant.id)]);  //The array conatin all the participants of the chats
        dispatch(setMessages(messages));
        dispatch(setSelectedChatName(contacts));
    }

  return (
    <div
        onClick={selectContact}
        className="w-full h-20 border flex hover:bg-gray-50 active:bg-gray-100 transition"
        >
            <div
                className="h-full w-1/5 flex justify-center items-center"
                >
                    <Profilepic width="10" height="10" profilePicURL={profilePicURL}/>  
            </div>
            <div
                id="contact-info"
                className="w-4/5 h-full"
                >
                    <div
                        className="w-full h-2/3 flex items-end text-lg" 
                        >
                            {contacts}
                        </div>  
                    <div
                        className="h-1/3 flex items-center text-xs"
                        >
                            {lastMessage.sender === localStorage.getItem('username')? "You": lastMessage.sender} {lastMessage.content? ":": ""} {lastMessage.content}
                    </div>
            </div>
        
    </div>
  );
};

export default Contacts;
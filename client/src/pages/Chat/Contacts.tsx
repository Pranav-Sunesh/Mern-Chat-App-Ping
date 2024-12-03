import { ContactType, LastMessageType, ParticipantType } from "@/@types";
import Profilepic from "@/components/Profilepic";
import { useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import { setIsTyping, setMessageInput, setMessages, setSelectedChat, setSelectedChatName } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { getMessages } from "@/services/api/chats/getMessages";
import noPfp from "../../assets/avatar/no pfp.jpg"

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
        dispatch(setSelectedChat(selectedChats));
        const messagesIds = selectedChats.messages;
        const messages = await getMessages(messagesIds, [userDetails?._id!, ...selectedChats.participants.map((participant: ParticipantType) => participant.id)]);  //The array conatin all the participants of the chats
        dispatch(setMessages(messages));
        dispatch(setSelectedChatName(contacts));
    }

  return (
    <div
        onClick={selectContact}
        className="w-full h-20 border flex hover:bg-white/30 active:bg-gray-100 transition"
        >
            <div
                className="h-full w-1/5 flex justify-center items-center"
                >
                    <img
                        className="lg:w-10 lg:h-10 md:w-8 md:h-8 sm:w-8 sm:h-8 rounded-full"
                        src={profilePicURL? profilePicURL : noPfp} alt="" />
            </div>
            <div
                id="contact-info"
                className="w-4/5 h-full"
                >
                    <div
                        className="w-full h-2/3 flex items-end lg:text-lg md:text-sm sm: text-sm" 
                        >
                            {contacts}
                        </div>  
                    <div
                        className="h-1/3 flex items-center text-xs overflow-hidden"
                        >
                            {lastMessage.sender === localStorage.getItem('username')? "You": lastMessage.sender} {lastMessage.content? ":": ""} {lastMessage.content}
                    </div>
            </div>
        
    </div>
  );
};

export default Contacts;
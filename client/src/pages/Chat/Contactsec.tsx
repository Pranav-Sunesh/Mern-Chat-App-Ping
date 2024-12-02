

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setChats, sortChats} from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { useEffect, useState} from "react";
import Contacts from "./Contacts";
import { ContactType } from "@/@types";
import { getChatIdArray } from "@/utils/chats/getChatIdArray";
import { deleteChatListener, joinRoom, receiveRequestResponse } from "@/services/socket/socket";
import AddDropdown from "@/components/AddDropdown";
import Newgroup from "@/components/Newgroup";

const Contactsec = () => {

    const dispatch = useAppDispatch();
    const chats: ContactType[] | [] | null = useAppSelector(state => state.chat.chats);
    const userDetails = useAppSelector(state => state.chat.userDetails);
    const [searchText, setSearchText] = useState<string>('');

    const callback = async() => {
      console.log("request Accepted");
      let chats = await getChats(localStorage.getItem('username'));
      dispatch(setChats(chats));
      dispatch(sortChats());
      const chatIdArray = getChatIdArray(chats);
      joinRoom(chatIdArray);
    }
    
    useEffect(() => {
      const asyncFunction = async() => {
        let chats = await getChats(localStorage.getItem('username'));
        const chatIdArray: string[] = getChatIdArray(chats);
        dispatch(setChats(chats));
        dispatch(sortChats());
        joinRoom(chatIdArray);
        receiveRequestResponse(callback)
        deleteChatListener(async() => {
          const chats = await getChats(localStorage.getItem('username'));
          dispatch(setChats(chats));
          dispatch(sortChats());
        })
      }
      asyncFunction();
    }, []);


    
  return (
    <div 
        className="bg-gradient-to-t from-[#a1c4fd] to-[#c2e9fb] w-1/4 h-[95%] rounded shadow"
        >
            <div
                className="w-full h-[10%] flex justify-center items-center space-x-2"
                >
                    <Input 
                      placeholder="Search" 
                      className="w-[80%] bg-white"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)} />
                    
                    <AddDropdown /> 
                    <Newgroup/>
            </div>

            <div
                className="w-full h-[90%]"
                >
                  {
  Array.isArray(chats) ? (
    chats
      .filter((chat: ContactType) =>
        chat.type === 'personal'
          ? chat.participants[0]?.name
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
          : chat.groupDetails?.groupName
              ?.toLowerCase()
              .includes(searchText.toLowerCase())
      )
      .map((chat: ContactType) => (
        <Contacts
          key={chat._id} // Use a unique key, such as chat._id
          contacts={
            chat.type === 'personal'
              ? chat.participants[0]?.name || 'Unknown'
              : chat.groupDetails?.groupName || 'Unknown Group'
          }
          profilePicURL={
            chat.type === 'personal'
              ? chat.participants[0]?.profilePicURL
              : chat.groupDetails?.profilePicURL
          }
          userId={chat._id}
          lastMessage={chat.lastMessage}
        />
      ))
  ) : (
    <div className="flex justify-center items-center">
      No Contacts
    </div>
  )
}
  
            </div>
            
    </div>
  );
};

export default Contactsec;
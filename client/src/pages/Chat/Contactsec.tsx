

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setChats, sortChats} from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { useEffect, useState} from "react";
import Contacts from "./Contacts";
import { ContactType } from "@/@types";
import { getChatIdArray } from "@/utils/chats/getChatIdArray";
import { joinRoom, receiveRequestResponse } from "@/services/socket/socket";

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
    }
    
    useEffect(() => {
      const asyncFunction = async() => {
        let chats = await getChats(localStorage.getItem('username'));
        const chatIdArray: string[] = getChatIdArray(chats);
        dispatch(setChats(chats));
        dispatch(sortChats());
        joinRoom(chatIdArray);
        joinRoom(userDetails?._id!);
        receiveRequestResponse(callback)
      }
      asyncFunction();
    }, []);


    
  return (
    <div 
        className="bg-white w-1/4 h-[95%] rounded shadow"
        >
            <div
                className="w-full h-[10%] flex justify-center items-center"
                >
                    <Input 
                      placeholder="Search" 
                      className="w-[90%]"
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)} />
            </div>

            <div
                className="w-full h-[90%]"
                >
                  {Array.isArray(chats) && 
                    (
                      chats === null || chats?.filter(chat => chat.participants[0].name.toLowerCase().includes(searchText.toLowerCase())).length === 0?
                      <div className="flex justify-center items-center">
                        No Contacts
                      </div> 
                      :
                      chats?.filter(chat => chat.participants[0].name.toLowerCase().includes(searchText.toLowerCase()))
                        .map((chat: ContactType, index: number) => (
                        <Contacts 
                          key={index} 
                          contacts={chat.type === 'personal'? chat.participants[0].name: "Group chat"} 
                          profilePicURL={chat.participants[0].profilePicURL}
                          userId={chat._id} 
                          lastMessage={chat.lastMessage} />
                      ))
                    )
                  }     
            </div>
            
    </div>
  );
};

export default Contactsec;
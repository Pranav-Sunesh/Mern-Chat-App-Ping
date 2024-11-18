

import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setChats } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { useEffect} from "react";
import Contacts from "./Contacts";
import { ContactType } from "@/@types";

const Contactsec = () => {

    const dispatch = useAppDispatch();
    const chats: ContactType[] | [] | null = useAppSelector(state => state.chat.chats);

    
    useEffect(() => {
      const asyncFunction = async() => {
        const chats = await getChats(localStorage.getItem('username'));
        dispatch(setChats(chats));
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
                    <Input placeholder="Search" className="w-[90%]" />
            </div>

            <div
                className="w-full h-[90%]"
                >
                  {chats && 
                    (
                      chats.length === 0?
                      <div className="flex justify-center items-center">
                        No Contacts
                      </div> 
                      :
                      chats.map((chat: ContactType, index: number) => (
                        <Contacts 
                          key={index} 
                          contacts={chat.type === 'personal'? chat.participants[0]: "Group chat"} 
                          userId={chat._id} 
                          messagesIds={chat.messages}
                          lastMessage={chat.lastMesssage} />
                      ))
                    )
                  }     
            </div>
            
    </div>
  );
};

export default Contactsec;
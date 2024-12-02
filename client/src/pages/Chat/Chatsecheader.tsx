import { ContactType, ParticipantType } from "@/@types";
import Profilepic from "@/components/Profilepic";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setChats, setIsTyping, setMessages } from "@/redux/slices/chatSlice";
import { typingListener } from "@/services/socket/socket";
import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { removeParticipant } from "@/services/api/chats/removeParticiant";
import { toast } from "@/hooks/use-toast";
import { getChats } from "@/services/api/chats/getChats";
import { removeChats } from "@/services/api/chats/removeChats";


const Chatsecheader = () => {

  const selectedChat: ContactType | null = useAppSelector(state => state.chat.selectedChat);
  const selectedChatName: string = useAppSelector(state => state.chat.selectedChatName);
  const isTyping = useAppSelector(state => state.chat.isTyping);
  const selectedChatRef = useRef('');
  const dispatch = useAppDispatch();
  const [popModal, setPopModal] = useState<boolean>(false)
  const [removedParticipants, setRemovedParticipants] = useState<string[]>([]);

  const [senderName, setSenderName] = useState<string>('');
  useEffect(() => {

    const callback = ({chatId, isTyping, sender}: {chatId: string, isTyping: boolean, sender: string}) => {
      if(selectedChatRef.current === chatId && isTyping){
        dispatch(setIsTyping(isTyping));
        setSenderName(sender)
      }
      if(!isTyping){
        dispatch(setIsTyping(isTyping));
        setSenderName('');
      }
    }
    typingListener(callback);
  },[]);

  useEffect(() => {
    selectedChatRef.current = selectedChat?._id!;
    console.log("selectedChat: ", selectedChat);
  }, [selectedChat?._id]);

  const deleteGroup = async() => {
    const response = await removeChats(selectedChat?._id!);
    toast({
      title: response.data,
      variant: response.variant
    })
    const chats = await getChats(localStorage.getItem('username'));
    dispatch(setChats(chats));
    setPopModal(false);
    dispatch(setMessages(null));
    
  }

  

  return (
    <div
      className="w-full h-[15%] bg-gradient-to-r from-[#cfd9df] to-[#e2ebf0] rounded-t-md flex items-center"
      >
        <Dialog
          open={popModal} onOpenChange={isOpen => setPopModal(isOpen)}>
          <DialogTrigger>
            <div
            className="flex items-center space-x-5 ml-5 cursor-pointer"
            >
              <Profilepic width='12' height="12" profilePicURL={selectedChat?.type === 'personal'?selectedChat?.participants[0].profilePicURL!: selectedChat?.groupDetails.profilePicURL!}/>
              <div className="flex items-center space-x-2">
                <div
                  className="text-lg text-gray-800">
                    {selectedChatName}
                </div>
                
                {isTyping && <div
                  className="text-slate-600 text-sm animate-pulse">
                  { selectedChat?.type === 'group' &&  senderName} is Typing....
                </div>}
              </div>
          </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle
                className="text-2xl">
                  {selectedChat?.type === 'personal'? selectedChat.participants[0].name : selectedChat?.groupDetails.groupName}
                </DialogTitle>
              <DialogDescription
                className="space-y-5">
                <pre>
                  {selectedChat?.type === 'personal'? selectedChat?.participants[0].bio: selectedChat?.groupDetails.bio}
                </pre>
                {
                  selectedChat?.type === 'group' && 
                  <div
                    className="w-96 max-h-96 overflow-y-auto space-y-2 .adjusted-scrollbar">
                      <label 
                        className="text-black text-lg">Participants:</label>
                      {selectedChat.participants
                        .filter(participant => !removedParticipants.includes(participant.name))
                        .map((participant: ParticipantType, index: number) => (
                        <div
                          key={index}
                          className="w-2/3 border rounded p-1 text-base text-black flex items-center justify-around group"
                          >
                            <label htmlFor="">{participant.name}</label>
                            {selectedChat.groupDetails.isAdmin &&
                            <Button
                              onClick={async() => {
                                const response = await removeParticipant(selectedChat._id, participant.name);
                                toast({
                                  title: response.variant === 'default'? "Participant Removed" : response.data,
                                  variant: response.variant
                                })
                                setRemovedParticipants(prev => [...prev, participant.name]);
                              }}
                              className="w-10 opacity-0 group-hover:opacity-100"
                              variant={'destructive'}>
                              <i className="fa-solid fa-trash"></i>
                            </Button>}
                        </div>
                      ))}
                      {
                        selectedChat.groupDetails.isAdmin &&
                        <div>
                          <Button
                            onClick={deleteGroup} 
                            variant={'destructive'}>
                            Delete Group
                          </Button>
                        </div>
                      }
                  </div>
                }
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        
    </div>
  );
};

export default Chatsecheader;
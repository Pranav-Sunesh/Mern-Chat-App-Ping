import { ContactType } from "@/@types";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { useAppDispatch } from "@/hooks/reduxHooks";
import { useToast } from "@/hooks/use-toast";
import { setChats } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { removeChats } from "@/services/api/chats/removeChats";
import { removeParticipant } from "@/services/api/chats/removeParticiant";
import { useState } from "react";



const Chatusers = ( { chat }: {chat: ContactType | undefined}) => {

    const [popModal, setPopModal] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { toast } = useToast();
    const removeChat = async() => {
        const response = await removeChats(chat?._id!); 
        const chats: ContactType[] | [] | null = await getChats(localStorage.getItem('username'));
        console.log(chats);
        dispatch(setChats(chats));
        toast({
            title: response.data,
            variant: response.variant
        })
    }

    const leaveGroup = async() => {
        const response = await removeParticipant(chat?._id!, localStorage.getItem('username')!);
        toast({
            title: response.data,
            variant: response.variant
        });
        setPopModal(false); 
    }


  return (
    <div
        className="w-full h-14 bg-white rounded border border-black flex items-center justify-around group">
            <p>{chat?.type === 'personal'?chat?.participants[0].name: chat?.groupDetails.groupName}</p>
            <Dialog open={popModal} onOpenChange={open => setPopModal(open)}>
            <DialogTrigger
                className="opacity-0 group-hover:opacity-100 hover:bg-gray-200 active:bg-gray-300 transition duration-300 border border-black rounded-sm w-8 h-8">
                            <i className="fa-solid fa-trash text-sm"></i>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>
                {chat?.type === 'personal' || chat?.groupDetails.isAdmin? "Delete Chat?": "Leave Group"}
                </DialogTitle>
                <DialogDescription>
                    {chat?.type === 'personal' || chat?.groupDetails.isAdmin? "Are you sure you what to delete this chat": "Are you sure you want to leave the group"}
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={chat?.type === 'personal' || chat?.groupDetails.isAdmin?removeChat: leaveGroup}
                        >Confirm</Button>
                        <Button 
                        onClick={() => setPopModal(false)}
                        variant={'outline'}>Cancel</Button>
                </DialogFooter>
            </DialogContent>
            </Dialog>
            
    </div>
  );
};

export default Chatusers;
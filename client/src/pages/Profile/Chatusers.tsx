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
import { useState } from "react";



const Chatusers = ( { chat }: {chat: ContactType | undefined}) => {

    const [popModal, setPopModal] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { toast } = useToast();
    const removeChat = async() => {
        const response = await removeChats(chat?._id!); 
        const chats: ContactType[] | [] | null = await getChats(localStorage.getItem('username'));
        dispatch(setChats(chat));
        toast({
            title: response.data,
            variant: response.variant
        })
    }


  return (
    <div
        className="w-full h-14 bg-white rounded border border-black flex items-center justify-around group">
            <p>{chat?.participants[0].name}</p>
            <Dialog open={popModal} onOpenChange={open => setPopModal(open)}>
            <DialogTrigger
                className="opacity-0 group-hover:opacity-100 transition duration-300 border border-black rounded w-8 h-8">
                            <i className="fa-solid fa-trash "></i>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Delete Chat?</DialogTitle>
                <DialogDescription>
                    Are you sure you what to delete this chat
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={removeChat}
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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { popAddModal } from "@/redux/slices/chatSlice";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { sendRequest } from "@/services/api/chats/sendRequest";
import { DialogDescription } from "@radix-ui/react-dialog";
import { sendRequestReturnType } from "@/@types";
  


const Addmodal = () => {

    const addModal = useAppSelector(state => state.chat.addModal);
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const [username, setUsername] = useState<string>('');

    const handleSubmit = async(e: React.FormEvent): Promise<void> => {
        setUsername('');
        e.preventDefault();
        dispatch(popAddModal(false));
        if(username !== localStorage.getItem('username')){
            const response: sendRequestReturnType = await sendRequest(username);
            console.log("working");
            toast({
                title: response.data,
                variant: response.type,
                duration: 1500
            });
        }
    }

  return (
    
    <Dialog open={addModal} onOpenChange={(isOpen) => dispatch(popAddModal(isOpen))}>
        
    <DialogContent>
        <DialogHeader>
        <DialogTitle>Username</DialogTitle>
        <DialogDescription></DialogDescription>
            <form onSubmit={handleSubmit}>
            <div
                className="space-y-2 mt-2">
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
                <div
                    className="flex justify-end">
                    <Button
                        >
                        Send
                    </Button>
                </div>
            </div>
            </form>

        </DialogHeader>
        
    </DialogContent>
    </Dialog>
    
  );
};

export default Addmodal;
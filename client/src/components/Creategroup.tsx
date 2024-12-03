import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ContactType } from "@/@types";
import NewgroupParicipants from "./NewgroupParicipants";
import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { createGroup } from "@/services/api/chats/createGroup";
import { useToast } from "@/hooks/use-toast";
import { setChats, setGroupModal, sortChats } from "@/redux/slices/chatSlice";
import { getChats } from "@/services/api/chats/getChats";
import { joinRoom, receiveRequest } from "@/services/socket/socket";

const Creategroup = ({img}: {img: File | null}) => {

    const chats = useAppSelector(state => state.chat.chats);
    const groupParticipants = useAppSelector(state => state.chat.groupParticipants);
    const { toast } = useToast();
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const [groupName, setGroupName] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    useEffect(() => {
        console.log(groupParticipants);
    }, [groupParticipants]);

    const handleSubmit = async() => {
        if(groupName.length === 0){
            toast({
                title: "Enter Group Name",
                variant: "destructive"
            })
        }else if(groupParticipants.length === 0){
            toast({
                title: 'Select atleast one participant', 
                variant: "destructive"
            })
        }else{
            setLoading(true)
            const response = await createGroup(img, groupParticipants, groupName, description);
            dispatch(setGroupModal(false));
            toast({
                title: response.data,
                variant: response.variant
            })
            joinRoom(response.chatId);
            const chats = await getChats(localStorage.getItem('username')!);
            dispatch(setChats(chats));
            setLoading(false);
            dispatch(sortChats());
            receiveRequest(groupParticipants);
        }
        
    }

  return (
    <div>
        <div
            className="space-y-1">
            <Label>Group Name</Label>
            <Input 
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Name"
                className="text-black"/>
        </div>
        <div
            className="mt-5 space-y-1">
            <Label>Description</Label>
            <Textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Name"
                className="text-black"/>
        </div>
        <div
            className="mt-5 space-y-1">
            <Label>Add Participants</Label>
            <div
                id=""
                className="w-72 max-h-96 overflow-y-auto">
                    {chats === null ||chats?.length === 0? "No Contacts": 
                    (chats?.map((chat: ContactType | undefined, index: number) => ( // PENDING: Filtering of chats by participants
                        <NewgroupParicipants key={index} chat={chat}/>                          // and Searchtext
                    )))}
            </div>
        </div>
        <div
            className="mt-5 flex justify-end">
            <Button
                disabled={loading}
                onClick={handleSubmit}>Create</Button>
        </div>
    </div>
  );
};

export default Creategroup;
import { ContactType } from "@/@types";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { addGroupParticipants, removeGroupParticipants } from "@/redux/slices/chatSlice";
import { useState } from "react";

interface PropType{
    chat: ContactType | undefined
}

const NewgroupParicipants = ( {chat}: PropType ) => {

    const [isSelected, setIsSelected] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const selectParticipants = async() => {
        setIsSelected(!isSelected);
        console.log("isSelected: ",isSelected);
        if(!isSelected){
            dispatch(addGroupParticipants(chat?.participants[0].id!));
        }else{
            dispatch(removeGroupParticipants(chat?.participants[0].id!))
        }
    }

  return (
    <div
        onClick={selectParticipants}
        className={`border text-black text-lg p-1 rounded ${isSelected? "bg-gray-300": "bg-white hover:bg-gray-50"}`}>
            {chat?.participants[0].name}
    </div>
  );
};

export default NewgroupParicipants;
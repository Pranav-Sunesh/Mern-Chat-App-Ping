import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setGroupModal } from "@/redux/slices/chatSlice";
import Creategroup from "./Creategroup";
import Profilepic from "./Profilepic";
import { useRef, useState } from "react";
  


const Newgroup = () => {

    const addNewGroupModal = useAppSelector(state => state.chat.addNewGroupModal);
    const fileInputRef = useRef<null | HTMLInputElement>(null);
    const [img, setImg] = useState<File | null>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const dispatch = useAppDispatch();

    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0];
        if(img){
            setImg(img);
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result as string);
            }
            reader.readAsDataURL(img);
        }
    }

  return (
    <Dialog
        open={addNewGroupModal} onOpenChange={(isOpen) => dispatch(setGroupModal(isOpen))}>
    <DialogContent>
        <DialogHeader>
        <DialogTitle>New Group</DialogTitle>
        <DialogDescription>
            <div
                className="w-28 h-28 ">
                    <div
                        className="w-28 h-28 rounded-full z-10 opacity-0 hover:opacity-100 flex justify-center items-center bg-black/50 absolute">
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="w-10 h-10 rounded bg-blue-400">
                            <i className="fa-solid fa-pen text-white"></i>
                        </button>
                        <input 
                            ref={fileInputRef}
                            onChange={setImage}
                            type="file" 
                            className="hidden"/>
                    </div>
                    <Profilepic profilePicURL={imgSrc? imgSrc: ''} width="full" height="full"/>
                    
            </div>
            <Creategroup img={img} />
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>

  );
};

export default Newgroup;
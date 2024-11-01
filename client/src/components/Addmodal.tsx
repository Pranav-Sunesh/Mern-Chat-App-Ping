import { useAppDispatch, useAppSelector} from "@/hooks/reduxHooks";
import { useToast } from "@/hooks/use-toast";
import { popAddModal } from "@/redux/slices/chatSlice";
import { sendRequest } from "@/services/api/chats/sendRequest";
import { useState } from "react";

const Modal = () => {

    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const [username, setUsername] = useState<string>('');
    const addModal = useAppSelector(state => state.chat.addModal);

    const handleSubmit = (e: React.FormEvent) => {
        sendRequest(e, dispatch, toast, username);
    }

  return (
    <div
        onClick={() => dispatch(popAddModal(false))}
        className="w-screen h-screen absolute left-0 top-0 bg-black/50 flex justify-center items-center transition">
            <div
                onClick={(e) => e.stopPropagation()}
                id="modal-box"
                className={`bg-white w-1/3 h-1/5 rounded ${addModal? "scale-100": "scale-50"} transition duration-500`}
                >
                    <div 
                        className="w-full h-1/3 flex items-end justify-center">
                            <div
                                className="w-5/6">
                                    Enter Username
                            </div>
                    </div>
                    <form onSubmit={handleSubmit}
                    className="w-full h-2/3">
                    <div 
                        className="w-full h-1/2 flex items-center justify-center ">
                            <div
                                className="w-5/6">
                                    <input type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full p-1 border border-black rounded focus:outline-none"
                                        placeholder="Username" />
                            </div>
                    </div>
                    <div 
                        className="w-full h-1/2 flex items-start justify-center">
                            <div
                                className="w-5/6 flex justify-end">
                                    <button
                                        className="p-2 bg-black text-white rounded"
                                        >Send</button>
                            </div>
                    </div>
                    </form>
                    
                    
            </div>
    </div>
  );
};

export default Modal;
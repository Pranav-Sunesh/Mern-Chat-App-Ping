import { useAppSelector } from "@/hooks/reduxHooks";
import Chatsecbody from "./Chatsecbody";
import Chatsecfooter from "./Chatsecfooter";
import Chatsecheader from "./Chatsecheader";
import { useEffect } from "react";

const Chatsec = () => {

  const messages: string[] | [] | null= useAppSelector(state => state.chat.messages);
  
  return (
    <div
        className=" w-2/3 h-[95%] rounded-md shadow bg-slate-100"
        >
          {
            messages === null? 
            <div className="flex h-full justify-center items-center">Start Chatting...</div>
            : 
            (
              <>
                <Chatsecheader />
                <Chatsecbody />
                <Chatsecfooter />
              </>
            )
          }
          
    </div>
  );
};

export default Chatsec;
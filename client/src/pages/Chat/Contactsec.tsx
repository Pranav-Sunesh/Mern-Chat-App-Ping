
import Profilepic from "@/components/Profilepic";
import { Input } from "@/components/ui/input";

const Contactsec = () => {
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
                    <div
                        className="w-full h-20 border flex"
                        >
                            <div
                                className="h-full w-1/5 flex justify-center items-center"
                                >
                                    <Profilepic />  
                            </div>
                            <div
                                id="contact-info"
                                className="w-4/5 h-full"
                                >
                                    <div
                                        className="w-full h-1/2 flex items-end"
                                        >
                                            Pranav Sunesh
                                        </div>  
                                    <div
                                        className="h-1/2 flex items-center text-sm"
                                        >
                                            You: Msg
                                    </div>
                            </div>
                            
  
                    </div>
            </div>
    </div>
  );
};

export default Contactsec;
import Profilepic from "@/components/Profilepic";

interface PropType{
    key: number,
    contacts: string
}

const Contacts = ( { contacts }: PropType ) => {
  return (
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
                            {contacts}
                        </div>  
                    <div
                        className="h-1/2 flex items-center text-sm"
                        >
                            You: Msg
                    </div>
            </div>
        
    </div>
  );
};

export default Contacts;
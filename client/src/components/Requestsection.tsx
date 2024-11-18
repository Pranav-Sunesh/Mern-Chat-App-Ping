import { ContactType, RequestSectionType } from "@/@types";
import { Button } from "./ui/button";
import { acceptRequest } from "@/services/api/chats/acceptRequest";
import { getRequest } from "@/services/api/chats/getRequest";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setChats, setRequests } from "@/redux/slices/chatSlice";
import { useToast } from "@/hooks/use-toast";
import { getChats } from "@/services/api/chats/getChats";

const Requestsection = ({ requesterName }: RequestSectionType) => {

    const dispatch = useAppDispatch()
    const { toast } = useToast();

    const acceptButtonClick = async() => {
        const username = localStorage.getItem('username');
        await acceptRequest(username, requesterName, toast);
        const requests: string[] | [] = await getRequest(username);
        const chats: ContactType[] | [] = await getChats(username);
        dispatch(setRequests(requests));
        dispatch(setChats(chats));
    }

  return (
    <div
      className="border flex justify-between items-center p-2 rounded">
      <p>{requesterName}</p>
      <div id="button-container" className="space-x-2">
          <Button 
            onClick={acceptButtonClick}
            variant={'outline'}>
              T
          </Button>
          <Button 
            variant={'destructive'}
            >
              X
          </Button>
      </div>
    </div>
  );
};

export default Requestsection;
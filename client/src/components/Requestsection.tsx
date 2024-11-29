import { ContactType, RequestSectionType} from "@/@types";
import { Button } from "./ui/button";
import { acceptRequest } from "@/services/api/chats/acceptRequest";
import { getRequest } from "@/services/api/chats/getRequest";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { setChats, setRequests } from "@/redux/slices/chatSlice";
import { useToast } from "@/hooks/use-toast";
import { getChats } from "@/services/api/chats/getChats";
import { deleteRequest } from "@/services/api/chats/deleteRequest";
import { receiveRequest } from "@/services/socket/socket";


const Requestsection = ({ requester }: {requester: RequestSectionType}) => {

    const dispatch = useAppDispatch()
    const { toast } = useToast();

    const acceptButtonClick = async() => {
        const username = localStorage.getItem('username');
        await acceptRequest(username, requester.username, toast);
        const requests: RequestSectionType[] | [] = await getRequest(username);
        const chats: ContactType[] | [] = await getChats(username);
        dispatch(setRequests(requests));
        dispatch(setChats(chats));
        receiveRequest(requester._id);
    }
    const rejectButtonClick = async() => {
      const username = localStorage.getItem('username')!;
      await deleteRequest(username, requester.username, toast);
      const request: RequestSectionType[] | []= await getRequest(username);
      dispatch(setRequests(request));
    }

  return (
    <div
      className="border flex justify-between items-center p-2 rounded">
      <p>{requester.username}</p>
      <div id="button-container" className="space-x-2">
          <Button 
            onClick={acceptButtonClick}
            variant={'outline'}
            className="w-9 h-9"  
              >
              <i className="fa-solid fa-check"></i>
          </Button>
          <Button 
            onClick={rejectButtonClick}
            variant={'destructive'}
            >
              <i className="fa-solid fa-trash"></i>
          </Button>
      </div>
    </div>
  );
};

export default Requestsection;
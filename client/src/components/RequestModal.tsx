import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { popRequestModal } from "@/redux/slices/chatSlice";
import Requestsection from "./Requestsection";
  

const RequestModal = () => {
    
    const requestModal: boolean = useAppSelector(state => state.chat.requestModal);
    const requests: string[] | [] = useAppSelector(state => state.chat.requests);
    const dispatch = useAppDispatch();
    

  return (
    <Dialog open={requestModal} onOpenChange={(isOpen) => dispatch(popRequestModal(isOpen))}>
    <DialogContent >
        <DialogHeader>
        <DialogTitle>
            Requests
        </DialogTitle>
        <div
          id="request-dialog" className="max-h-80 overflow-y-scroll space-y-2"
          >
          {requests.length === 0? 
            <div className="flex justify-center items-center"> No requests</div>
            :
            requests.map((request, index) => (
              <Requestsection key={index} requesterName={request} />
          ))
          }
        </div>
        
        <DialogDescription>
        </DialogDescription>
        </DialogHeader>
    </DialogContent>
    </Dialog>
  );
};

export default RequestModal;
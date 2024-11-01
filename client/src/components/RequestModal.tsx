import { useAppDispatch } from "@/hooks/reduxHooks";
import { popRequestModal } from "@/redux/slices/chatSlice";

const RequestModal = () => {

    const dispatch = useAppDispatch();

  return (
    <div
        className="w-screen h-screen absolute left-0 top-0 bg-black/50 flex justify-center items-center"
        onClick={() => dispatch(popRequestModal(false))}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-1/3 h-1/2 bg-white"
                >
                    
            </div>
    </div>
  );
};

export default RequestModal;
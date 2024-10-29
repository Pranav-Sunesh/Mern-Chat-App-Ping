import Chatsecbody from "./Chatsecbody";
import Chatsecfooter from "./Chatsecfooter";
import Chatsecheader from "./Chatsecheader";

const Chatsec = () => {
  return (
    <div
        className=" w-2/3 h-[95%] rounded-md shadow bg-white"
        >
          <Chatsecheader />
          <Chatsecbody />
          <Chatsecfooter />
    </div>
  );
};

export default Chatsec;
import pfp from "../assets/avatar/no pfp.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Profilepic = () => {
  return (
    <div>
        <Avatar>
            <AvatarImage src={pfp} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    </div>
  );
};

export default Profilepic;
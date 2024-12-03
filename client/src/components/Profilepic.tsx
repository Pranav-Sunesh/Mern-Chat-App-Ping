import pfp from "../assets/avatar/no pfp.jpg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfilePicType{
  profilePicURL: string
  width: string
  height: string
}

const Profilepic = ( { profilePicURL , width, height }: ProfilePicType ) => {
  return (
        <Avatar
          className={`w-${width} h-${height} `}> 
            <AvatarImage src={profilePicURL? profilePicURL: pfp} />
            <AvatarFallback>pfp</AvatarFallback>
        </Avatar>
  );
};

export default Profilepic;
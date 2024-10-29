import Chatsec from "./Chatsec";
import Contactsec from "./Contactsec";

const Hero = () => {
  return (
    <div 
        className="w-full h-[85%] flex justify-around"
        >
            <Contactsec />
            <Chatsec />
    </div>
  );
};

export default Hero;
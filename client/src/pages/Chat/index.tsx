import { Toaster } from "@/components/ui/toaster";
import Hero from "./Hero";
import Navbar from "./Navbar";

const Chat = () => {
  return (
    <div
      className="w-screen h-screen bg-gradient-to-br from-green-50 to-green-200"
      >
        <Navbar />
        <Hero />
        <Toaster />
    </div>
  );
};

export default Chat;
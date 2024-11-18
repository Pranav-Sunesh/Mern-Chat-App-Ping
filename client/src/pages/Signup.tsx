import CardForm from "@/components/CardForm";
import { Toaster } from "@/components/ui/toaster";

const Signup = () => {

  return (
    <div
        id="signup"
        className="w-screen h-screen flex justify-center items-center"
        >
            <CardForm formType="signup"/>
            <Toaster />
    </div>
  );
};

export default Signup;
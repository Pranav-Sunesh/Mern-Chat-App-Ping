import CardForm from "@/components/CardForm";
import { Toaster } from "@/components/ui/toaster";


const Login = () => {

  

  return (
    <div
        id="login"
        className="w-screen h-screen flex justify-center items-center"
        >
            <div
                className="w-screen h-screen flex justify-center items-center"
                >
                    <CardForm formType="login"/>
            </div>
            <Toaster />
    </div>
  );
};

export default Login;
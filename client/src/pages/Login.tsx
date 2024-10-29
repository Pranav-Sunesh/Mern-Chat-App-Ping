import CardForm from "@/components/CardForm";


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
            
    </div>
  );
};

export default Login;
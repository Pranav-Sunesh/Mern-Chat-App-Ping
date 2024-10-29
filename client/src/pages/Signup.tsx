import CardForm from "@/components/CardForm";

const Signup = () => {

  return (
    <div
        id="signup"
        className="w-screen h-screen flex justify-center items-center"
        >
            <CardForm formType="signup"/>
    </div>
  );
};

export default Signup;
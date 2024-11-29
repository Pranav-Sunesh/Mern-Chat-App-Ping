import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import PasswordInput from "./ui/PasswordInput";
import { Button } from "./ui/button";

import {  NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { setConfirmPassword, setEmail, setFirstName, setLastName, setPassword, setUser } from "@/redux/slices/authSlice";

import { loginCall } from "@/services/api/auth/login";
import { CardProps , StatesType } from "@/@types";
import { signupCall } from "@/services/api/auth/signupCall";

import { useCookies } from "react-cookie";
import { useToast } from "@/hooks/use-toast";
import { setUserDetails } from "@/redux/slices/chatSlice";


const CardForm = ({ formType }: CardProps) => {

  //Redux States

  const user = useAppSelector(state => state.auth.user);
  const password = useAppSelector(state => state.auth.password);
  const confirmPassword = useAppSelector(state => state.auth.confirmPassword);
  const firstName = useAppSelector(state => state.auth.firstName);
  const lastName = useAppSelector(state => state.auth.lastName);
  const email = useAppSelector(state => state.auth.email);


  //Cookie

  const [_cookie, setCookie, _removeCookie] = useCookies(['token']);

  //Dispatch

  const dispatch = useAppDispatch();

  //Handle Submit

  const navigate = useNavigate();
  const { toast } = useToast()
  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const states: StatesType = {
        user: user,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        firstName: firstName,
        lastName: lastName,
    }
    if(formType === "signup"){
        const response: any = await signupCall(states, toast);
        const token = response?.token;
        if(token){
            setCookie('token', token, {
                secure: true, 
                sameSite: 'none'
            });
            navigate('/protected/profile/edit');
        }else{
            console.log(response.error);
        }
        
    }else{
        const response:any = await loginCall(states, toast);
        const token = response.token;
        if(token){
            setCookie('token', token,{
                secure: true,
                sameSite: "none"
            });
            navigate('/protected/chat');
        }else{
            console.log(response.error);
        }
        
    }
  }

  return (
    <Card className={`w-[${formType === "signup"?"400": "350"}px]`}>
        <CardHeader>
            <CardTitle className="text-2xl">{formType === 'login' && "Login"} {formType === 'signup' && "SignUp"}</CardTitle>
            <CardDescription></CardDescription>
        </CardHeader>
        <form action="">
        <CardContent>
            
                <div className="grid w-full items-center gap-4">
                    {
                        formType === 'signup' &&
                        (<div className="flex space-x-1.5">
                            <div className="w-1/2">
                                <Label htmlFor="name">First Name</Label>
                                <Input 
                                    id="name" 
                                    value={firstName}
                                    onChange={(e) => dispatch(setFirstName(e.target.value))}
                                    placeholder="First Name" />
                            </div>
                            <div className="w-1/2">
                                <Label htmlFor="name">Last Name</Label>
                                <Input 
                                    id="name"
                                    value={lastName}
                                    onChange={(e) => dispatch(setLastName(e.target.value))} 
                                    placeholder="Last Name" />
                            </div>
                        </div>)
                    }
                    
                        {
                            formType === 'signup' && 
                            (
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Email</Label>
                                <Input 
                                    id="name" 
                                    value={email}
                                    onChange={(e => dispatch(setEmail(e.target.value)))}
                                    type="email" 
                                    placeholder="Email" />
                            </div>
                            )
                            }
                    
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Username</Label>
                        <Input 
                            id="name" 
                            value={user}
                            onChange={(e) => dispatch(setUser(e.target.value))}
                            placeholder="Username" />
                    </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <PasswordInput 
                        id="Password"
                        value={password}
                        onChange={(e) => dispatch(setPassword(e.target.value))}/>
                    
                </div>
                {   formType === "signup" &&
                    (
                        <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="framework">Confirm Password</Label>
                        <PasswordInput 
                            id="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                            />
                    
                        </div>
                    )
                }
                </div>
            
        </CardContent>
        <CardFooter className="flex justify-between">
            
            <NavLink to={formType === 'signup'? "/login" : "/signup"}>
            <Button 
                type="button"
                variant={'link'}>{formType === 'signup'?"Login": "Signup"}</Button>
            </NavLink>
            <Button 
                type="submit"
                variant={'outline'}
                onClick={handleSubmit}>{formType === 'signup'?"Signup": "Login"}</Button>

        </CardFooter>
        </form>
    </Card>

  );
};

export default CardForm;
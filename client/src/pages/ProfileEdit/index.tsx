import { Input } from '@/components/ui/input';
import img from '../../assets/avatar/no pfp.jpg'
import { Label } from '@radix-ui/react-dropdown-menu';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useEffect, useRef, useState } from 'react';
import { getUser } from '@/services/api/chats/getUser';
import { setUserDetails } from '@/redux/slices/chatSlice';
import { updateProfile } from '@/services/api/chats/updateProfile';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Profilepic from '@/components/Profilepic';
import { deleteProfilePicture } from '@/services/api/chats/deleteProfilePicture';

const ProfileEdit = () => {

    const dispatch = useAppDispatch();
    const userDetails = useAppSelector(state => state.chat.userDetails);
    const inputFileRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { toast } = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        getUser(localStorage.getItem('username'))
            .then((value) => dispatch(setUserDetails(value)));
    },[]);

    useEffect(() => {
        setBio(userDetails?.bio!);
    }, [userDetails?.bio]);
    
    const [userName, setUserName] = useState<string>(localStorage.getItem('username')!);
    const [imgSrc, setImgSrc] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [bio, setBio] = useState<string>('');

    const addImage = () => {
        inputFileRef?.current?.click();
    }
    const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const img = e.target.files?.[0];
        if(img){    
            setImageFile(img);
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result as string);
            }
            reader.readAsDataURL(img);
        }
    }

    const handleSubmit = async() => {
        if(userName.length < 8){
            toast({
                title: "Username should be atleat 8 characters long",
                variant: 'destructive',
                duration: 2500
            })
        }else if(userName.length > 12){
            toast({
                title: "Username should be atmost 12 characters long",
                variant: 'destructive',
                duration: 2500
            })
        }else{
            setLoading(true);
            const response = await updateProfile(userDetails?._id!,imageFile!, userName === localStorage.getItem('username')!?"": userName, bio);
            toast({
                title: response.data,
                variant: response.variant
            })
            if(response.userName !== null){
                localStorage.setItem('username', response.userName);
            }
            setLoading(false);
            navigate('/protected/chat');
        }
    }

    const removeProfilePic = async() => {
        const response = await deleteProfilePicture(userDetails?._id!);
        toast({
            title: response.data,
            variant: response.variant
        });
        const userInfo = await getUser(localStorage.getItem('username'));
        dispatch(setUserDetails(userInfo));
    }

  return (
    <div 
        className="w-screen h-screen flex justify-center bg-gradient-to-br from-[#C6B38E] to-[#9A9B73] ">
            <div
                className="w-1/2 space-y-10 mt-20"
                >
                    <div>
                        <p
                            className='text-3xl text-[#424B54]'>
                                Edit Profile
                            </p>
                    </div>
                    <div
                        className='space-y-3'>
                        <div
                            className='flex items-center space-x-3'
                            >
                            <div
                                className='w-[150px] h-[150px] rounded-[50%] '>
                                <div 
                                    className='w-[150px] h-[150px] rounded-[50%] bg-black/50 absolute z-10 flex justify-center items-center space-x-2 transition opacity-0 hover:opacity-100'
                                    >
                                    <button
                                        onClick={addImage}
                                        className='w-10 h-10 bg-blue-400 rounded text-white hover:bg-blue-500 active:bg-blue-300'>
                                            <i className="fa-solid fa-pen"></i>
                                    </button>
                                    {userDetails?.profilePicURL && <button
                                        onClick={removeProfilePic}
                                        className='w-10 h-10 bg-red-400 rounded text-white hover:bg-red-500 active:bg-red-300'>
                                            <i className="fa-solid fa-trash"></i>
                                    </button>}
                                    <input 
                                        onChange={setImage}
                                        ref={inputFileRef}
                                        type="file"
                                        name='image'
                                        className='hidden' />
                                </div>
                                <Profilepic 
                                    profilePicURL={imgSrc? imgSrc : (userDetails?.profilePicURL? userDetails.profilePicURL : img )}
                                    width='[150px]'
                                    height='[150px]'
                                    />
                            </div>
                            
                            <Input
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder='Username'
                                className='w-1/3 bg-white'/>
                        </div>
                        <div
                            className='space-y-3'>
                            <Label>
                                Bio:
                            </Label>
                            <Textarea 
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className='h-32 bg-white'
                                    placeholder='Tell about yourself'/>
                            <div
                                className='w-full h-full flex justify-end space-x-5'>
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={loading? true: false}
                                        >
                                            Continue
                                    </Button>
                                    <Button
                                        onClick={() => navigate('/protected/chat', {replace: true})}
                                        disabled={loading? true: false}
                                        variant={'outline'}>
                                            Cancel
                                    </Button>
                            </div>
                        </div>
                    </div>
            </div>
    </div>
  );
};

export default ProfileEdit;
import Profilepic from "@/components/Profilepic";
import Chatusers from "./Chatusers";
import { useEffect } from "react";
import { getUser } from "@/services/api/chats/getUser";
import { setChats, setUserDetails } from "@/redux/slices/chatSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import { getChats } from "@/services/api/chats/getChats";
import { ContactType } from "@/@types";

const Profile = () => {

  const userDetails = useAppSelector(state => state.chat.userDetails);
  const chats: ContactType[] | [] | null = useAppSelector(state => state.chat.chats);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getUser(localStorage.getItem('username'))
      .then(value => dispatch(setUserDetails(value)));
    getChats(localStorage.getItem('username'))
      .then(value => dispatch(setChats(value)));
  }, []);

  const ProfileEdit = () => {
    navigate('/protected/profile/edit')
  }

  return (
    <div
      className="w-screen h-screen overflow-hidden bg-gradient-to-br from-[#C6B38E] to-[#9A9B73]">
    <div
      className="w-screen">
        <div
          className=" w-full mt-28 flex"
          >
            <div  
              className="w-full h-full flex justify-center items-center  space-x-10"
              >
                <div
                  className="w-32 h-32 rounded-[50%]">
                    <div
                      className="absolute transition duration-200 w-32 h-32 bg-black/50 rounded-[50%] flex justify-center items-center z-10 opacity-0 hover:opacity-100"
                      >
                      <button
                        onClick={ProfileEdit}
                        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white w-10 h-10 rounded transition">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                    </div>
                  <Profilepic profilePicURL={userDetails?.profilePicURL!} width="32" height="32"/>
                </div>
                
                <div
                  className="flex space-x-1 group">
                  <p
                    className="text-3xl text-[#454851]">{userDetails?.userName}</p>
                    <button
                        onClick={ProfileEdit}
                        className="bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white w-10 h-10 rounded transition opacity-0 group-hover:opacity-100">
                          <i className="fa-solid fa-pen"></i>
                        </button>
                </div>
              </div>
        </div>
        <div
          className="flex justify-center mt-5"
          >
            <div 
              className="w-1/5 flex group space-x-3"
              >
              <pre
                className={`${userDetails?.bio.trim().length === 0? "text-gray-700": "text-black"}`}>{userDetails?.bio.trim().length === 0? "Tell about your self...": userDetails?.bio}</pre>
              <button
                onClick={ProfileEdit}
                className="bg-blue-400 hover:bg-blue-500 active:bg-blue-300 text-white w-10 h-10 rounded transition opacity-0 group-hover:opacity-100">
                  <i className="fa-solid fa-pen"></i>
              </button>
            </div>
        </div>
        <div  className="w-full flex justify-center">
          <div
            className="w-1/5 mt-10">
              <p
                className="text-2xl text-[#454851]">{chats?.length? "Chats: ": 'No chats'} </p>
          </div>
        </div>
        <div
          className="w-full flex justify-center ">
            <div
              id="profile-chatusers"
              className="w-1/5 max-h-72 overflow-y-scroll"
              >
                {
                  chats?.length?
                  chats?.map((chat, index) => (
                    <Chatusers key={index} chat={chat}/>
                  )):
                  ""
                }
            </div>
            
        </div>
    </div>
    </div>
  );
};

export default Profile;
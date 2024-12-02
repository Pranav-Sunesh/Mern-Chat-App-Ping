import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useAppDispatch } from "@/hooks/reduxHooks";
import { popAddModal, setGroupModal } from "@/redux/slices/chatSlice";
import Newgroup from "./Newgroup";
import { useState } from "react";
  

const AddDropdown = () => {

    const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
    <DropdownMenuTrigger
        className="w-10 h-10 rounded-full bg-white hover:bg-gray-50 focus:outline-none">
        <i className="fa-solid fa-plus"></i>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
    <DropdownMenuItem
        onClick={() => dispatch(popAddModal(true))}>
            Add Friend
    </DropdownMenuItem>
      <DropdownMenuItem
        onClick={() => dispatch(setGroupModal(true))}
        >New Group</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  
  );
};

export default AddDropdown;
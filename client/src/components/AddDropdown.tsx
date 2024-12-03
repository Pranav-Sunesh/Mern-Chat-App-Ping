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
        className="lg:w-10 lg:h-10 md:w-9 md:h-9 sm:w-9 sm:h-9 rounded-full bg-white hover:bg-gray-50 focus:outline-none">
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
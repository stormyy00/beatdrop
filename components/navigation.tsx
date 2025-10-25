"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Upload,
  UserCircleIcon,
  LogOut,
  User,
  Search,
  BellDotIcon,
  Bell,
  Sun,
  Moon,
  MessageSquare,
} from "lucide-react";
// import UploadDialog from "./upload/dialog";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import DropDialog from "./create/drop-dialog";
// import { signOut } from "@/utils/auth-client";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [searchValue, onSearchChange] = useState("");

  const path = usePathname();
  const page = path
    ?.split("/")
    .pop()
    ?.replace(/^./, (c) => c.toUpperCase());

  return (
    <div className="sticky top-0 z-50 w-full flex justify-between items-center py-4 border-b-2 px-6">
      <div className="flex items-center gap-6">
        <div className="text-lg font-bold">Search</div>
        <div className="relative w-full grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={16} className="text-gray-400" />
          </div>
          <Input
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search links..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-200 focus:ring-2 focus:ring-gray-200 focus:border-gray-400 text-sm"
          />
        </div>
      </div>

      <div className="flex gap-2 items-center">
         <Button variant="ghost" size="icon">
          <MessageSquare size={20} className="text-gray-700" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          //   onClick={toggleTheme}
          className="text-gray-700"
        >
          {"dark" === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </Button>
        <div className="flex items-center gap-x-2 w-full px-2">
          <Button variant="ghost" size="icon" className="text-gray-700">
            {true ? (
              <Bell size={20} className="text-black shrink-0" />
            ) : (
              <BellDotIcon size={20} className="text-black shrink-0" />
            )}
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={() => setOpen(!open)}
          className="bg-cyan-400 border-2 rounded-2xl  text-white"
        >
          Drop it
          <Upload />
        </Button>
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"outline"}
              className="bg-photo-green-100 border-2 rounded-2xl border-photo-green-300 text-photo-green-300"
            >
              <UserCircleIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem
              onClick={() => router.push("/dashboard/profile")}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                signOut();
                router.push("/");
              }}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <DropDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navigation;

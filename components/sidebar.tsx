"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

import { TABS } from "@/data/navigation";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/temporarylogo.png";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
// import { signOut, useSession } from "@/utils/auth-client";
import { Bell, BellDotIcon, LogIn } from "lucide-react";
// import OrganizationSwitcher from "./organization-switcher";
import SidebarProfile from "./sidebar-profile";

const Navigation = () => {
//   const {data: session, isPending} = useSession();
  const path = usePathname().split("/");
  const navParent = path[1];

  const router = useRouter();

  // Extract current organization slug from path
//   const currentOrgSlug = path[2] || "";
  const NAVSECTIONS = TABS[navParent]?.sections || [];
  const generalPath = path.join("/");
  const { open, toggleSidebar } = useSidebar();


  const filteredSections = NAVSECTIONS.map((section) => ({
    ...section,
    tabs: section.tabs.filter((tab) => {
      return true;
    }),
  }));

  return (
    <Sidebar
      collapsible="icon"
      className={`
        h-screen bg-blue-600 text-black border-0 flex justify-between rounded-r-2xl shadow-lg transition-all z-30
        ${open ? "" : "w-[70px] min-w-14"}
      `}
    >
      <SidebarHeader className="flex flex-col items-center space-y-3 py-3">
        <div className="flex items-center gap-x-2 w-full px-2">
          {true ? (
            <Bell size={20} className="text-black shrink-0" />
          ) : (
            <BellDotIcon size={20} className="text-black shrink-0" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-col text-base font-medium px-2">
        {filteredSections.map((section, sectionIndex) => (
          <SidebarGroup key={sectionIndex} className="py-1">
            {open && (
              <SidebarGroupLabel className="text-black/70 text-sm font-semibold tracking-wide uppercase mb-1">
                {section.label}
              </SidebarGroupLabel>
            )}
            <SidebarMenu>
              {section.tabs.map((tab, tabIndex) => (
                <SidebarMenuItem key={tabIndex} className="list-none">
                  <Collapsible
                    defaultOpen={generalPath.startsWith(tab.link)}
                    className="group/collapsible"
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={`
                          w-full flex flex-row items-center cursor-pointer py-1 px-3 rounded-lg
                          transition-all duration-200 ease-in-out
                          ${
                            generalPath === tab.link
                              ? "bg-white/20 text-black"
                              : "text-black/80 hover:bg-white/10 hover:text-black"
                          }
                          gap-3 font-medium
                          ${!open ? "justify-center px-2" : ""}
                        `}
                        onClick={() => router.push(tab.link)}
                      >
                        <span className="shrink-0">{tab.icon}</span>
                        {open && (
                          <span className="flex-1 text-left">{tab.name}</span>
                        )}
                      </button>
                    </CollapsibleTrigger>
                    {tab.subtabs && (
                      <CollapsibleContent className="mt-1">
                        <SidebarMenuSub className="ml-0 space-y-1 border-l border-white/20 pl-2">
                          {tab.subtabs.map((subtab, subindex) => (
                            <Link
                              key={subindex}
                              href={subtab.link}
                              className={`
                                flex flex-row items-center cursor-pointer rounded-lg py-2 px-3
                                transition-all duration-200 ease-in-out
                                ${
                                  generalPath === subtab.link
                                    ? "bg-white/20 text-white"
                                    : "text-white/70 hover:bg-white/10 hover:text-white"
                                }
                                gap-3 text-xs font-medium
                                ${!open ? "justify-center" : ""}
                              `}
                            >
                              <span className="shrink-0">
                                {subtab.icon}
                              </span>
                              {open && (
                                <span className="flex-1 text-left">
                                  {subtab.name}
                                </span>
                              )}
                            </Link>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    )}
                  </Collapsible>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter className="border-t border-white/20 py-3 px-2 space-y-1">
        <button
          onClick={() => toggleSidebar()}
          className={`
            w-full flex items-center justify-${open ? "start" : "center"} 
            py-2 px-3 rounded-lg
            text-white/80 hover:text-white hover:bg-white/10
            transition-all duration-200 ease-in-out
            text-sm font-medium
          `}
        >
          <SidebarTrigger className="hover:bg-transparent hover:text-white p-0 h-5 w-5" />
          {open && <span className="ml-3">Close</span>}
        </button>
        {/* <button
          onClick={() => signOut()}
          className={`
            w-full flex items-center justify-${open ? "start" : "center"}
            py-2 px-3 rounded-lg
            text-white/80 hover:text-white hover:bg-white/10
            transition-all duration-200 ease-in-out
            text-sm font-medium
          `}
        >
          <LogIn size={18} className="flex-shrink-0" />
          {open && <span className="ml-3">Log Out</span>}
        </button> */}
        <SidebarProfile 
          name={"JT" }
          email={ "JT@gmail.com"}
          image={"@gmail.com"}
          signout={() => {}}
        />
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navigation;

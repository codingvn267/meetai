import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";

import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import { GenerateAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";

export const DashboardUserButton = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession();

  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        }
      }
    })
  }

  if (isPending || !data?.user) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  {isMobile && (
      <Drawer>
        <DrawerTrigger className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-white/90 backdrop-blur-md transition hover:shadow-md cursor-pointer gap-x-3">
          
          {data.user.image ? (
            <Avatar className="avatar-md">
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (
            <GenerateAvatar
              seed={data.user.name}
              variant="botttsNeutral"
              className="avatar-md"
            />
          )}

          <div className="flex flex-col text-left overflow-hidden flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{data.user.name}</p>
            <p className="text-xs text-white/70 truncate">{data.user.email}</p>
          </div>

          <ChevronDownIcon className="icon-large text-white/70 group-hover:text-white transition" />
        </DrawerTrigger>

        <DrawerContent className="bg-white dark:bg-gray-900 px-4 py-6 rounded-t-xl">
          <DrawerHeader>
            <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-white">
              {data.user.name}
            </DrawerTitle>
            <DrawerDescription className="text-sm text-gray-600 dark:text-gray-400">
              {data.user.email}
            </DrawerDescription>
          </DrawerHeader>

          <DrawerFooter className="flex flex-col gap-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-gray-700 dark:text-gray-200"
              onClick={() => {}}
            >
              <CreditCardIcon className="icon-size" />
              Billing
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 text-gray-700 dark:text-gray-200"
              onClick={onLogout}
            >
              <LogOutIcon className="icon-size" />
              Logout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
         className="w-full flex items-center justify-between px-4 py-2 rounded-xl border
          border-white/10 bg-white/5 hover:bg-white/10 text-white/90 font-medium backdrop-blur-sm 
          transition-all shadow-sm hover:shadow-md cursor-pointer gap-x-2"
      >
        {data.user.image ? (
          <Avatar className="avatar-md">
            <AvatarImage src={data.user.image}/>
          </Avatar>
        ): <GenerateAvatar
          seed={data.user.name}
          variant="botttsNeutral"
          className="avatar-md mr-3"
        />}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{data.user.name}</p>
          <p className="text-xs text-white/70 truncate">{data.user.email}</p>
        </div>
  <ChevronDownIcon className="icon-large text-white/70 group-hover:text-white transition duration-200"/>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        align="end"
        side="right"
        className="w-80 mt-2 rounded-2xl border bg-white dark:bg-zinc-900 dark:border-white/10 shadow-2xl text-gray-900 dark:text-white backdrop-blur-sm overflow-hidden"
      >
        <div className="px-4 py-4 border-b bg-white dark:bg-zinc-900/60 dark:border-white/5">
          <div className="flex items-center gap-4">
            {data.user.image ? (
              <Avatar className="avatar-md">
                <AvatarImage src={data.user.image} />
              </Avatar>
            ) : (
              <GenerateAvatar seed={data.user.name} variant="botttsNeutral" className="avatar-md" />
            )}

            <div className="flex flex-col min-w-0">
              <span className="font-semibold truncate text-gray-900 dark:text-white text-lg">{data.user.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate">{data.user.email}</span>
            </div>
          </div>
        </div>

        <div className="px-2 py-2">
          <DropdownMenuItem
            className="group cursor-pointer flex items-center gap-3 px-4 py-3 rounded-md bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            <CreditCardIcon className="icon-size text-gray-500 dark:text-gray-300" />
            <span className="flex-1">Billing</span>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={onLogout}
            className="group cursor-pointer flex items-center gap-3 px-4 py-3 rounded-md bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 transition"
          >
            <LogOutIcon className="icon-size text-gray-500 dark:text-gray-300" />
            <span className="flex-1">Log out</span>
            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>


    </DropdownMenu>
  );
}
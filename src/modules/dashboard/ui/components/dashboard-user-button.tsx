import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "@/components/ui/avatar";
import { GenerateAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () => {
  const router = useRouter();
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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
         className="w-full flex items-center justify-between px-4 py-2 rounded-xl border
          border-white/10 bg-white/5 hover:bg-white/10 text-white/90 font-medium backdrop-blur-sm 
          transition-all shadow-sm hover:shadow-md cursor-pointer"
      >
        {data.user.image ? (
          <Avatar>
            <AvatarImage src={data.user.image}/>
          </Avatar>
        ): <GenerateAvatar
          seed={data.user.name}
          variant="botttsNeutral"
          className="size-9 mr-3"
        />}
        <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{data.user.name}</p>
          <p className="text-xs text-white/70 truncate">{data.user.email}</p>
        </div>
        <ChevronDownIcon className="h-5 w-5 text-white/70 group-hover:text-white transition duration-200"/>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent
        align="end"
        side="right"
        className="w-72 mt-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-lg text-white"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-0.5 px-4 py-3">
            <span className="font-semibold truncate">{data.user.name}</span>
            <span className="text-sm text-white/80 truncate">{data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator/>
        <DropdownMenuItem
          className="group cursor-pointer flex items-center justify-between px-4 py-2 rounded-md bg-transparent text-white/90 hover:bg-white/10 hover:text-white transition"
        >
          Billing
          <CreditCardIcon className="h-4 w-4 text-white/70 group-hover:text-white transition" />
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onLogout}
          className="group cursor-pointer flex items-center justify-between px-4 py-2 rounded-md bg-transparent text-white/90 hover:bg-white/10 hover:text-white transition"
        >
          Log out
          <LogOutIcon className="h-4 w-4 text-white/70 group-hover:text-white transition" />
        </DropdownMenuItem>
      </DropdownMenuContent>


    </DropdownMenu>
  );
}
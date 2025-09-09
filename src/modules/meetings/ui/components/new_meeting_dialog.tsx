import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingForm } from "./meeting_form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({
  open,
  onOpenChange
}: NewMeetingDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="New Meeting"
      description="Create a new meeting"  
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={() => {
          onOpenChange(false);
          // After creating a meeting, return to the meetings list so the user
          // sees the updated list instead of a placeholder detail page.
          router.push(`/meetings`);
        }}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}


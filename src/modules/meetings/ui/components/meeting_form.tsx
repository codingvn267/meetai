import { meetingsInsertSchema } from "../../schemas";
import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { toast } from "sonner";
import { useState } from "react";
import { CommandSelect } from "@/components/command-select";
import { GenerateAvatar } from "@/components/generated-avatar";
// Update the import path below to the correct location of new-agent-dialog in your project.
// For example, if the file is at src/modules/agents/ui/components/new-agent-dialog.tsx, use:
// Update the import path below to the correct location and casing of NewAgentDialog in your project.
// For example, if the file is at src/modules/agents/ui/components/NewAgentDialog.tsx, use:
import { NewAgentDialog } from "@/modules/agents/ui/view/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
};

export const MeetingForm = ({
  onSuccess,
  onCancel,
  initialValues
} : MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const [openNewAgentDialog, setOpenNewAgentDialog] = useState(false);
  const [agentSearch, setAgentSearch] = useState("");

  const agents = useQuery(
    trpc.agents.getMany.queryOptions({
      pageSize: 100,
      search: agentSearch
    }),
  );

  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id})
          )
        }
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
        //Todo:check if error code is "FORBIDDEN", redirect to /upgrade
      }
    }),
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.meetings.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.meetings.getOne.queryOptions({ id: initialValues.id})
          )
        }

        // TODO: Invalidate free tier usage
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        //Todo:check if error code is "FORBIDDEN", redirect to /upgrade
      }
    }),
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
    }
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({...values, id: initialValues.id })
    } else {
      createMeeting.mutate(values);
    }
  };

  return (
    <>
      <NewAgentDialog open = {openNewAgentDialog} onOpenChange={setOpenNewAgentDialog}/>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField 
            name = "name"
            control={form.control}
            render= {({ field })=> (
              <FormItem>
                <FormLabel className="text-[oklch(0.38_0.14_147)] dark:text-white text-sm">Name</FormLabel>
                <FormControl>
                  <Input {...field}
                    placeholder="e.g., Consultations"
                    className="
                      h-10 rounded-lg border border-black/10 bg-white/90 px-3
                      text-[oklch(0.38_0.03_147)] placeholder:text-black/40
                      shadow-sm backdrop-blur
                      focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-0
                      dark:border-white/10 dark:bg-zinc-900/80 dark:text-white
                      dark:placeholder:text-white/40
                      " 
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField 
            name = "agentId"
            control={form.control}
            render= {({ field })=> (
              <FormItem>
                <FormLabel className="text-[oklch(0.38_0.14_147)] dark:text-white text-sm">Agent</FormLabel>
                <FormControl>
                  <CommandSelect
                    options = {(agents.data?.items ?? []).map((agent) => ({
                      id: agent.id,
                      value: agent.id,
                      children: (
                        <div className="flex items-center gap-x-2">
                          <GenerateAvatar 
                            variant="botttsNeutral"
                            seed={agent.name}
                            className="size-6 rounded-full bg-zinc-100 text-zinc-700 
                                      ring-2 ring-zinc-200 shadow-sm
                                      dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"
                          />
                          <span>{agent.name}</span>
                        </div>
                      )
                    }))}
                    onSelect = {field.onChange}
                    onSearch = {setAgentSearch}
                    onOpenChange = {(open) => {
                      if (open) setAgentSearch("");
                    }}
                    value = {field.value}
                    placeholder = "Select an agent"
                  />
                </FormControl>
                <FormDescription>
                  Not found what your&apos;re looking for? {" "}
                  <button
                    type = "button"
                    className="text-emerald-600 underline-offset-4 hover:underline
                               dark:text-emerald-400 dark:hover:text-emerald-300"
                    onClick={() => setOpenNewAgentDialog(true)}
                  >
                    Add new agent
                  </button>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between gap-x-2">
    {/* Cancel */}
            <Button
              type="button"
              variant="ghost"
              disabled={isPending}
              onClick={onCancel}
              className="
                rounded-lg px-4 py-2
                border border-black/10 bg-white/90 text-[oklch(0.38_0.14_147)]
                hover:bg-black/5
                dark:border-white/10 dark:bg-zinc-900/80 dark:text-white/80 dark:hover:bg-white/10
                transition-colors
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              Cancel
            </Button>

            {/* Create / Update */}
            <Button
              disabled={isPending}
              type="submit"
              className="
                rounded-lg px-5 py-2
                bg-gradient-to-r from-green-400 via-emerald-500 to-green-800
                text-white font-medium
                shadow-sm
                transition-all duration-150
                hover:from-green-300 hover:via-emerald-400 hover:to-green-700
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-0
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isEdit ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
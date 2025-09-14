import { agentsInsertSchema } from "@/modules/agents/schemas";
import { AgentGetOne } from "@/modules/agents/types";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { GenerateAvatar } from "@/components/generated-avatar";
import { toast } from "sonner";

interface AgentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: AgentGetOne;
};

export const AgentForm = ({
  onSuccess,
  onCancel,
  initialValues
} : AgentFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const createAgent = useMutation(
    trpc.agents.create.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id})
          )
        }
        onSuccess?.();
      },
      onError: (error) => {
        toast.error(error.message);
        //Todo:check if error code is "FORBIDDEN", redirect to /upgrade
      }
    }),
  );

  const updateAgent = useMutation(
    trpc.agents.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({}),
        );

        if (initialValues?.id) {
          await queryClient.invalidateQueries(
            trpc.agents.getOne.queryOptions({ id: initialValues.id})
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

  const form = useForm<z.infer<typeof agentsInsertSchema>>({
    resolver: zodResolver(agentsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      instructions: initialValues?.instructions ?? "",
    }
  });

  const isEdit = !!initialValues?.id;
  const isPending = createAgent.isPending || updateAgent.isPending

  const onSubmit = (values: z.infer<typeof agentsInsertSchema>) => {
    if (isEdit) {
      updateAgent.mutate({...values, id: initialValues.id })
    } else {
      createAgent.mutate(values);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <GenerateAvatar 
          variant="botttsNeutral"
          seed={form.getValues("name")}
          className="avatar-md rounded-full bg-zinc-100 text-zinc-700 
                    ring-2 ring-zinc-200 shadow-sm
                    dark:bg-zinc-800 dark:text-zinc-200 dark:ring-zinc-700"
        />

        <FormField 
          name = "name"
          control={form.control}
          render= {({ field })=> (
            <FormItem>
              <FormLabel className="text-[oklch(0.38_0.14_147)] dark:text-white text-sm">Name</FormLabel>
              <FormControl>
                <Input {...field}
                  placeholder="e.g., Research Bot"
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
          name = "instructions"
          control={form.control}
          render= {({ field })=> (
            <FormItem>
              <FormLabel className="text-[oklch(0.38_0.14_147)] dark:text-white text-sm">Instructions</FormLabel>
              <FormControl>
                <Textarea {...field}
                  placeholder="Describe how this agent should behave — e.g., 'Research and summarize AI news articles daily in under 200 words.'"
                  className="
                    h-24 rounded-lg border border-black/10 bg-white/90 px-3 py-2
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
  )
}
"use client";

import { useState} from "react"
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading_state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-idiviewiheader";
import { GeneratedAvatar } from "@/components/genrated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface props{
    agentId: string;
}

export const AgentIdView =({agentId}:props)=>{
    const router = useRouter()
    const trpc = useTRPC();
    const quearyClient = useQueryClient()
    const[updateAgentDialogOpen, setUpdateAgentDialogOpen] = useState(false);

    const { data } = useSuspenseQuery(trpc.agents.getOne.queryOptions({ id: agentId}));
    const removeAgent = useMutation(
        trpc.agents.remove.mutationOptions({
            onSuccess: async()=>{
                await quearyClient.invalidateQueries(trpc.agents.getMany.queryOptions({}));
                router.push("/agents")
            },
            onError:(error)=>{
                toast.error(error.message || "Failed to remove agent");
            }
        })
    )

    const [RemoveConfirmation , confirmRemove] = useConfirm(
        "Are you sure you want to remove this agent?",
        "This action cannot be undone. Please confirm if you want to proceed."
    );

    const handleRemoveAgent = async ()=>{
        const confirm = await confirmRemove();
        if(!confirm) return;

        await removeAgent.mutateAsync({id : agentId})
    }
    
    return(
        <>
            <RemoveConfirmation />
            <UpdateAgentDialog
                open={updateAgentDialogOpen}
                onOpenChange={setUpdateAgentDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <AgentIdViewHeader 
                    agentId={agentId}
                    agentName={data.name}
                    onEdit={()=>setUpdateAgentDialogOpen(true)}
                    onRemove={handleRemoveAgent}
                />
                <div className="bg-white rounded-lg border">
                    <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                        <div className="flex items-center gap-x-3">
                            <GeneratedAvatar 
                                variant="botttsNeutral"
                                seed={data.name}
                                className="size-10"
                            />
                            <h2 className="text-2xl font-medium"></h2>
                        </div>
                        <Badge
                            variant="outline"
                            className="flex items-center gap-x-2 [&>svg]:size-4"    
                        >
                            <VideoIcon className="text-blue-800" />
                            {data.meetingCount} {data.meetingCount === 1 ? "meeting" : "meetings"}
                        </Badge>
                        <div className="flex flex-col gap-y-4">
                            <p className="text-lg font-medium">Instructions</p>
                            <p className="text-neutral-800">{data.instructions}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export const AgentsIdViewLoading =()=>{
    return(
    <LoadingState
        title="Loading Agents"
        description="Please wait while we load the agents"
    />)
}
export const AgentsIdViewError =()=>{
    return(
    <ErrorState 
        title="Error Loading Agents"
        description="Something went wrong"
    />)
}
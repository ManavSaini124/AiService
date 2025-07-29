"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading_state";
import { meetings } from "@/db/schema"
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meeting-dialog";
import { useState } from "react";
import { Divide } from "lucide-react";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface props{
    meetingId: string
}

export const MeetingIdView = ({ meetingId } : props )=>{
    const trpc = useTRPC();
    const quearyClient = useQueryClient()
    const router = useRouter()
    const { data } = useSuspenseQuery( trpc.meetings.getOne.queryOptions({id: meetingId}) )

    const [RemoveConfirmation, confirmRemove] = useConfirm(
        "Are you sure you want to remove this meeting?",
        "This action cannot be undone. Please confirm if you want to proceed."
    )
    const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState(false);

    const removeMeeting = useMutation(
        trpc.meetings.remove.mutationOptions({
            onSuccess:()=>{
                // Invalidate get many to force a refetch of the list of meetings after deletion
                quearyClient.invalidateQueries(
                    trpc.meetings.getMany.queryOptions({})
                )
                // free tear walla bhi
                    router.push("/meetings")
            },
    }))

    const handleRemoveMeeting = async()=>{
        const confirm = await confirmRemove();
        if(!confirm) return;

        await removeMeeting.mutateAsync({id : meetingId})
    }

    const isUpcoming = data.status === "upcoming"
    const isActive = data.status === "active"
    const isCompleted = data.status === "completed"
    const isProcessing = data.status === "processing"
    const isCancelled = data.status === "cancelled"

    return (
        <>
            <RemoveConfirmation />
            <UpdateMeetingDialog 
                open={updateMeetingDialogOpen}
                onOpenChange={setUpdateMeetingDialogOpen}
                initialValues={data}
            />
            <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
                <MeetingIdViewHeader 
                    meetingId={meetingId} 
                    meetingName={data.name} 
                    onEdit={()=> setUpdateMeetingDialogOpen(true)}  
                    onRemove = {handleRemoveMeeting} 
                />
                {isUpcoming && (
                <UpcomingState 
                    meetingId={meetingId}
                    onCancelMeeting={()=>{}}
                    isCancelling={false}
                />)}
                {isActive && (
                    <ActiveState
                        meetingId="meetingId"
                    />
                )}
                {isCompleted && <div>completed</div>}
                {isProcessing && <ProcessingState/>}
                {isCancelled && <CancelledState/>}
            </div>
        </>
    )
}

export const MeetingIdViewLoading =()=>{
    return(
    <LoadingState
        title="Loading Meeting"
        description="Please wait while we load this meeting"
    />)
}
export const MeetingIdViewError =()=>{
    return(
    <ErrorState
        title="Error Loading Meeting"
        description="Something went wrong"
    />)
}
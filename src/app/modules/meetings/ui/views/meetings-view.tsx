"use client";

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading_state";
import { useTRPC } from "@/trpc/client";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () =>{
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}))
    return(
        <div>
            {JSON.stringify(data)}
        </div>
    )
}

export const MeetingViewLoading =()=>{
    return(
    <LoadingState
        title="Loading Agents"
        description="Please wait while we load the meeting"
    />)
}
export const MeetingViewError =()=>{
    return(
    <ErrorState
        title="Error Loading Meeting"
        description="Something went wrong"
    />)
}
import { MeetingsView, MeetingViewError, MeetingViewLoading } from "@/app/modules/meetings/ui/views/meetings-view";
import { getQueryClient , trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const page =()=>{
    const quearyClient = getQueryClient();
    quearyClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({})
    )
    return (
        <HydrationBoundary state={dehydrate(quearyClient)}>
            <Suspense fallback= {<MeetingViewLoading />}>
                <ErrorBoundary fallback={<MeetingViewError />}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page;
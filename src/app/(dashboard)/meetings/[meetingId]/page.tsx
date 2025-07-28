import { MeetingIdView, MeetingIdViewLoading, MeetingIdViewError } from "@/app/modules/meetings/ui/views/meeting-id-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Divide } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface props {
    params: Promise<{
        meetingId: string
    }>
}

const page = async({params}:props)=>{
    const { meetingId } = await params;

    const session = await auth.api.getSession({
        headers: await headers()
    });

    if(!session){
        redirect("/auth/sign-in");
    }

    const quearyClient = getQueryClient();
    void quearyClient.prefetchQuery(
        trpc.meetings.getOne.queryOptions({id: meetingId})
    )

    return (
        <>
            <HydrationBoundary state={dehydrate(quearyClient)}>
                <Suspense fallback={<MeetingIdViewLoading/>}>
                    <ErrorBoundary fallback={<MeetingIdViewError/>}>
                        <MeetingIdView meetingId={meetingId}/>
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default page;
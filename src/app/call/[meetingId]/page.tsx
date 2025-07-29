import { CallView } from "@/app/modules/call/ui/views/call-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props {
    params: Promise<{
      meetingId: string,  
    }>
}

const page = async({ params }:Props)=>{
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

    return(
        <HydrationBoundary state={dehydrate(quearyClient)}>
            <CallView meetingId={meetingId} />
        </HydrationBoundary>
    )

}

export default page;
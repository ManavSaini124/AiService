import { MeetingsListHeader } from "@/app/modules/meetings/ui/components/meeting-list-header";
import { MeetingsView, MeetingViewError, MeetingViewLoading } from "@/app/modules/meetings/ui/views/meetings-view";
import { auth } from "@/lib/auth";
import { getQueryClient , trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/app/modules/agents/params";
import type { SearchParams } from "nuqs/server";

interface props{
    searchParams : Promise<SearchParams>
}
const page =async({ searchParams }:props)=>{
    const filters = await loadSearchParams(searchParams);

    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!session){
        redirect("/auth/sign-in");
    }

    const quearyClient = getQueryClient();
    quearyClient.prefetchQuery(
        trpc.meetings.getMany.queryOptions({
            ...filters,
        })
    )
    return (
        <>
            <MeetingsListHeader/>
            <HydrationBoundary state={dehydrate(quearyClient)}>
                <Suspense fallback= {<MeetingViewLoading />}>
                    <ErrorBoundary fallback={<MeetingViewError />}>
                        <MeetingsView />
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )
}

export default page;
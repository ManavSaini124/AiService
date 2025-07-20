import { AgentsView, AgentsViewLoading, AgentsViewError } from "@/app/modules/agents/ui/views/agents-view"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { AgentsListHeader } from "@/app/modules/agents/ui/components/list-header";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";


const page= async ()=>{
    const session = await auth.api.getSession({
        headers: await headers()
      });
    
      if(!session){
        redirect("/auth/sign-in");
      }
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

    return (
        <>
            <AgentsListHeader />
            <HydrationBoundary state ={dehydrate(queryClient)}>
                <Suspense fallback ={<AgentsViewLoading/>}>
                    <ErrorBoundary fallback={<AgentsViewError/>}>
                        <AgentsView/>
                    </ErrorBoundary>
                </Suspense>
            </HydrationBoundary>
        </>
    )  
}

export default page
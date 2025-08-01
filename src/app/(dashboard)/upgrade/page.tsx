import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
    UpgradeViewLoading,
    UpgradeViewError,
    UpgradeView
} from "@/app/modules/premium/ui/views/upgrade-view";

const page = async() =>{
    const session = await auth.api.getSession({
        headers: await headers()
    });
    
    if(!session){
        redirect("/auth/sign-in");
    }
    
    const QueryClient = getQueryClient();
    void QueryClient.prefetchQuery(
        trpc.premium.getCurrentSubscription.queryOptions(),
    )
    void QueryClient.prefetchQuery(
        trpc.premium.getProducts.queryOptions(),
    )

    return(
        <HydrationBoundary state={dehydrate(QueryClient)}>
            <Suspense fallback = {<UpgradeViewLoading />}>
                <ErrorBoundary fallback = {<UpgradeViewError />}>
                    <UpgradeView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    )
}

export default page;
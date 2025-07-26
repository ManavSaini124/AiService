"use client";

import {  useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading_state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";


export const AgentsView = () => {
    const router = useRouter();
    const trpc = useTRPC();
    const [filters, setFilters] = useAgentsFilter()
    
    const {data} =useSuspenseQuery(trpc.agents.getMany.queryOptions({
        ...filters
    }))

    return(
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
            <DataTable 
                columns={columns} 
                data={data.items} 
                onRowClick={(row)=>{
                    router.push(`/agents/${row.id}`)
                }}
            />
            <DataPagination 
                page={filters.page}
                totalPages={data.totalPages}
                onPageChange={(page) => setFilters({ page })}
            />
            {data.items.length === 0 &&(
                <EmptyState
                    title="Create your first agent"
                    description="Create a new agent to get started. Each Agent will folow your instruction and would intract with the participants based on instructions given"
                />
            )}
        </div>
    );
};

export const AgentsViewLoading =()=>{
    return(
    <LoadingState
        title="Loading Agents"
        description="Please wait while we load the agents"
    />)
}
export const AgentsViewError =()=>{
    return(
    <ErrorState
        title="Error Loading Agents"
        description="Something went wrong"
    />)
}
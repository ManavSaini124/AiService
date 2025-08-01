import { GeneratedAvatar } from "@/components/genrated-avatar";
import {  CommandResponsiveDialog, CommandInput, CommandList , CommandItem, CommandGroup, CommandEmpty} from "@/components/ui/command"
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface Props{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand=({open, setOpen}: Props)=>{
    const router = useRouter();
    const [search, setSearch] = useState("")

    const trpc = useTRPC()
    const meetings = useQuery(
        trpc.meetings.getMany.queryOptions({
            pageSize: 100,
            search,
        })
    )
    
    const agents = useQuery(
        trpc.agents.getMany.queryOptions({
            pageSize: 100,
            search,
        })
    )

    return(
        <CommandResponsiveDialog shouldFilter= {false} open = {open} onOpenChange={setOpen}>
            <CommandInput 
                placeholder="Find a agent..."
                value={search}
                onValueChange={(value) => setSearch(value)}
            />
            <CommandList>
                <CommandGroup heading="Meetings">
                    <CommandEmpty> no meetings found</CommandEmpty>
                    {meetings.data?.items.map((meeting) => (
                        <CommandItem
                            onSelect={()=>{
                                router.push(`/meetings/${meeting.id}`)
                                setOpen(false)
                            }}
                            key = {meeting.id}
                        >
                            {meeting.name}
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandGroup heading="Agents">
                    <CommandEmpty> no agents found</CommandEmpty>
                    {agents.data?.items.map((agent) => (
                        <CommandItem
                            onSelect={()=>{
                                router.push(`/agents/${agent.id}`)
                                setOpen(false)
                            }}
                            key = {agent.id}
                        >
                            <GeneratedAvatar
                                seed={agent.name}
                                variant="botttsNeutral"
                                className="size-5"
                            />
                            {agent.name}
                        </CommandItem>
                    ))}
                </CommandGroup>
                
            </CommandList>
        </CommandResponsiveDialog>
    )
}
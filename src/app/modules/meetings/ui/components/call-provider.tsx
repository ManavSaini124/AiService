"use client"

import { authClient } from "@/lib/auth-client";
import { LoadingState } from "@/components/loading_state";
import { ChartColumnIcon } from "lucide-react";
import { genrateAvatarUri } from "@/lib/avatar";
import { ChatUI } from "./ChatUI";

interface props{
    meetingId: string;
    meetingName: string;
}

export const ChatProvider = ({ meetingId, meetingName }:props)=>{
    const { data, isPending } = authClient.useSession();

    if(isPending || !data?.user){
        return(
            <LoadingState
                title="Loading..."
                description="Please wait while we load the meeting"
            />  
        )
    }

    return(
        <ChatUI 
            meetingId={meetingId}
            meetingName={meetingName}
            userId={data.user.id}
            userName={data.user.name}
            userImage={data.user.image ?? " "}
        />
    )
}
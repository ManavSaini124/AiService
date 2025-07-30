import { ScrollArea, ScrollBar} from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import { MeetingGetOne } from "../../types";
import Markdown from "react-markdown"
import Link from "next/link";
import { GeneratedAvatar } from "@/components/genrated-avatar";

import { 
    BookOpenTextIcon,
    SparklesIcon,
    FileTextIcon,
    FileVideoIcon,
    ClockFadingIcon
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import { Transcript } from "./Transcript";
import { ChatProvider } from "./call-provider";

interface props{
    data: MeetingGetOne;

}

export const CompletedState = ({data}:props)=>{
    return (
        <div className="flex flex-col gap-y-4">
            <Tabs defaultValue = "summary">
                <div className="big-white rounded-lg border px-3">
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13">
                            <TabsTrigger 
                                value= "summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <BookOpenTextIcon />
                                Summary
                            </TabsTrigger>
                            <TabsTrigger 
                                value= "transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileTextIcon />
                                transcript
                            </TabsTrigger>
                            <TabsTrigger 
                                value= "recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <FileVideoIcon />
                                recording
                            </TabsTrigger>
                            <TabsTrigger 
                                value= "chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
                            >
                                <SparklesIcon />
                                Ask AI
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal"/>
                    </ScrollArea>
                </div>
                <TabsContent value="chat">
                    <ChatProvider meetingId={data.id} meetingName={data.name}/>
                </TabsContent>
                <TabsContent value="transcript">
                    <Transcript meetingId={data.id} />
                </TabsContent>
                <TabsContent value="recording">
                    <div className="bg-white rounded-lg border px-4 py-5">
                        <video 
                            src={data.recordingUrl!}
                            className="w-full rounded-lg"
                            controls
                        />
                    </div>
                </TabsContent>
                <TabsContent value = "summary">
                    <div className="bg-white rounded-lg border">
                        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
                            <h2 className="text-2xl font-medium capitalize">{data.name}</h2>
                            <div className="flex gap-x-2 items-center">
                                <Link href={`/agents/${data.agent.id}`} className="flex items-center gap-x-2 underline underline-offset-4 capitalize">
                                    <GeneratedAvatar 
                                        variant="botttsNeutral"
                                        seed = {data.agent.name}
                                        className="size-5"
                                    />
                                    <span className="text-sm text-muted-foreground">{data.agent.name}</span>
                                </Link>{" "}
                                <p>{data.startedAt ? format(data.startedAt,"PPP"):""}</p>
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <SparklesIcon className="size-4"/>
                                <p>Gernal Summary</p>
                            </div>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-x-2 [&>svg]:size-4"
                            >
                                <ClockFadingIcon className="text-blue-700" />
                                {data.duration ? formatDuration(data.duration) : "No Duration"}
                            </Badge>
                        </div>
                        <div>
                            <Markdown
                                components={{
                                    h1: (props) =>(
                                        <h1 className="text-2xl font-medium mb-6" {...props} />
                                    ),
                                    h2: (props) =>(
                                        <h2 className="text-xl font-medium mb-6" {...props} />
                                    ),
                                    h3: (props) =>(
                                        <h3 className="text-lg font-medium mb-6" {...props} />
                                    ),
                                    h4: (props) =>(
                                        <h4 className="text-base font-medium mb-6" {...props} />
                                    ),
                                    p: (props) =>(
                                        <p className="mb-6 leading-relexed" {...props} />
                                    ),
                                    ul: (props) =>(
                                        <ul className="mb-6 list-disc list-inside" {...props} />
                                    ),
                                    ol: (props) =>(
                                        <ol className="mb-6 list-decimal list-inside" {...props} />
                                    ),
                                    li: (props) =>(
                                        <li className="mb-1 " {...props} />
                                    ),
                                    strong: (props) =>(
                                        <strong className="fond-semibold " {...props} />
                                    ),
                                    code: (props) =>(
                                        <code className="bd-gray-100 px-1 py-0.5 rounded" {...props} />
                                    ),
                                    blockquote: (props) =>(
                                        <blockquote className="border-l-2 border-gray-400 pl-4 py-2" {...props} />
                                    ),
                                    hr: (props) =>(
                                        <hr className="my-6" {...props} />
                                    ),
                                    a: (props) =>(
                                        <a className="underline underline-offset-4" {...props} />
                                    ),
                                }}
                            >
                                {data.summary}
                            </Markdown>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
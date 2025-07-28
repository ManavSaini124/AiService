import { ChevronRightIcon, TrashIcon , PencilIcon, MoreVerticalIcon } from "lucide-react";
import  Link  from "next/link"
import {Button} from "@/components/ui/button"
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
    BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from "@/components/ui/dropdown-menu";

interface props {
    meetingId: string;
    meetingName: string;
    onEdit:()=> void;
    onRemove:()=> void;
}

export const MeetingIdViewHeader = ({ meetingId, meetingName, onEdit, onRemove }: props) => {
    return(
        <div className = "flex items-center justify-between">
            <Breadcrumb>
                <BreadcrumbList>

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl">
                            <Link href="/meetings">
                                My Meeting
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbSeparator className="text-foreground text-xl font-medium [&>svg]:size-4">
                        <ChevronRightIcon />
                    </BreadcrumbSeparator>

                    <BreadcrumbItem>
                        <BreadcrumbLink asChild className="font-medium text-xl text-foreground">
                            <Link href={`/meetings/${meetingId}`}>
                                 {meetingName}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>

                </BreadcrumbList>
            </Breadcrumb>

            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <MoreVerticalIcon className="size-4" />
                        <span className="sr-only">Open menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={onEdit}>
                        <PencilIcon className="size-4 text-black" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onRemove}>
                        <TrashIcon className="size-4 text-black" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}


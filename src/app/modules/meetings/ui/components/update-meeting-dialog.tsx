import { ResponsiveDialog } from "@/components/responsive-dilog";
import { MeetingForm } from "./meetings-form";
import { MeetingGetOne } from "../../types";

interface updateMeetingDialogProps{
    open: boolean;
    onOpenChange: (open: boolean)=> void;
    initialValues: MeetingGetOne
}

export const UpdateMeetingDialog =({open, onOpenChange, initialValues}:updateMeetingDialogProps)=>{
    return(
        <ResponsiveDialog
            title="Edit Meeting"
            description="Edit the details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <MeetingForm
                onSuccess={()=>onOpenChange(false)} 
                onCancel={()=>onOpenChange(false)}
                initialValues={initialValues}
            />


        </ResponsiveDialog>
    )
}

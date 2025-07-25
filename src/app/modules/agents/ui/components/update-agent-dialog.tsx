import { ResponsiveDialog } from "@/components/responsive-dilog";
import { AgentForm } from "./agents-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps{
    open: boolean;
    onOpenChange: (open: boolean)=> void;
    initialValues: AgentGetOne;
}

export const UpdateAgentDialog =({open, onOpenChange,initialValues}:UpdateAgentDialogProps)=>{
    return(
        <ResponsiveDialog
            title="Edit Agent"
            description="You can edit the agent details"
            open={open}
            onOpenChange={onOpenChange}
        >
            <AgentForm 
                onSuccess={()=>onOpenChange(false)} 
                onCancel={()=>onOpenChange(false)}
                initialValues={initialValues}
            />

        </ResponsiveDialog>
    )
}

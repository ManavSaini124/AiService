import { DEFAULT_PAGE } from "@/constants"
import { parseAsInteger, parseAsString, useQueryStates , parseAsStringEnum} from "nuqs"
import { MeetingStatus } from "../types"
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Custom hook to manage query states for meetings.
 * 
 * This hook sets up and returns query states for filtering meetings,

 * allowing management of search, page, and status parameters.
 * 
 * - `search`: A string query for filtering meetings by name, with a default
 *   empty string and an option to clear on default.
 * - `page`: An integer indicating the current page, with a default value
 *   specified by `DEFAULT_PAGE` and an option to clear on default.
 * - `status`: An enum string representing the status of the meeting.
 * 
 * @returns An object containing current query states for search, page, and status.
 */

export const useMeetingsFilter = () => {
    return useQueryStates(
        {
            search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
            page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
            status: parseAsStringEnum(Object.values(MeetingStatus)),
            agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
        }
    )
    
}
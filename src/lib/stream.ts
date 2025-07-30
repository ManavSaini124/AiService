import "server-only"

import { StreamChat } from "stream-chat"

export const streamChat = StreamChat.getInstance(
    process.env.NEXT_PUBLIC_STREAM_KEY!,
    process.env.NEXT_PUBLIC_STREAM_SECRET_KEY!
)
import "server-only"

import { StreamClient } from "@stream-io/node-sdk";

const ApiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_KEY!;
const ApiSecret = process.env.VIDEO_SECRET_KEY!;

export const streamVideo = new StreamClient(ApiKey,ApiSecret)
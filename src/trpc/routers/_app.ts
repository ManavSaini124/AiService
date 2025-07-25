import { agentRouter } from '@/app/modules/agents/server/procedures';

import { createTRPCRouter } from '../init';
import { meetingsRouter } from '@/app/modules/meetings/server/procedures';

export const appRouter = createTRPCRouter({
    agents: agentRouter,
    meetings: meetingsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
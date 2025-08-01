import { Polar } from "@polar-sh/sdk"

export const polarClient = new Polar({
    accessToken: process.env.NEXT_POLAR_TOKEN,
    server: "sandbox",
})
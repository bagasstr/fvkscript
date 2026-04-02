import { auth } from "$lib/server/auth";

export const GET = ({ request }: { request: any }) => {
    return auth.handler(request);
};

export const POST = ({ request }: { request: any }) => {
    return auth.handler(request);
};

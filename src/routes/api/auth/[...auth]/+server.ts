import { auth } from "$lib/server/auth";

export const GET: import("./$types").RequestHandler = ({ request }) => {
    return auth.handler(request);
};

export const POST: import("./$types").RequestHandler = ({ request }) => {
    return auth.handler(request);
};

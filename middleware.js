import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};

//if no logged-in user, then redirected to login page. auth.js has the code that handles whether there is an authorized user or not
//this one protects the account page from non-authorized users, not logged-in people.
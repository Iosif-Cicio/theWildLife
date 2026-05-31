import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  const session = await auth();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

/*
 Description:
 This file renders the navigation bar of the website.
 The navigation bar includes links to different pages and displays the logged-in user's avatar (if existing).

   Key Features:
1. Importing Functions:
 - Import Link from "next/link" for navigation links.
 - Import the auth function to get the current session.

2. Defining the Navigation Component:
 - This async function fetches the current session using the auth function.

3. Rendering the Navigation Bar:
 - The navigation bar includes links to "Cabins" and "About" pages.
- It conditionally renders the user's avatar if the user is logged in, otherwise, it displays a simple "Guest area" link.

 4. Conditional Rendering:
  - If the user is logged in and has an avatar, it will display the avatar image with a link to the account page.
  - If the user is not logged in, a simple link to the "Guest area" will be displayed.
 */
/*
This file is responsible for fetching the current guest data from the session and passing it to the client component.
It handles the server-side logic of getting guest information.
*/

import SelectCountry from "@/app/_components/SelectCountry";
import UpdateProfileForm from "@/app/_components/UpdateProfileForm";
import { auth } from "@/app/_lib/auth";
import { getGuest } from "@/app/_lib/data-service";

export const metadata = {
  title: "Update profile",
};

export default async function Page() {
  const session = await auth(); // Auth the user, get session
  const guest = await getGuest(session.user.email); // Get guest info using email

    // Return the HTML structure of the page
  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <UpdateProfileForm guest={guest}>
        <SelectCountry
          name="nationality"
          id="nationality"
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultCountry={guest.nationality}
        />
      </UpdateProfileForm>
    </div>
  );
}

//The UpdateProfileForm is a client component, passing the guest information and rendering the SelectCountry (server) component within it, passing it as a prop.
//without this, the SelectCountry component would trigger some errors (supabase url is required), as it needs to run on the server, fetching data, and not on the client-side.
//doing it like this, the SelectCountry component is rendered on the server, and the UpdateProfileForm component passes its data as a prop, making it work.
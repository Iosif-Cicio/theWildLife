//Displays a list of the user's reservations or a message if no reservations exist

import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth"; //check user authentication, check if allowed to be here
import { getBookings } from "@/app/_lib/data-service"; //get bookings from database

export const metadata = {
  title: "Reservations",
};

// Main page component to display reservations
export default async function Page() {
  const session = await auth(); // Check if user is authenticated
  const bookings = await getBookings(session.user.guestId); // Get user's bookings

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </a>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}

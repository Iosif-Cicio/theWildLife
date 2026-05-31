//Manages the list of reservations, using the useOptimistic hook to handle optimistic updates for deletions.
//Optimistic assumes a certain asynchronous operation will be successful before it finishes, making the app feel faster and more responsive.
//Updates the UI before the async operation completes. Assumes the operation will succeed - if it fails, the state is reverted.

"use client";

import ReservationCard from "./ReservationCard"; // Component to display individual reservation cards
import { deleteBooking } from "../_lib/actions";

import { useOptimistic } from "react";

//Component to display and manage the list of reservations
function ReservationList({ bookings }) {
  //Initialize the optimistic state and the function to handle optimistic updates
  const [optimisticBookings, optimisticDelete] = useOptimistic(
    bookings, (curBookings, bookingId) => {
      //Update the state optimistically by removing the booking immediately
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  //Function to handle the deletion of a reservation
  async function handleDelete(bookingId) {
    //Call the optimistic delete function first
    optimisticDelete(bookingId);
    //actual deletion of the booking
    await deleteBooking(bookingId);
  }

  return (
    <ul className="space-y-6">
      {optimisticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          onDelete={handleDelete}
          key={booking.id}
        />
      ))}
    </ul>
  );
}

export default ReservationList;

"use client"; //This means the component runs on the client side

import { TrashIcon } from "@heroicons/react/24/solid";  //Icon for the delete button
import { useTransition } from "react"; //marks a state update as a transition, keeping the UI responsive.
import SpinnerMini from "./SpinnerMini"; //Small spinner component for loading state

//Component to delete a reservation
function DeleteReservation({ bookingId, onDelete }) {
  //Initialize transition state
  const [isPending, startTransition] = useTransition();

  //Function to handle delete action
  function handleDelete() {
    if (confirm("Are you sure you want to delete this reservation?")) //Confirm before deleting
      startTransition(() => onDelete(bookingId)); //Start the transition and call onDelete function
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
    >
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <SpinnerMini />
        </span>
      )}
    </button>
  );
}

export default DeleteReservation; //export to be used in the app

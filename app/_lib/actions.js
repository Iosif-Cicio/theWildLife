//Server Actions enable user interactions by allowing data creation, updates, and deletions (mutations).
//Server Actions are async server functions for handling form submissions and client events. They only work server-side.
//Created with "use server" at the top of a function or file.
"use server";

import { auth, signIn, signOut } from "./auth";
import { getBookings } from "./data-service";
import { supabase } from "./supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


//Contains the server action function that processes the form submission. It handles validating the form data and updating the guest information in the database.
export async function updateGuest(formData) {
  const session = await auth(); // Authenticate the user
  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID"); // Get national ID from the form data
  const [nationality, countryFlag] = formData.get("nationality").split("%"); // Split nationality and country flag

  // Validate national ID format
  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalID }; // Prepare the data to be updated

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId); // Update guest data in the database

  if (error) throw new Error("Guest could not be updated");

  revalidatePath("/account/profile");  // Revalidate the cache for the profile page to show updated data
}

export async function createBooking(bookingData, formData) {
  const session = await auth(); // Authenticate the user
  if (!session) throw new Error("You must be logged in");

  //Create new booking with required data
  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId, //Add guest ID from session
    numGuests: Number(formData.get("numGuests")), //Get number of guests from form data
    observations: formData.get("observations").slice(0, 1000), //Get observations from form data, limit to 1000 chars
    extrasPrice: 0, //Default extras price to 0
    totalPrice: bookingData.cabinPrice, //Set total price based on cabin price
    isPaid: false, //Set isPaid status to false
    status: "unconfirmed", //Set booking status to unconfirmed
  };

  const { error } = await supabase.from("bookings").insert([newBooking]); // Insert new booking in the database

  if (error) throw new Error("Booking could not be created");

  revalidatePath(`/cabins/${bookingData.cabinId}`); // Revalidate the cache for the specific cabin

  redirect("/cabins/thankyou"); // Redirect to thank you page
}

// Delete booking from the database
export async function deleteBooking(bookingId) {
  const session = await auth(); // Authenticate the user
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));

  // 1) Authentication
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(bookingId))
    throw new Error("You are not allowed to update this booking");

  // 3) Building update data
  const updateData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000),
  };

  // 4) Mutation
  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", bookingId)
    .select()
    .single();

  // 5) Error handling
  if (error) throw new Error("Booking could not be updated");

  // 6) Revalidation
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath("/account/reservations");

  // 7) Redirecting
  redirect("/account/reservations");
}

//if the user successfully logs in to Google, they will be redirected to their account page. Exported to the SignInButton component.
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" }); //user is logged out and redirected to the landing page. Exported to the SignOutButton component.
}

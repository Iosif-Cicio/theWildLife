import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }
}

/*
+++++++Copy of the Code, but with Explanations++++++++
// Importing Functions:
// We import getBookedDatesByCabinId and getCabin from our data service module to fetch data related to cabins.
import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// The GET function handles GET requests to our API endpoint.
export async function GET(request, { params }) {
  // Extracting URL Parameters:
  // We extract cabinId from the URL parameters, which are dynamic parts of the URL (/api/cabins/89 where 89 is the cabinId).
  const { cabinId } = params;

  try {
    // Fetching Data in Parallel:
    // Using Promise.all, we fetch cabin details and booked dates at the same time to improve efficiency.
    // await ensures we wait for these promises to resolve before proceeding.
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    // Returning JSON Data:
    // If data fetching is successful, we return the data as a JSON response using Response.json.
    return Response.json({ cabin, bookedDates });
  } catch {
    // Handling Errors:
    // If there's an error (invalid cabinId), the catch block returns a JSON response with the message "Cabin not found" to handle errors.
    return Response.json({ message: "Cabin not found" });
  }
}
 */
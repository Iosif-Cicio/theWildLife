//this one does the data fetching for the CabinCard component, etc. Goes over a collection of cabins and render a CabinCard for each.
import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

//filter from app/cabins/page.js - from the searchParams
async function CabinList({ filter }) {

  //Fetch cabin data asynchronously
  const cabins = await getCabins();

  //Returns null if no cabins are found
  if (!cabins.length) return null;

  let displayedCabins;
  //Filters cabins based on the specified filter criteria
  if (filter === "all") displayedCabins = cabins;
  if (filter === "small")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  if (filter === "medium")
    displayedCabins = cabins.filter(
        (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7
    );
  if (filter === "large")
    displayedCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);

  //Renders the list of CabinCard components based on the result of displayedCabins.
  return (
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
        ))}
      </div>
  );
}

export default CabinList;


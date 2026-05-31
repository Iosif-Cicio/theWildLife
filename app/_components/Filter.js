//this component handles the buttons for the cabin filter feature

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation"; //importing stuff from the navigation package. Client-side navigation.

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter(); // Hook to navigate between routes in Next.js
  const pathname = usePathname(); // Hook to get the current path name

// Get the current filter from the URL query parameters, for the highlighting of the active filter button
const activeFilter = searchParams.get("capacity") ?? "all";

  // Function to handle filter button clicks, triggering the displaying of the active filter
  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, //converts parameters to a string, constructs the URl we want to move to. So, pathname + the params as a string, basically.
        { scroll: false }); //to prevent the page from scrolling to the top when the URL changes
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

//Button component to render each filter button. The active one gets highlighted.
function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;

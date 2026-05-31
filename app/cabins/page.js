// Main page component for displaying the cabins and related UI elements

import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Counter from "../_components/Counter";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

//revalidate refreshes the data every hour (60x60 seconds), so the data always fresh (should there ba change in the database).
//But searchParams makes this site dynamic, so it might be redundant. Left it here because learning process. It would be useful for a static page.
export const revalidate = 3600;


//puts the Cabins into the tab title
export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
          Live Free, Be Wild
      </h1>
      <p className="text-primary-200 text-lg mb-10">
          Escape the digital noise of the modern world and revitalize in one of our secluded mountain retreats.
          Nestled in the heart of pristine mountain ranges, our luxurious cabins offer the perfect blend of adventure and tranquility.
          Wake up to breathtaking alpine views, explore lush forests, or relax in your private hot tub under the stars.
          Discover the beauty of nature in your own serene sanctuary.
          Experience peace, calm, and inspiration. Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </div>
  );
}

/*
+++++++Suspense+++++++
Shows a Spinner while CabinList fetches data. Once the data is ready, CabinList and ReservationReminder are displayed,
improving user experience by only blocking the necessary part of the UI.
 */

/*
In line 40, key={filter} is used to force the loading spinner. Makes the value of the filter unique. Whenever the value changes now, the fallback will be shown.
Otherwise, Next/Navigation in the component Filter.js will cause Suspense to not hide the old content, preventing the spinner from showing, not showing that new content is loading.
Instead, it will just swap the old content with the new. But this way (with the spinner enabled), it looks more natural, UX-wise.
 */

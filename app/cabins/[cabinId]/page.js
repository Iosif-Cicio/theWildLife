//Loads cabin data dynamically
import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";

import Image from "next/image";
import { Suspense } from "react";

// This file defines the page component for a specific cabin's details and reservation functionality.

// Fetches data dynamically, then generates the cabin's name into the tab
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// Generates a string of cabinId thingies, pre-renders a static page for all the cabins. Improves performance. Next.js loves static pages
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));

  return ids;
}

// Main Page component to render the cabin details and reservation functionality
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId); // Fetching the cabin data dynamically using the cabin ID

  return (
      <div className="max-w-6xl mx-auto mt-8">
        {/* Renders the Cabin component with the fetched cabin data */}
        <Cabin cabin={cabin} />

        <div>
          <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
            Reserve {cabin.name} today. Pay on arrival.
          </h2>

          {/*
          Suspense component to handle the asynchronous operation of fetching reservation data.
          Shows a spinner as fallback content while the Reservation component is loading. Partial pre-rendering?
        */}
          <Suspense fallback={<Spinner />}>
            <Reservation cabin={cabin} />
          </Suspense>
        </div>
      </div>
  );
}

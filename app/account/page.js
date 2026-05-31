import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

export default async function Page() {
  const session = await auth();

  const firstName = session.user.name.split(" ").at(0); //split etc. to get just the first part of the name (just Klaus of Klaus Kleber, for example)

  return (
      <>
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Welcome, {firstName}
        </h2>
        <p className="text-primary-200 text-lg mb-10">
          We&apos;re excited to have you here.
          Explore our site and discover the wonders of our luxury cabins nestled in the Italian Dolomites. Enjoy your adventure!
        </p>
      </>
  );
}

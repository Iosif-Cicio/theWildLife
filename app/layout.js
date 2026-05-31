import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

//Import the Josefin Sans font from the Next.js font package
import { Josefin_Sans } from "next/font/google";

// Configure the Josefin Sans font with options
const josefin = Josefin_Sans({
  subsets: ["latin"], // Specify the character subset (Latin in this case)
  display: "swap", // First it displays the font in some default thing, and once Josefin has been dl-ed, it swaps it
});

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

export const metadata = {
  title: {
    template: "%s / The Wild Life",
    default: "Welcome to The Wild Life",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
      >
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
//from here, ReservationProvider passes custom hook state info to all client components, mostly used in the Date & Reservation components
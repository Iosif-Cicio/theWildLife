import Image from "next/image";
import image1 from "@/public/about-1.jpg";
import image2 from "@/public/about-2.jpg";
import { getCabins } from "../_lib/data-service";

export const revalidate = 86400;

export const metadata = {
  title: "About",
};

//for the cabin numbers, down below in the second paragraph {cabins.length}. getCabins
export default async function Page() {
  const cabins = await getCabins();

  return (
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-x-24 gap-y-32 text-lg items-center">
          <div className="col-span-1 lg:col-span-3">
            <h1 className="text-4xl mb-10 text-accent-400 font-medium text-center lg:text-left">
              Welcome to Wild Life
            </h1>

            <div className="space-y-8">
              <p>
                Discover the ultimate escape where adventure and nature collide.
                Nestled in the rugged peaks of the Italian Dolomites,
                Wild Life offers a sanctuary for the daring souls seeking to reconnect with nature and embrace their wild side.
                This is not just a retreat; it&apos;s a call to live boldly and experience the raw beauty of the mountains.
              </p>
              <p>
                Our {cabins.length} uniquely designed cabins provide a cozy base, but the true allure lies beyond your doorstep.
                Roam through untamed forests, scale majestic peaks, and breathe in the crisp, invigorating mountain air.
                As the sun sets, gather around a roaring campfire or unwind in your private hot tub under a blanket of stars.
              </p>
              <p>
                At Wild Life, every moment is an invitation to create unforgettable memories.
                Whether it’s hiking rugged trails, spotting wildlife, or simply soaking in the breathtaking views,
                this is a place where you can truly live free and be wild.
                Experience the thrill of the outdoors while enjoying the comfort of our well-appointed cabins.
              </p>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2 mt-4 lg:mt-0">
            <Image
                src={image1}
                alt="Family sitting around a fire pit in front of cabin"
                placeholder="blur"
                priority
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full object-cover"
            />
          </div>

          <div className="col-span-1 lg:col-span-2 mt-4 lg:mt-0 order-first lg:order-none">
            <Image
                src={image2}
                alt="Family that manages The Wild Life"
                placeholder="blur"
                quality={80}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="w-full object-cover"
            />
          </div>

          <div className="col-span-1 lg:col-span-3">
            <h1 className="text-4xl mb-10 text-accent-400 font-medium text-center lg:text-left">
              A Legacy of Adventure
            </h1>

            <div className="space-y-8">
              <p>
                Wild Life is more than just a retreat; it&apos;s a legacy of adventure passed down through generations.
                Established by our adventurous grandparents, this haven has been meticulously crafted to offer a blend of comfort and wild, untamed beauty.
                Since 1969, our family has welcomed fellow adventurers, fostering a spirit of camaraderie and exploration.
              </p>
              <p>
                At Wild Life, you’re not just a guest; you&apos;re part of our wild family.
                Embrace the freedom, challenge your limits, and find peace in the heart of nature.
                Join us at Wild Life, where every visit is a new adventure and every memory is a step closer to discovering your wildest self.
                So, are you ready to answer the call of the wild? Come and join us at Wild Life, where adventure and tranquility await in perfect harmony.
              </p>

              <div>
                <a
                    href="/cabins"
                    className="inline-block mt-4 bg-accent-500 px-8 py-5 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
                >
                  Explore our luxury cabins
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

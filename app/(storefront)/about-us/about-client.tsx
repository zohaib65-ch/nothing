"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/config";

const PRODUCTS = [
  {
    name: "Headphone (1)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLQ8lLW8GAnNfzqseldLANMBpF/headphone-1.jpg",
  },
  {
    name: "Phone (2)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLR3uEFodNwKl8qxfSdTEVbIpo/phone-2.jpg",
  },
  {
    name: "Ear (a)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLyN6QpPPp28ee8Y7bVtxUeD77/ear-a.jpg",
  },
  {
    name: "Phone (4a) Pro",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DM8zQ7EaKc8LVWJuVg7BkhVrgC/4a-pro.jpg",
  },
  {
    name: "Ear",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLU9AQd0twTiZ7JL0TUAVcYgDp/ear.jpg",
  },
  {
    name: "Phone (4a)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DM8zMn2PNg8Q8szZAvvdPTLPjf/4a.jpg",
  },
  {
    name: "Phone (2a)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLR3ntuHWj3QbGG6934rP2LSxd/phone-2a.jpg",
  },
  {
    name: "Ear (Open)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLU9FXxFB5gmRr0837lq0EaFBJ/ear-open.jpg",
  },
  {
    name: "Phone (3a)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLR3vtlQHasqNDLCK3hkcP6ttF/phone-3a.jpg",
  },
  {
    name: "Headphone (a)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLaO2j8oAnf47GPtzZjnt0yS6u/headphone-a.jpg",
  },
  {
    name: "Phone (3a) Pro",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLR3ralpGQLQq1GtQhY6fgo2cz/phone-3a-pro.jpg",
  },
  {
    name: "Ear (3)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DM5ciqdujVJ5SSB8LcaIKctIlr/ear-3.jpg",
  },
  {
    name: "Phone (3)",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DLR3xbQbIem4HvApvVsjtRJIUX/phone-3.jpg",
  },
];

const AWARDS = [
  {
    name: "Time Best Inventions",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DOJrZawCbuE2xVExU0iWmp5XEv/time-best.png",
  },
  {
    name: "iF Design Award",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DOJrQScbZ9xdAqn9KSApnE50lB/if.png",
  },
  {
    name: "Red Dot Award",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DOJrQlIrbkg1dIGSCW62MTaR8n/reddot.png",
  },
  {
    name: "Stuff Gadgets",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DOJrRUJ32nkgxeB89YVD0rU2ah/stuff-gadgets.png",
  },
  {
    name: "Wallpaper Awards",
    src: "https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DRUybpPv7OQ98yBCgxQ2cFziVF/wallpaper-awards.png",
  },
];

const CrossHairIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 0V14M14 7L0 7" stroke="black" />
  </svg>
);

const BarcodePattern = () => (
  <svg width="196" height="31" viewBox="0 0 196 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect y="30.1719" width="30.1724" height="4.11442" transform="rotate(-90 0 30.1719)" fill="#fafafa" />
    <rect x="26.0576" y="30.1738" width="30.1724" height="6.85736" transform="rotate(-90 26.0576 30.1738)" fill="#fafafa" />
    <rect x="60.3457" y="30.1719" width="30.1724" height="10.9718" transform="rotate(-90 60.3457 30.1719)" fill="#fafafa" />
    <rect x="83.6611" y="30.1719" width="30.1724" height="10.9718" transform="rotate(-90 83.6611 30.1719)" fill="#fafafa" />
    <rect x="102.861" y="30.1719" width="30.1724" height="13.7147" transform="rotate(-90 102.861 30.1719)" fill="#fafafa" />
    <rect x="6.8584" y="30.1738" width="30.1724" height="2.74294" transform="rotate(-90 6.8584 30.1738)" fill="#fafafa" />
    <rect x="19.2012" y="30.1738" width="30.1724" height="2.74294" transform="rotate(-90 19.2012 30.1738)" fill="#fafafa" />
    <rect x="39.7734" y="30.1719" width="30.1724" height="2.74294" transform="rotate(-90 39.7734 30.1719)" fill="#fafafa" />
    <rect x="97.375" y="30.1738" width="30.1724" height="2.74294" transform="rotate(-90 97.375 30.1738)" fill="#fafafa" />
    <rect x="74.0605" y="30.1738" width="30.1724" height="2.74294" transform="rotate(-90 74.0605 30.1738)" fill="#fafafa" />
    <rect x="119.318" y="30.1719" width="30.1724" height="2.74294" transform="rotate(-90 119.318 30.1719)" fill="#fafafa" />
    <rect x="148.119" y="30.1738" width="30.1724" height="2.74294" transform="rotate(-90 148.119 30.1738)" fill="#fafafa" />
    <rect x="154.977" y="30.1719" width="30.1724" height="2.74294" transform="rotate(-90 154.977 30.1719)" fill="#fafafa" />
    <rect x="161.835" y="30.1738" width="30.1724" height="5.48589" transform="rotate(-90 161.835 30.1738)" fill="#fafafa" />
    <rect x="170.062" y="30.1738" width="30.1724" height="5.48589" transform="rotate(-90 170.062 30.1738)" fill="#fafafa" />
    <rect x="183.778" y="30.1738" width="30.1724" height="5.48589" transform="rotate(-90 183.778 30.1738)" fill="#fafafa" />
    <rect x="192.006" y="30.1738" width="30.1724" height="6.85736" transform="rotate(-90 192.006 30.1738)" fill="#fafafa" />
    <rect x="124.804" y="30.1738" width="30.1724" height="4.11442" transform="rotate(-90 124.804 30.1738)" fill="#fafafa" />
    <rect x="138.52" y="30.1719" width="30.1724" height="5.48589" transform="rotate(-90 138.52 30.1719)" fill="#fafafa" />
    <rect x="52.1162" y="30.1719" width="30.1724" height="4.11442" transform="rotate(-90 52.1162 30.1719)" fill="#fafafa" />
  </svg>
);

export function AboutClient() {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  React.useEffect(() => {
    checkScroll();
    const el = carouselRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    const interval = setInterval(() => {
      if (!el) return;
      const firstChild = el.firstElementChild as HTMLElement | null;
      const step = firstChild ? firstChild.offsetWidth + 24 : 500;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 15) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: step, behavior: "smooth" });
      }
    }, 2000);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearInterval(interval);
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const offset = direction === "left" ? -450 : 450;
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="bg-[#F5F5F5] text-black font-ntype82 min-h-screen relative overflow-x-hidden pt-20">
      {/* Corner crosshairs */}
      <div className="fixed left-4 top-24 z-10 hidden lg:block opacity-60">
        <CrossHairIcon />
      </div>
      <div className="fixed right-4 top-24 z-10 hidden lg:block opacity-60">
        <CrossHairIcon />
      </div>

      {/* ─── Hero Statement ────────────────────────────────────── */}
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="max-w-5xl">
          <h1 className="font-ntype82 text-3xl md:text-4xl xl:text-5xl lg:text-[52px] font-normal leading-[1.12] tracking-[-0.02em] text-black">
            <span className="inline-block size-3.5 sm:size-4 md:size-5 bg-[#C6102E] animate-pulse mr-3 sm:mr-4 mb-3 align-baseline translate-y-[-2px]" />
            Nothing builds smartphones, audio products and AI tools that look good and make life easier. With a global community of over six million, we&apos;re creating the most loved tech brand for the next generation of creatives.
          </h1>
        </div>
      </div>

      {/* ─── Section ( 1 ) : Rebelling against status quo ─────── */}
      <section className=" py-16 md:py-24">
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Image with NOTHING (R) */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-black/5 shadow-sm -rotate-2 sm:-rotate-3 origin-bottom-left transition-transform duration-300">
                <Image
                  src="https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3CRbwjmTwiN7lhrkuDS1BCJYyUp/screenshot-2026-04-16-at-15-51-07.png"
                  alt="Nothing Community & Products"
                  fill
                  className="object-cover"
                  priority
                  unoptimized
                />
                <span className="absolute bottom-6 left-6 z-10 font-ndot text-3xl sm:text-4xl text-white mix-blend-exclusion tracking-wider">
                  NOTHING (R)
                </span>
                <div className="absolute right-5 top-5 size-3 rounded-full bg-[#FFC700]" />
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 lg:pl-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 max-w-xl lg:px-0 px-5">
                <div className="sm:col-span-2">
                  <p className="font-ndot text-sm uppercase text-black">( 1 )</p>
                </div>
                <div className="sm:col-span-10">
                  <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight text-black mb-6">
                    Rebelling against the status quo.
                  </h2>
                  <div className="space-y-5 text-lg sm:text-xl text-black">
                    <p>
                      There was a time when tech was exciting. We looked at machines in bright colours and saw a future of new connections and new ways of engaging with the world. But everything is the same now. We&apos;re bored.
                    </p>
                    <p>
                      We&apos;re making tech fun. This means creating bold, beautiful and unusual designs for products and software that aid creativity, not distract you. It means imagining a different, better future for humanity. Rebelling against the status quo.
                    </p>
                    <div className="pt-2 space-y-3">
                      <p className="font-normal text-black">This means we:</p>
                      <ul className="space-y-3 pl-1 text-base sm:text-lg md:text-[19px]">
                        <li className="flex items-center gap-3">
                          <span className="size-2.5 bg-black shrink-0" />
                          <span>Work with the disruptors and outsiders</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="size-2.5 bg-black shrink-0" />
                          <span>Let our fans shape how we design</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="size-2.5 bg-black shrink-0" />
                          <span>Do the fun stuff big tech can&apos;t</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section ( 2 ) : Life without distraction & Video ──── */}
      <section className="py-16 md:py-24">
        <div className="px-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left text & stats */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 max-w-lg">
                <div className="sm:col-span-2">
                  <p className="font-ndot text-sm uppercase text-black">( 2 )</p>
                </div>
                <div className="sm:col-span-10">
                  <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight text-black mb-6">
                    Life without distraction.
                  </h2>
                  <div className="space-y-5 text-lg sm:text-xl text-black">
                    <p>
                      Our devices are where your life plays out. They house your memories, frame your relationships and open a gateway to experiencing the world.
                    </p>
                    <p>
                      Nothing OS and Essential AI tools are the beginning of a future where you can create freely and engage in the moment. Every interaction, from unlocking your screen to dismissing a notification, carries our design intent and our commitment to quiet the noise.
                    </p>
                  </div>

                  {/* Stats badges */}
                  <div className="mt-10 flex flex-row items-center gap-4 sm:gap-5">
                    <div className="relative  bg-black/[0.03] backdrop-blur-sm rounded-md p-5 sm:p-6 w-full max-w-[180px] aspect-square flex flex-col items-center justify-center text-center">
                      <div className="text-4xl sm:text-5xl font-normal text-black leading-none">30+</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.14em] text-black/70 font-mono">
                        Product releases
                      </div>
                      <div className="absolute -left-1.5 -top-1.5 z-10">
                        <CrossHairIcon />
                      </div>
                    </div>

                    <div className="relative  bg-black/[0.03] backdrop-blur-sm rounded-md p-5 sm:p-6 w-full max-w-[180px] aspect-square flex flex-col items-center justify-center text-center">
                      <div className="text-4xl sm:text-5xl font-normal text-black leading-none">60+</div>
                      <div className="mt-2 text-xs uppercase tracking-[0.14em] text-black/70 font-mono">
                        Countries
                      </div>
                      <div className="absolute -right-1.5 -bottom-1.5 z-10">
                        <CrossHairIcon />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Video and Event Image */}
            <div className="lg:col-span-6 relative pt-4">
              {/* Event Image (Overlapping video, tilted towards bottom right, shifted 15% right, slightly smaller) */}
              <div className="relative w-[90%] sm:w-[92%] aspect-[16/10] rounded-lg overflow-hidden bg-black/5 shadow-xl rotate-2 sm:rotate-3 origin-bottom-right -mb-10 sm:-mb-14 z-10 translate-x-[12%] sm:translate-x-[15%] transition-transform duration-300">
                <Image
                  src="https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DM7AnzTCPuvZTGKLSNVki9Ab0e/brand-event-nothing-magazine.jpg"
                  alt="Nothing Brand Event"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute left-4 top-4 size-3 rounded-full bg-[#FFC700]" />
              </div>

              {/* Video Player */}
              <div className="relative w-full aspect-video overflow-hidden rounded-lg bg-black shadow-lg">
                <video
                  src="https://apicdn.sanity.io/v2025-03-24/media-libraries/mlnZYCoN2JXF/video/3DOGjIec5wNUdLLBXT4lNkuCfpM/renditions/480p.mp4"
                  className="w-full h-full object-cover block rounded-lg"
                  muted
                  autoPlay
                  loop
                  playsInline
                />
                <div className="absolute bottom-3 right-3 mix-blend-exclusion">
                  <BarcodePattern />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Section ( 3 ) : Different by design & Gallery ─────── */}
      <section className="border-t border-black/10 py-16 md:py-24">
        <div className="px-5 ">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 max-w-xl lg:px-0 px-5">
                <div className="sm:col-span-2">
                  <p className="font-ndot text-sm uppercase text-black">( 3 )</p>
                </div>
                <div className="sm:col-span-10">
                  <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight text-black mb-6">
                    Different by design
                  </h2>
                  <div className="space-y-5 text-lg sm:text-xl text-black">
                    <p>
                      Using the best of global engineering and supply-chain production, we design hardware that excites us.
                    </p>
                    <p>
                      Our design language is transparent in appearance and ethos. Revealing what is beneath the surface, showing the decisions behind the engineering and making space for the human experience our products are made to enhance.
                    </p>
                    <p>
                      Drawing inspiration from culture and creating connections to music, fashion, art, film, architecture and design, our references span 90s rave culture, aerospace materials and what matters to our community today.
                    </p>
                    <p className="font-mono text-xs sm:text-sm uppercase tracking-wider text-black pt-2">
                      &lsquo;A breath of fresh air&rsquo; &mdash; Wired magazine
                    </p>
                  </div>

                  {/* Awards badges */}
                  <div className="mt-8 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
                    {AWARDS.map((award) => (
                      <div key={award.name} className="h-7 sm:h-8 relative w-auto flex items-center opacity-80 hover:opacity-100 transition-opacity">
                        <Image
                          src={award.src}
                          alt={award.name}
                          width={120}
                          height={32}
                          className="h-7 sm:h-8 w-auto object-contain"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Product Gallery Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-4 scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {PRODUCTS.map((prod) => (
              <div
                key={prod.name}
                className="flex-none w-[400px] sm:w-[560px] md:w-[700px] lg:w-[840px] xl:w-[940px] rounded-lg overflow-hidden bg-white shadow-sm group"
                style={{ scrollSnapAlign: "start" }}
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/5">
                  <Image
                    src={prod.src}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section ( 4 ) : Co-created with community & Stores ─── */}
      <section className="py-16 md:py-24">
        <div className="px-7">
          <div className="max-w-4xl mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 max-w-xl lg:px-0 px-5">
              <div className="sm:col-span-2">
                <p className="font-ndot text-sm uppercase text-black">( 4 )</p>
              </div>
              <div className="sm:col-span-10">
                <h2 className="text-2xl sm:text-3xl md:text-[34px] font-normal leading-tight text-black mb-6">
                  Co-created with community
                </h2>
                <div className="space-y-5 text-lg sm:text-xl text-black">
                  <p>
                    Since day one, our Nothing Community have been influencing our product development and shaping how we show up in the world.
                  </p>
                  <p>
                    Our flagship stores realise this creativity and connection in a physical space. Fusing our mechanical codes with local culture, we bring together creators, tastemakers and fans with limited-edition drops, launches and parties.
                  </p>
                  <p>
                    Together, we&apos;re reimagining the future of technology.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stores Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Soho Store */}
            <div className="overflow-hidden ">
              <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden mb-5 bg-black/5">
                <Image
                  src="https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DJK1BjohsqUOPCrFQLVDAAvvLx/soho-store.jpg"
                  alt="Nothing Store Soho London"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-black mb-2">
                Nothing Store Soho
              </h3>
              <p className="text-sm sm:text-base text-black/70 mb-2">
                4 Peter Street, Soho, London W1F 0AD, United Kingdom
              </p>
              <a
                href="https://maps.app.goo.gl/2zyjKAQHGHhFNiuE7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base underline text-black underline-offset-4 hover:opacity-75 transition-opacity"
              >
                <span>Go to store</span>
              </a>
            </div>

            {/* Bengaluru Store */}
            <div className="overflow-hidden ">
              <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden mb-5 bg-black/5">
                <Image
                  src="https://cdn.sanity.io/media-libraries/mlnZYCoN2JXF/images/containers/3DM4iyrqBcl5dl6OoIBDNsIxXUH/india-store.jpg"
                  alt="Nothing Store Bengaluru"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
              <h3 className="text-xl sm:text-2xl font-normal text-black mb-2">
                Nothing Store Bengaluru
              </h3>
              <p className="text-sm sm:text-base text-black/70 mb-2">
                100 Feet Road, 1st Stage, Indiranagar, Bengaluru 560038, India
              </p>
              <a
                href="https://maps.app.goo.gl/nkpe5RwBgXrr3PYQ8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-base underline text-black underline-offset-4 hover:opacity-75 transition-opacity"
              >
                <span>Go to store</span>
              </a>
            </div>
          </div>
        </div >
      </section >

      {/* ─── Pakistan SECP Company Verification Section ────────── */}
      < section className="border-t border-black/10 py-16 md:py-20 bg-white" >
        <div className="px-5 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50 mb-2">
                Pakistan Storefront &amp; Registration
              </p>
              <h2 className="text-2xl sm:text-3xl font-normal text-black mb-4">
                NOTHING OFFICIAL (SMC-PRIVATE) LIMITED
              </h2>
              <p className="text-base text-black/70 max-w-2xl leading-relaxed">
                Operating the verified storefront for Nothing and CMF in Pakistan under SECP CUIN: 0337422. We publish legal company details, certificate verification, warranty, and WhatsApp customer support openly for transparency.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <Link
                  href="/company-verification"
                  className="inline-flex h-11 items-center justify-center rounded-md bg-black px-6 text-xs uppercase tracking-[0.18em] font-mono text-white transition-opacity hover:opacity-85"
                >
                  View SECP Certificate
                </Link>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\+/g, "").replace(/\s/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-black/20 px-6 text-xs uppercase tracking-[0.18em] font-mono text-black transition-colors hover:bg-black hover:text-white"
                >
                  WhatsApp: {WHATSAPP_NUMBER}
                </a>

              </div>
            </div>

            <div className="lg:col-span-4 rounded-lg border border-black/10 bg-[#F5F5F5] p-6 text-left">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-black/50">
                Registered Authority
              </p>
              <p className="mt-2 text-sm font-semibold text-black">
                Securities and Exchange Commission of Pakistan
              </p>
              <p className="mt-1 text-xs text-black/60">CUIN: 0337422</p>
              <p className="mt-1 text-xs text-black/60">Incorporation Date: 16 May 2026</p>
              <p className="mt-3 text-xs text-black/50">
                Official Pakistani Business Identity
              </p>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}

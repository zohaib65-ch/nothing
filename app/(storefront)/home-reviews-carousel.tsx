"use client";

import * as React from "react";

interface ReviewData {
  name: string;
  city: string;
  product: string;
  rating: number;
  date: string;
  comment: string;
}

interface HomeReviewsCarouselProps {
  reviews: ReviewData[];
}

export function HomeReviewsCarousel({ reviews }: HomeReviewsCarouselProps) {
  const reviewsRef = React.useRef<HTMLDivElement>(null);
  const [currentReviewIndex, setCurrentReviewIndex] = React.useState(0);
  const autoSlideRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  const CARD_WIDTH = () => (reviewsRef.current ? reviewsRef.current.clientWidth / 4 : 260);

  const scrollToReview = React.useCallback((index: number) => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollTo({ left: index * CARD_WIDTH(), behavior: "smooth" });
    }
    setCurrentReviewIndex(index);
  }, []);

  const scrollReviews = (dir: "left" | "right") => {
    const next =
      dir === "right"
        ? (currentReviewIndex + 1) % reviews.length
        : (currentReviewIndex - 1 + reviews.length) % reviews.length;
    scrollToReview(next);
  };

  React.useEffect(() => {
    autoSlideRef.current = setInterval(() => {
      setCurrentReviewIndex((prev) => {
        const next = (prev + 1) % reviews.length;
        if (reviewsRef.current) {
          reviewsRef.current.scrollTo({ left: next * CARD_WIDTH(), behavior: "smooth" });
        }
        return next;
      });
    }, 2000);
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, [reviews.length]);

  return (
    <section className="border-b border-black/10 px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/42"> Reviews </p>
            <h2 className="collection-product-name mt-3 text-4xl leading-none text-black sm:text-5xl"> What Verified Buyers Say </h2>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              onClick={() => scrollReviews("left")}
              aria-label="Scroll left"
              className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {" "}
                <path d="m14 6-6 6 6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollReviews("right")}
              aria-label="Scroll right"
              className="inline-flex h-11 w-11 items-center justify-center border border-black/10 bg-white text-black shadow-[0_14px_30px_rgba(17,17,17,0.08)] transition hover:bg-black hover:text-white"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                {" "}
                <path d="m10 6 6 6-6 6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />{" "}
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={reviewsRef}
          className="mt-8 flex gap-5 overflow-x-hidden pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => {
            if (autoSlideRef.current) clearInterval(autoSlideRef.current);
          }}
          onMouseLeave={() => {
            autoSlideRef.current = setInterval(() => {
              setCurrentReviewIndex((prev) => {
                const next = (prev + 1) % reviews.length;
                if (reviewsRef.current) reviewsRef.current.scrollTo({ left: next * CARD_WIDTH(), behavior: "smooth" });
                return next;
              });
            }, 2000);
          }}
        >
          {reviews.map((r, idx) => (
            <article key={idx} className="w-[calc(25%-15px)] shrink-0 snap-start rounded-[8px] border border-black/8 bg-white p-4">
              {/* Comment */}
              <p className="text-[13px] leading-snug text-black/70 line-clamp-2">&quot;{r.comment}&quot;</p>

              {/* Footer: Name/Product (left) | Stars + Date (right) */}
              <div className="mt-5 flex items-end justify-between border-t border-black/8 pt-4">
                <div>
                  <p className="text-[13px] text-black">{r.name}</p>
                  <p className="mt-0.5 text-[10px] tracking-[0.08em] text-black/50">
                    {r.city} • {r.product}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((starIndex) => {
                      const isFull = r.rating >= starIndex;
                      const isHalf = !isFull && r.rating >= starIndex - 0.5;
                      return (
                        <div key={starIndex} className="relative inline-block w-3 h-3">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-neutral-300" aria-hidden="true">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          {(isFull || isHalf) && (
                            <div className="absolute top-0 left-0 overflow-hidden text-amber-500" style={{ width: isFull ? "100%" : "50%" }}>
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                              </svg>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {/* Date */}
                  <span className="text-[9px] tracking-[0.08em] text-black/40">{r.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef } from "react";

export function useRevealOnScroll(selector = "[data-reveal]") {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        container.querySelectorAll(selector).forEach((el, i) => {
          el.style.animationDelay = `${i * 100}ms`;
          el.classList.add("reveal-visible");
        });

        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [selector]);

  return ref;
}
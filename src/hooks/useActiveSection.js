import { useEffect, useState } from "react";
export default function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const sections = [...document.querySelectorAll("main > section[id]")];
        const current = sections
          .filter((section) => section.getBoundingClientRect().top <= 150)
          .at(-1);
        setActive(
          window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 5
            ? "contact"
            : current?.id || "home",
        );
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return active;
}

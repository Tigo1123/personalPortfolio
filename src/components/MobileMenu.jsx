import { navigation } from "../data/profile";
export default function MobileMenu({ open, active, onClose }) {
  return (
    <nav
      id="mobile-navigation"
      className={`mobile-menu ${open ? "is-open" : ""}`}
      aria-label="Mobile"
      inert={!open}
      aria-hidden={!open}
    >
      {navigation.map((label) => (
        <a
          key={label}
          href={`#${label.toLowerCase()}`}
          aria-current={active === label.toLowerCase() ? "location" : undefined}
          onClick={onClose}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}

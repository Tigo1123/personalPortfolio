import { socialLinks } from "../data/profile";
import Icon from "./Icon";
export default function SocialLinks() {
  return (
    <div className="social-links">
      {socialLinks.map(({ label, href }) => (
        <a
          key={label}
          href={href}
          target={/^https?:\/\//.test(href) ? "_blank" : undefined}
          rel={/^https?:\/\//.test(href) ? "noopener noreferrer" : undefined}
        >
          {label}
          <Icon name="external" width="15" height="15" />
        </a>
      ))}
    </div>
  );
}

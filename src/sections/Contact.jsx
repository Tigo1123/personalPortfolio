import SocialLinks from "../components/SocialLinks";
import Icon from "../components/Icon";
export default function Contact() {
  return (
    <section className="section contact" id="contact" tabIndex="-1" data-reveal>
      <div className="container">
        <p className="eyebrow">06 / Get in touch</p>
        <h2>
          Let’s build something
          <br />
          meaningful<span>.</span>
        </h2>
        <p>
          I’m open to internships, junior developer opportunities, freelance
          projects, and collaboration. Have an idea or an opportunity? I’d love
          to hear from you.
        </p>
        <a className="contact-email" href="mailto:al.taj.gsm@gmail.com">
          al.taj.gsm@gmail.com
          <Icon name="arrow" />
        </a>
        <SocialLinks />
      </div>
    </section>
  );
}

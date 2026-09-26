import React from "react";
import Icon from "../components/Icon";

const emailAddress = "al.taj.gsm@gmail.com";

function handleSubmit(event) {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();
  const subject = encodeURIComponent(`Portfolio message from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
}

export default function Contact() {
  return <section className="section contact-section" id="contact">
    <a className="contact-brand-pill reveal" href="#home" aria-label="Tageldin Gasmalla, back to home">
      <img src="/assets/profile/tageldin-gasmalla.webp" alt="" loading="lazy" />
      <span className="contact-brand-pill__name">TAGELDIN GASMALLA</span>
      <span className="contact-brand-pill__role">FULL STACK DEVELOPER</span>
    </a>

    <div className="contact-card">
      <div className="contact-card__copy reveal">
        <span className="contact-eyebrow"><i /> A NOTE TO THE FUTURE</span>
        <h2>Let’s <em>Build.</em></h2>
        <p className="contact-description">Have a project in mind? Send me a note and let’s build something useful together.</p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="contact-field">
            <label htmlFor="contact-name">Name</label>
            <input id="contact-name" name="name" type="text" autoComplete="name" placeholder="Your name" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-email">Email</label>
            <input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </div>
          <div className="contact-field">
            <label htmlFor="contact-message">Message</label>
            <textarea id="contact-message" name="message" rows="4" placeholder="A little about what you have in mind…" required />
          </div>
          <button className="button button--lime contact-send" type="submit">Send Message <Icon name="arrow" size={16}/></button>
          <p className="contact-form-note">Opens your email app with a prefilled draft. This form doesn’t send messages to a server.</p>
        </form>
      </div>

      <div className="contact-photo-panel reveal">
        <img src="/assets/profile/tageldin-contact.webp" alt="Tageldin Gasmalla in a warm studio portrait" loading="lazy" decoding="async" />
        <span className="contact-photo-caption"><span>TAGELDIN GASMALLA</span><i>FULL STACK DEVELOPER</i></span>
      </div>
    </div>

    <div className="contact-links reveal" aria-label="Contact and social links">
      <a className="contact-links__email" href={`mailto:${emailAddress}`}><Icon name="mail"/> {emailAddress}</a>
      <span className="contact-links__socials">
        <a href="https://github.com/Tigo1123" target="_blank" rel="noreferrer"><Icon name="github"/> GitHub <Icon name="arrow" size={13}/></a>
        <a href="https://www.linkedin.com/in/tageldin-gasmalla-6685a2202/" target="_blank" rel="noreferrer"><Icon name="linkedin"/> LinkedIn <Icon name="arrow" size={13}/></a>
      </span>
    </div>
  </section>;
}

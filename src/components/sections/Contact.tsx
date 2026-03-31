import { FaInstagram, FaFacebook } from "react-icons/fa";
import { Mail } from "lucide-react";

const contact = {
  instagram: { handle: "@sidetrack.sounds", url: "https://www.instagram.com/sidetrack.sounds/" },
  facebook:  { handle: "Sidetrack", url: "https://www.facebook.com/people/sidetracksounds/61579899760309/" },
  email:     { display: "sidetrack.roermond@gmail.com", url: "mailto:sidetrack.roermond@gmail.com" },
};

export default function Contact() {
  return (
    <section id="contact" className="bg-elevated py-24 px-4">
      <div className="max-w-5xl mx-auto">

        <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
          Contact
        </h2>
        <p className="text-fg-subtle mb-12">Neem contact op voor boekingen of vragen.</p>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
          <a
            href={contact.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-fg-muted hover:text-fg transition-colors"
          >
            <FaInstagram className="w-5 h-5 text-accent shrink-0" />
            <span className="font-medium">{contact.instagram.handle}</span>
          </a>

          <a
            href={contact.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 text-fg-muted hover:text-fg transition-colors"
          >
            <FaFacebook className="w-5 h-5 text-accent shrink-0" />
            <span className="font-medium">{contact.facebook.handle}</span>
          </a>

          <a
            href={contact.email.url}
            className="flex items-center gap-4 text-fg-muted hover:text-fg transition-colors"
          >
            <Mail className="w-5 h-5 text-accent shrink-0" />
            <span className="font-medium">{contact.email.display}</span>
          </a>
        </div>

      </div>
    </section>
  );
}

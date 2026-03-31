'use client';

import { FaInstagram, FaFacebook } from "react-icons/fa";
import Script from "next/script";

// How to get the URL for a post:
//   Instagram: open the post → tap ••• → Copy link  (looks like instagram.com/p/ABC123/)
//   Facebook:  open the post → tap ••• → Copy link  (looks like facebook.com/permalink.php?...)
// Just paste the URL as the `url` value below.
const posts: { platform: "instagram" | "facebook"; url: string }[] = [
  { platform: "instagram", url: "https://www.instagram.com/p/DWOgqipCKqi/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { platform: "instagram", url: "https://www.instagram.com/p/DRDCA-TCHcN/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { platform: "instagram", url: "https://www.instagram.com/p/DVqJ3ZSiMTA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
  { platform: "instagram", url: "https://www.instagram.com/p/DQfRR68iJCk/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
];

const socialLinks = [
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/sidetrack.sounds/" },
  { label: "Facebook",  icon: FaFacebook,  href: "https://www.facebook.com/people/sidetracksounds/61579899760309/" },
];

export default function SocialFeed() {
  return (
    <>
      {/* Instagram embed script — processes all instagram-media blockquotes */}
      <Script
        src="https://www.instagram.com/embed.js"
        strategy="lazyOnload"
        onLoad={() => (window as any).instgrm?.Embeds.process()}
      />

      {/* Facebook SDK — processes all fb-post divs */}
      <div id="fb-root" />
      <Script
        src="https://connect.facebook.net/nl_NL/sdk.js#xfbml=1&version=v18.0"
        strategy="lazyOnload"
      />

      <section id="socials" className="bg-base py-24 px-4">
        <div className="max-w-5xl mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-black tracking-widest uppercase text-fg mb-2">
                Volg ons
              </h2>
              <p className="text-fg-subtle">Blijf op de hoogte via social media.</p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-fg-muted hover:text-fg transition-colors"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {posts.map((post, i) => (
              <div key={i} className="break-inside-avoid">
                {post.platform === "instagram" ? (
                  <blockquote
                    className="instagram-media"
                    data-instgrm-permalink={post.url}
                    data-instgrm-version="14"
                    style={{ minWidth: "100%", margin: 0 }}
                  />
                ) : (
                  <div
                    className="fb-post"
                    data-href={post.url}
                    data-width="100%"
                  />
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

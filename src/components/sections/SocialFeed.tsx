// TODO: replace placeholder tiles with real social embeds or fetched posts
// Options:
//   - Instagram: embed individual posts via blockquote + script, or use a widget
//   - Facebook: Facebook Page Plugin embed
//   - For dynamic feeds: fetch via Meta Graph API and render server-side
//   - Simplest static approach: screenshot/export posts as images and use <Image>

const placeholderPosts = [
  { id: 1, platform: "Instagram", date: "28 mrt 2026" },
  { id: 2, platform: "Instagram", date: "20 mrt 2026" },
  { id: 3, platform: "Instagram", date: "14 mrt 2026" },
  { id: 4, platform: "Facebook",  date: "10 mrt 2026" },
  { id: 5, platform: "Instagram", date: "03 mrt 2026" },
  { id: 6, platform: "Instagram", date: "25 feb 2026" },
];

// TODO: add real social profile URLs
const socialLinks = [
  { label: "Instagram",  href: "https://www.instagram.com/sidetrack.sounds/" },
];

export default function SocialFeed() {
  return (
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
                className="text-xs font-bold tracking-widest uppercase text-fg-muted hover:text-fg transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Grid — 3 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {placeholderPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square bg-subtle rounded overflow-hidden flex flex-col items-center justify-center gap-1"
            >
              {/* TODO: replace with real embed or <Image> */}
              <span className="text-fg-subtle text-xs tracking-widest uppercase">
                {post.platform}
              </span>
              <span className="text-fg-faint text-xs">{post.date}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

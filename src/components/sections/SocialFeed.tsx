import Image from "next/image";
import { FaInstagram, FaFacebook } from "react-icons/fa";

const BEHOLD_FEED_URL = "https://feeds.behold.so/zy3SgJiQUSRkFPK809Po";
const POSTS_TO_SHOW = 6;

type BeholdPost = {
  id: string;
  permalink: string;
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  prunedCaption: string;
  timestamp: string;
  sizes: {
    small:  { mediaUrl: string; width: number; height: number };
    medium: { mediaUrl: string; width: number; height: number };
  };
  missingVideoThumbnail: boolean;
  children?: BeholdPost[];
};

type BeholdFeed = {
  username: string;
  posts: BeholdPost[];
};

const socialLinks = [
  { label: "Instagram", icon: FaInstagram, href: "https://www.instagram.com/sidetrack.sounds/" },
  { label: "Facebook",  icon: FaFacebook,  href: "https://www.facebook.com/people/sidetracksounds/61579899760309/" },
];

async function getFeed(): Promise<{ posts: BeholdPost[]; username: string }> {
  try {
    const res = await fetch(BEHOLD_FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) return { posts: [], username: "sidetrack.sounds" };
    const data: BeholdFeed = await res.json();
    return { posts: data.posts.slice(0, POSTS_TO_SHOW), username: data.username };
  } catch {
    return { posts: [], username: "sidetrack.sounds" };
  }
}

function getImageUrl(post: BeholdPost): string | null {
  if (post.mediaType === "CAROUSEL_ALBUM" && post.children?.[0]) {
    return post.children[0].sizes.medium?.mediaUrl ?? post.children[0].sizes.small?.mediaUrl ?? null;
  }
  if (post.mediaType === "VIDEO" && post.missingVideoThumbnail) return null;
  return post.sizes.medium?.mediaUrl ?? post.sizes.small?.mediaUrl ?? null;
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 60)   return `${m}m geleden`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}u geleden`;
  const d = Math.floor(h / 24);
  if (d < 7)    return `${d}d geleden`;
  const w = Math.floor(d / 7);
  if (w < 5)    return `${w}w geleden`;
  const mo = Math.floor(d / 30);
  if (mo < 12)  return `${mo}mnd geleden`;
  return `${Math.floor(mo / 12)}j geleden`;
}

export default async function SocialFeed() {
  const { posts, username } = await getFeed();

  return (
    <section id="socials" className="bg-base py-24 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
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

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((post) => {
                const imgUrl = getImageUrl(post);
                if (!imgUrl) return null;
                return (
                  <article key={post.id} className="bg-elevated border border-edge flex flex-col">

                    {/* Card header */}
                    <div className="flex items-center gap-3 px-3 py-2.5 border-b border-edge">
                      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                        <FaInstagram className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-fg truncate">{username}</p>
                      </div>
                      <span className="text-xs text-fg-subtle shrink-0">
                        {relativeTime(post.timestamp)}
                      </span>
                    </div>

                    {/* Image */}
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square block bg-subtle overflow-hidden group"
                    >
                      <Image
                        src={imgUrl}
                        alt={post.prunedCaption?.slice(0, 100) || "Instagram post"}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      {post.mediaType === "VIDEO" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[13px] border-l-white ml-1" />
                          </div>
                        </div>
                      )}
                      {post.mediaType === "CAROUSEL_ALBUM" && (
                        <div className="absolute top-2 right-2">
                          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6zm16.5 1.5A1.5 1.5 0 0 1 20 9v9a2 2 0 0 1-2 2H9a1.5 1.5 0 0 1 0-3h9V9a1.5 1.5 0 0 1 1.5-1.5z"/>
                          </svg>
                        </div>
                      )}
                    </a>

                    {/* Caption */}
                    {post.prunedCaption && (
                      <div className="px-3 py-2.5 flex-1">
                        <p className="text-xs text-fg-muted leading-relaxed line-clamp-3">
                          <span className="font-bold text-fg">{username} </span>
                          {post.prunedCaption}
                        </p>
                      </div>
                    )}

                    {/* Footer */}
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-3 py-2.5 border-t border-edge text-xs text-fg-subtle hover:text-fg transition-colors group"
                    >
                      <span className="tracking-wide">Bekijk op Instagram</span>
                      <FaInstagram className="w-3.5 h-3.5 group-hover:text-accent transition-colors" />
                    </a>

                  </article>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <a
                href="https://www.instagram.com/sidetrack.sounds/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-fg-muted hover:text-fg border border-edge-mid hover:border-edge-soft px-6 py-3 transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
                Meer zien op Instagram
              </a>
            </div>
          </>
        ) : (
          <p className="text-fg-subtle text-sm">Geen posts beschikbaar.</p>
        )}

      </div>
    </section>
  );
}

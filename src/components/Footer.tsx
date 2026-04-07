import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base border-t border-edge">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <p className="text-sm text-fg-subtle">
          &copy; {new Date().getFullYear()} Sidetrack. Alle rechten voorbehouden.
        </p>
        <Link href="/privacy" className="text-sm text-fg-subtle hover:text-fg transition-colors">
          Privacyverklaring
        </Link>
      </div>
    </footer>
  );
}

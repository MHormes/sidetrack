export default function Footer() {
  return (
    <footer className="bg-base border-t border-edge">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center">
        <p className="text-sm text-fg-subtle">
          &copy; {new Date().getFullYear()} Sidetrack. Alle rechten voorbehouden.
        </p>
      </div>
    </footer>
  );
}

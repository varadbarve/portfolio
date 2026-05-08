export default function Footer() {
  return (
    <footer className="backdrop-blur-sm font-mono-label text-mono-label full-width border-t border-white/10 flat no shadows w-full py-xl px-gutter flex flex-col md:flex-row justify-between items-center max-w-[1440px] mx-auto mt-auto bg-surface-container-lowest/20 dark:bg-surface-container-lowest/20">
      <div className="font-mono-label text-mono-label text-on-surface mb-md md:mb-0">
        © 2025 Varad Barve. Built with Precision.
      </div>
      <div className="flex gap-lg">
        <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">GitHub</a>
        <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">LinkedIn</a>
        <a className="text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors" href="#">Email</a>
      </div>
    </footer>
  );
}

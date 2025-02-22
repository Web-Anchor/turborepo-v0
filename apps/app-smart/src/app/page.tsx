import Link from 'components/Wrappers/Link';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
        <Link className="text-3xl font-semibold text-center" href="/dashboard">
          Dashboard
        </Link>
        <Link className="text-3xl font-semibold text-center" href="/dashboard">
          Stock Manager
        </Link>
      </header>
    </div>
  );
}

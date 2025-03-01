import Link from 'components/Wrappers/Link';
import { Header } from '@repo/ui/headers';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header className="grid grid-cols-[1fr_auto_1fr] items-center gap-8">
        <Link className="text-3xl font-semibold text-center" href="/dashboard">
          Dashboard
        </Link>
        <Link className="text-3xl font-semibold text-center" href="/sign-in">
          Sign In
        </Link>
      </header>
      <Header
        title="Welcome to the Smart App"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
          'This is a description',
        ]}
      />
    </div>
  );
}

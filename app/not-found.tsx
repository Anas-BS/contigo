import Link from 'next/link';
import Logo from '@/components/Logo';
import { buttonStyles } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="mx-auto w-full max-w-page px-5 py-5 md:px-8">
        <Logo href="/" />
      </header>
      <main id="main" className="mx-auto flex w-full max-w-page flex-1 items-center px-5 pb-24 md:px-8">
        <div className="grid w-full gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <p className="num font-display text-[5rem] leading-none text-ember-600 md:text-[8rem]" aria-hidden="true">404</p>
          <div className="max-w-prose md:border-l md:border-line md:pl-12">
            <p className="label">Page not found</p>
            <h1 className="mt-2 font-display text-[2.25rem] leading-[2.75rem] text-ink">This page is not part of the course.</h1>
            <p className="mt-3 text-[15px] leading-6 text-ink-600">
              The address may be mistyped, or the page may have moved. Start again from the home page or sign in to your workspace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/" className={buttonStyles({})}>Go to the home page</Link>
              <Link href="/login" className={buttonStyles({ variant: 'secondary' })}>Sign in</Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { PageTitle, Paragraph } from '@repo/ui/document';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());
      console.log(data);

      await axios.post('/api/v1/auth/login', {
        email: data.email,
        password: data.password,
      });
      toast.success('You have successfully logged in.');
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>User Logon Page</PageTitle>
      <form onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">Profile</h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-white"
                >
                  Username
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white/5 pl-3 outline outline-1 -outline-offset-1 outline-white/10 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                    <div className="shrink-0 select-none text-base text-gray-500 sm:text-sm/6">
                      username/email
                    </div>
                    <input
                      name="username"
                      type="text"
                      placeholder="john@smart.com"
                      className="block min-w-0 grow bg-transparent py-1.5 pl-1 pr-3 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm/6 font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            LinkComponent={Link}
            href="/"
          >
            Cancel
          </Button>
          <Button type="submit" variant="secondary">
            Login
          </Button>
        </div>
      </form>
      <Paragraph>
        *This is a logon page for the user to enter their username and password.
      </Paragraph>
    </section>
  );
}

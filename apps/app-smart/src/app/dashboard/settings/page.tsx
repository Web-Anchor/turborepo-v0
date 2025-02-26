'use client';

import { PageTitle, Paragraph } from '@repo/ui/document';
import { useAuth } from '@clerk/nextjs';
import { Button } from '@repo/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function Page() {
  const router = useRouter();
  const { signOut } = useAuth();

  async function signout(): Promise<void> {
    try {
      await signOut();
      router.push('/');
      toast.success('You have successfully signed out.');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <PageTitle text="Settings" />
      <Button onClick={signout} className="w-fit" variant="secondary">
        Sign Out
      </Button>

      <Paragraph text="Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in." />
    </div>
  );
}

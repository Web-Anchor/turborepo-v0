'use client';

import { SignIn, useAuth } from '@clerk/nextjs';
import { PageTitle, Paragraph } from '@repo/ui/document';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/button';
import { ClerkCard } from '@repo/ui/placeholders';

export default function Page() {
  const { isLoaded } = useAuth();

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>User Logon Page</PageTitle>
      <section className="flex flex-col items-center justify-center space-y-12">
        {isLoaded && <SignIn />}
        {!isLoaded && <ClerkCard />}
      </section>
      <Button type="button" variant="secondary" LinkComponent={Link} href="/">
        Back to Home
      </Button>

      <Paragraph>
        Excepteur tempor minim laborum qui veniam nostrud ex. Tempor consequat
        aliqua velit nostrud incididunt. Consectetur minim et proident irure
        amet Lorem eu laborum velit aliquip velit aliquip. Aute veniam fugiat
        dolor laboris consectetur aliquip ea tempor ea aliqua magna ea veniam.
        Magna quis eu aute Lorem sunt id. Ipsum commodo dolor dolore pariatur
        exercitation magna veniam anim. Consequat commodo sint adipisicing
        veniam est ipsum esse voluptate. Dolor labore sint dolor Lorem minim
        aute id consectetur culpa. Culpa id eiusmod cupidatat amet excepteur
        laborum et aliqua id labore occaecat ut mollit. Magna non Lorem dolor
        anim esse officia culpa exercitation elit nulla nostrud tempor. Est
        adipisicing proident reprehenderit aliquip enim veniam sunt aliqua.
        Nostrud do et in qui officia minim qui. Officia non laboris aliqua amet
        occaecat sit eiusmod fugiat esse culpa pariatur voluptate occaecat non.
        Velit nisi est magna exercitation aliqua nisi nisi aliqua.
      </Paragraph>
    </section>
  );
}

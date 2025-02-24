'use client';

import { PageTitle, Paragraph } from '@repo/ui/document';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormWrapper, TextInput } from '@repo/ui/form';

export default function Page() {
  const router = useRouter();

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      console.log(data);
      // Validations
      if (!data.name) {
        throw new Error('Name is required');
      }

      await axios.post('/api/v1/clusters/create', {
        ...data,
      });
      toast.success('You have successfully logged in.');
      // router.push('/dashboard');
    } catch (error) {
      console.error(error);
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>User Logon Page</PageTitle>
      <FormWrapper onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">
              List Groups
            </h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <TextInput name="name" label="Name" placeholder="Enter a name" />
              <TextInput
                name="description"
                label="Description"
                placeholder="Enter a description"
                optional
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            LinkComponent={Link}
            href="/dashboard/clusters"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </FormWrapper>
      <Paragraph>
        *This is a logon page for the user to enter their username and password.
      </Paragraph>
    </section>
  );
}

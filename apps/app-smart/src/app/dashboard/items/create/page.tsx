'use client';

import { PageTitle, Paragraph } from '@repo/ui/document';
import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FormWrapper, SelectInput, TextInput } from '@repo/ui/form';

const STATUS_OPTIONS = [
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
  { label: 'Damaged', value: 'DAMAGED' },
  { label: 'Under Maintenance', value: 'UNDER_MAINTENANCE' },
  { label: 'Discontinued', value: 'DISCONTINUED' },
];

export default function Page() {
  const router = useRouter();

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!data.name) {
        throw new Error('Name is required');
      }

      await axios.post('/api/v1/lists/create', {
        ...data,
      });
      toast.success('Your list has been created.');
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <PageTitle>Create Item</PageTitle>
      <FormWrapper onSubmit={submit}>
        <div className="space-y-12">
          <div className="border-b border-white/10 pb-12">
            <h2 className="text-base/7 font-semibold text-white">
              Item Information
            </h2>
            <p className="mt-1 text-sm/6 text-gray-400">
              Labore ullamco labore commodo commodo sit.
            </p>

            <div className="mt-10 flex flex-col gap-8">
              <TextInput name="name" label="Name" placeholder="Enter a name" />
              <TextInput
                name="description"
                label="Description"
                placeholder="Enter a description"
                optional
              />
              <TextInput
                name="category"
                label="Category"
                placeholder="Enter a category"
                optional
              />
              <TextInput
                name="cost"
                label="Cost"
                placeholder="Enter a cost"
                type="number"
                optional
              />
              <TextInput
                name="quantity"
                label="Quantity"
                placeholder="Enter a quantity"
                type="number"
                optional
              />
              <SelectInput
                name="status"
                optional
                label="Status"
                defaultValue="ACTIVE"
                options={STATUS_OPTIONS}
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
            href="/dashboard/items"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </FormWrapper>
      <Paragraph>
        Elit elit id voluptate consectetur aute ipsum id ipsum dolore est sint.
      </Paragraph>
    </section>
  );
}

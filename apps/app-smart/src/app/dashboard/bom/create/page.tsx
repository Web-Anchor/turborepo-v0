'use client';

import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useRouter } from 'next/navigation';
import {
  FormWrapper,
  SearchInput,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@repo/ui/forms';
import { filterFormObject, objKeysToNumber } from 'lib/utils';
import { mutate } from 'swr';
import { colorsOptions, inventoryStatusOptions } from 'lib/list-options';
import { Header } from '@repo/ui/headers';

export default function Page() {
  const router = useRouter();

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!data.name) {
        throw new Error('Name is required'); // TODO: Add more validation
      }
      const customKeys = ['colour'];
      const attributes = filterFormObject(data, customKeys);
      customKeys.forEach((key) => delete data[key]); // delete custom keys from data
      console.log('data', data);

      await axios.post('/api/v1/boms/create', {
        ...objKeysToNumber(['quantity', 'cost', 'price'], data),
        attributes,
      });
      toast.success('Your item has been created.');
      mutate('/api/v1/products/products');
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-6 py-12 space-y-12">
      <Header
        title="Create BOM"
        subtitle="Add a new BOM item to manage your products"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
          'This is a description',
        ]}
        type="page-header"
      />
      <FormWrapper onSubmit={submit}>
        <div className="space-y-12">
          <div className="mt-10 flex flex-col gap-8">
            <TextInput name="name" label="Name" placeholder="Enter a name" />
            <TextAreaInput
              name="description"
              label="Description"
              placeholder="Enter a description"
              optional
            />
            <SearchInput
              name="sku"
              label="SKU"
              placeholder="Enter a SKU"
              options={[
                { value: 'ABC123', label: 'ABC123' },
                { value: 'DEF456', label: 'DEF456' },
                { value: 'GHI789', label: 'GHI789' },
              ]}
              onChange={(value) => console.log('change value', value)}
              onClick={(value) => console.log('click value', value)}
              optional
            />

            <div className="mx-auto max-w-lg">
              <div>
                <div className="text-center">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                    className="mx-auto size-12 text-gray-400"
                  >
                    <path
                      d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h2 className="mt-2 text-base font-semibold text-gray-900">
                    Add team members
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven’t added any team members to your project yet. As
                    the owner of this project, you can manage team member
                    permissions.
                  </p>
                </div>
                <form action="#" className="mt-6 flex">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter an email"
                    aria-label="Email address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  <button
                    type="submit"
                    className="ml-4 shrink-0 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Send invite
                  </button>
                </form>
              </div>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-500">
                  Team members previously added to projects
                </h3>
                {/* <ul role="list" className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {people.map((person, personIdx) => (
            <li key={personIdx} className="flex items-center justify-between space-x-3 py-4">
              <div className="flex min-w-0 flex-1 items-center space-x-3">
                <div className="shrink-0">
                  <img alt="" src={person.imageUrl} className="size-10 rounded-full" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                  <p className="truncate text-sm font-medium text-gray-500">{person.role}</p>
                </div>
              </div>
              <div className="shrink-0">
                <button
                  type="button"
                  className="inline-flex items-center gap-x-1.5 text-sm/6 font-semibold text-gray-900"
                >
                  <PlusIcon aria-hidden="true" className="size-5 text-gray-400" />
                  Invite <span className="sr-only">{person.name}</span>
                </button>
              </div>
            </li>
          ))}
        </ul> */}
              </div>
            </div>

            <SelectInput
              name="status"
              optional
              label="Status"
              defaultValue="IN_STOCK"
              options={inventoryStatusOptions}
            />
            <SelectInput
              name="colour"
              label="Colour"
              placeholder="Select a colour"
              options={colorsOptions}
              optional
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            LinkComponent={Link}
            href="/dashboard/products"
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create
          </Button>
        </div>
      </FormWrapper>
    </section>
  );
}

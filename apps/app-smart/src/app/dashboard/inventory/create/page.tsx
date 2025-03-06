'use client';

import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useRouter } from 'next/navigation';
import {
  FormWrapper,
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

      await axios.post('/api/v1/inventories/create', {
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
        title="Create Inventory Item"
        subtitle="Add a new inventory item to your store"
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
            <TextInput
              name="batchNumber"
              label="Batch Number"
              placeholder="Enter a batch number"
              optional
            />
            <TextInput
              name="quantity"
              label="Quantity"
              placeholder="Enter a quantity"
              type="number"
              optional
            />
            <TextInput
              name="sku"
              label="SKU"
              placeholder="Enter a SKU"
              optional
            />
            <TextInput
              name="price"
              label="Price"
              placeholder="Enter a price"
              type="number"
              optional
            />
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

import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import {
  FormWrapper,
  SelectInput,
  TextAreaInput,
  TextInput,
} from '@repo/ui/forms';
import { filterFormObject, objKeysToNumber } from 'lib/utils';
import { mutate } from 'swr';
import { colorsOptions, statusListOptions } from 'lib/list-options';
import { useState } from 'react';
import { Header } from '@repo/ui/headings/header';

type ComponentState = {
  fetching?: boolean;
};
type FromTypes = {
  onSuccess?: () => void;
};

export function CreateForm({ ...rest }: FromTypes) {
  const [state, setState] = useState<ComponentState>({});

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!data.name) {
        throw new Error('Name is required'); // TODO: Add more validation
      }
      setState((s) => ({ ...s, fetching: true }));
      const customKeys = ['colour'];
      const attributes = filterFormObject(data, customKeys);
      customKeys.forEach((key) => delete data[key]); // delete custom keys from data

      await axios.post('/api/v1/products/create', {
        ...objKeysToNumber(['quantity', 'cost', 'price', 'reorderLevel'], data),
        attributes,
      });
      toast.success('Your item has been created.');
      mutate('/api/v1/products/products');
      rest.onSuccess?.();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setState((s) => ({ ...s, fetching: false }));
    }
  }

  return (
    <div className="flex flex-col gap-4 px-10 py-12">
      <Header
        title="Create New Product"
        subtitle="Aliquip aliquip non veniam sit reprehenderit cillum proident."
        description={['Anim occaecat adipisicing ipsum magna quis.']}
        type="page-header"
      />
      <FormWrapper onSubmit={submit}>
        <div className="mt-10 flex flex-col gap-8">
          <TextInput name="name" label="Name" placeholder="Enter a name" />
          <TextAreaInput
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
          <TextInput
            name="reorderLevel"
            label="Reorder Level"
            placeholder="Enter a reorder level"
            type="number"
            optional
          />
          <SelectInput
            name="status"
            optional
            label="Status"
            defaultValue="ACTIVE"
            options={statusListOptions}
          />
          <SelectInput
            name="colour"
            label="Colour"
            placeholder="Select a colour"
            options={colorsOptions}
            optional
          />
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            type="button"
            variant="link"
            className="text-sm/6 font-semibold text-white"
            onClick={rest.onSuccess}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={state.fetching}>
            Create
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
}

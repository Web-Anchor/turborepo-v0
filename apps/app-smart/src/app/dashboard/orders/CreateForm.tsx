import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { FormWrapper, SelectInput, TextInput } from '@repo/ui/forms';
import { objKeysToNumber } from 'lib/utils';
import { orderStatusOptions } from 'lib/list-options';
import { useState } from 'react';
import { Header } from '@repo/ui/headings/header';

type ComponentState = {
  fetching?: boolean;
};
type FromTypes = {
  onSuccess?: () => void;
  mutate?: () => void;
};

export function CreateForm({ ...rest }: FromTypes) {
  const [state, setState] = useState<ComponentState>({});

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!data.orderNumber) {
        throw new Error('Order number is required'); // TODO: Add more validation
      }
      setState((s) => ({ ...s, fetching: true }));
      console.log(data);
      if (data.products) {
        data.products = `${{ connect: { id: data.products } }}`;
      } else {
        delete data.products;
      }

      await axios.post('/api/v1/orders', {
        source: 'manual',
        ...objKeysToNumber(['quantity', 'taxRate', 'price'], data),
      });
      toast.success('Your order has been created.');
      rest.mutate?.();
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
          <TextInput
            name="orderNumber"
            label="Order Number"
            placeholder="Enter an order number"
          />
          <SelectInput
            name="status"
            label="Status"
            options={orderStatusOptions}
            placeholder="Enter a status"
            optional
          />
          <TextInput
            name="products"
            label="Products"
            placeholder="Enter a product"
            disabled
          />
          <TextInput
            name="source"
            label="Source"
            placeholder="Enter a source"
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
            name="price"
            label="Price"
            placeholder="Enter a price"
            type="number"
            optional
          />
          <TextInput
            name="taxRate"
            label="Tax Rate"
            placeholder="Enter a tax rate"
            type="number"
            optional
          />
          <TextInput
            name="unit"
            label="Unit"
            placeholder="Enter a unit"
            optional
          />
          <TextInput
            name="currency"
            label="Currency"
            placeholder="Enter a currency"
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

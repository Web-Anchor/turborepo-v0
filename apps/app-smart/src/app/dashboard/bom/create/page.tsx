'use client';

import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useRouter } from 'next/navigation';
import {
  FormWrapper,
  SearchInput,
  TextAreaInput,
  TextInput,
} from '@repo/ui/forms';
import { objKeysToNumber } from 'lib/utils';
import { mutate } from 'swr';
import { Header } from '@repo/ui/headers';
import { createDebounce } from 'lib/debounce';
import { useState } from 'react';
import { Inventory, Product } from 'types/data-types';

export default function Page() {
  const [state, setState] = useState<{
    fetching?: string;
    products?: Product[];
    component?: Inventory[];
  }>({});
  const router = useRouter();

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      const validations = ['name', 'quantity', 'composite', 'component'];
      validations.forEach((key) => {
        if (!data[key]) {
          throw new Error(`${key} is required.`);
        }
      });

      await axios.post('/api/v1/boms/create', {
        ...objKeysToNumber(['quantity', 'cost', 'price'], data),
        composite: { connect: { id: data.composite as string } },
        component: { connect: { id: data.component as string } },
        unit: state?.component?.[0]?.unit, // default to component unit
      });
      toast.success('Your item has been created.');
      mutate('/api/v1/boms/boms');
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    }
  }

  async function productSearchWrapper<T>(
    signal: AbortSignal,
    input?: string
  ): Promise<T> {
    const { data } = await axios.post(`/api/v1/products/products?q=${input}`, {
      take: 5,
      input,
      signal,
    });
    return data?.data;
  }
  // Create the debounced function instance
  const debouncedSearch = createDebounce(productSearchWrapper);

  async function componentSearchWrapper<T>(
    signal: AbortSignal,
    input?: string
  ): Promise<T> {
    const { data } = await axios.post(
      `/api/v1/inventories/inventories?q=${input}`,
      {
        take: 5,
        input,
        signal,
      }
    );
    return data?.data;
  }
  // Create the debounced function instance
  const debouncedComponentSearch = createDebounce(componentSearchWrapper);

  async function productSearch(input?: string): Promise<void> {
    try {
      setState((prev) => ({ ...prev, fetching: 'products' }));
      const data: Product[] = await debouncedSearch(input);
      console.log('search response', data);
      setState((prev) => ({ ...prev, products: data }));
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
    }
  }

  async function componentSearch(input?: string): Promise<void> {
    try {
      setState((prev) => ({ ...prev, fetching: 'components' }));
      const data: Inventory[] = await debouncedComponentSearch(input);
      console.log('search response', data);
      setState((prev) => ({ ...prev, component: data }));
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setState((prev) => ({ ...prev, fetching: undefined }));
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
        <div className="mt-10 flex flex-col gap-8">
          <TextInput name="name" label="Name" placeholder="Enter a name" />
          <TextAreaInput
            name="description"
            label="Description"
            placeholder="Enter a description"
            optional
          />
          <SearchInput
            name="composite"
            label="Composite Product"
            placeholder="Enter a composite"
            options={
              state.products?.map((product) => ({
                label: product.name || product.sku || product.barcode,
                value: product.id,
              })) || []
            }
            onChange={(value) => productSearch(value)}
            onClick={(value) => productSearch(value)}
            onSelect={() => {
              setState((prev) => ({ ...prev, products: undefined }));
            }}
            description={
              <>
                <p>
                  Search for a product by SKU, name, or barcode. This will be
                  used to create a composite product. Composite products are
                  used to create a BOM (bill of materials) item.
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="font-semibold w-fit text-secondary"
                  LinkComponent={Link}
                  href="/dashboard/products/create"
                >
                  create new product
                </Button>
              </>
            }
            notFoundPlaceholder={
              <section className="flex flex-row items-center gap-4">
                <p>No products found.</p>
                <Button
                  type="button"
                  variant="link"
                  className="font-semibold w-fit text-secondary"
                  LinkComponent={Link}
                  href="/dashboard/products/create"
                >
                  add new product
                </Button>
              </section>
            }
          />
          <SearchInput
            name="component"
            label="Inventory Item"
            placeholder="Select a component"
            options={state.component?.map((inventory) => ({
              label: inventory.name,
              value: inventory.id,
            }))}
            description={
              <>
                <p>
                  Search for an inventory item by name, SKU, or batch number.
                  This will be used to create a BOM (bill of materials) item.
                </p>
                <Button
                  type="button"
                  variant="link"
                  className="font-semibold w-fit text-secondary"
                  LinkComponent={Link}
                  href="/dashboard/inventory/create"
                >
                  create new inventory
                </Button>
              </>
            }
            onChange={(value) => componentSearch(value)}
            onClick={(value) => componentSearch(value)}
            onSelect={() => {
              setState((prev) => ({ ...prev, component: undefined }));
            }}
            notFoundPlaceholder={
              <section className="flex flex-row items-center gap-4">
                <p>No inventory found.</p>
                <Button
                  type="button"
                  variant="link"
                  className="font-semibold w-fit text-secondary"
                  LinkComponent={Link}
                  href="/dashboard/inventory/create"
                >
                  add new inventory
                </Button>
              </section>
            }
          />
          <TextInput
            name="quantity"
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
          />
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

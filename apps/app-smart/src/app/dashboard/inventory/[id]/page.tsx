'use client';

import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { FormWrapper, TextInput } from '@repo/ui/forms';
import { useGetInventory } from 'hooks/inventories';
import { objKeysToNumber } from 'lib/utils';
import { PageWrapper } from '@repo/ui/semantic';
import { DetailCard } from '@repo/ui/cards/DetailCard';
import { Header } from '@repo/ui/headings/header';
import { useState } from 'react';
import { HeaderTabs } from '@repo/ui/headings/headings';

type ComponentState = {
  fetching?: boolean;
};

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [state, setState] = useState<ComponentState>({});
  const { data, mutate } = useGetInventory({ id: params?.id });

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      if (!params?.id) {
        throw new Error('Inventory ID is required');
      }
      setState((s) => ({ ...s, fetching: true }));
      await axios.post('/api/v1/inventories/update', {
        ...objKeysToNumber(['quantity', 'price'], data),
        id: params?.id,
      });
      toast.success('You have successfully updated the inventory.');
      mutate();
      router.back();
    } catch (error) {
      toast.error(
        (error as Error)?.message || 'An error occurred. Please try again.'
      );
    } finally {
      setState((s) => ({ ...s, fetching: false }));
    }
  }

  return (
    <PageWrapper>
      <HeaderTabs
        LinkComponent={Link}
        title={data?.name || 'Inventory Item'}
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        headings={[
          {
            name: 'All',
            href: '/dashboard/inventory',
          },
          {
            name: data?.name || 'Inventory Item',
            active: true,
            href: `/dashboard/inventory/${params?.id}`,
          },
        ]}
      />
      <FormWrapper onSubmit={submit}>
        <DetailCard
          title={data?.name || 'Inventory Item'}
          description={data?.description || 'Description of the inventory item'}
          list={[
            {
              name: 'Name',
              value: (
                <TextInput
                  name="name"
                  placeholder="Enter a name"
                  defaultValue={data?.name}
                />
              ),
            },
            {
              name: 'Description',
              value: (
                <TextInput
                  name="description"
                  placeholder="Enter a description"
                  defaultValue={data?.description}
                  optional
                />
              ),
            },
            {
              name: 'SKU',
              value: (
                <TextInput
                  name="sku"
                  placeholder="Enter a SKU"
                  defaultValue={data?.sku}
                  optional
                />
              ),
            },
            {
              name: 'Unit',
              value: (
                <TextInput
                  name="unit"
                  placeholder="Enter a unit"
                  defaultValue={data?.unit}
                  optional
                />
              ),
            },
            {
              name: 'Quantity',
              value: (
                <TextInput
                  name="quantity"
                  type="number"
                  placeholder="Enter a quantity"
                  defaultValue={data?.quantity?.toString()}
                  optional
                />
              ),
            },
            {
              name: 'Supplier',
              value: (
                <TextInput
                  name="supplier"
                  placeholder="Enter a supplier"
                  defaultValue={data?.supplier}
                  optional
                />
              ),
            },
          ]}
          footer={
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Button
                type="button"
                variant="link"
                className="text-sm/6 font-semibold text-white"
                LinkComponent={Link}
                href="/dashboard/lists"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                isLoading={state.fetching}
              >
                Update
              </Button>
            </div>
          }
        />
      </FormWrapper>
      <Header
        subtitle="Aliquip aliquip non veniam sit reprehenderit cillum proident."
        description={[
          'Anim occaecat adipisicing ipsum magna quis. Amet et id voluptate occaecat dolor adipisicing aute commodo ex commodo. Pariatur nisi ad pariatur minim. Commodo consequat velit labore in nulla ullamco ipsum. Dolore anim adipisicing incididunt irure aute esse irure ullamco amet laboris aliquip. Ea anim anim sunt veniam ipsum tempor proident eu duis proident magna. Ea dolor id Lorem amet amet laboris aliquip magna. Eu ea ut consequat magna sunt enim ad nulla qui labore ea. Occaecat ullamco reprehenderit tempor est velit aliqua sit sint et nisi sit. Esse anim ad id commodo ea esse cillum laboris magna aliqua proident aute incididunt. Ullamco tempor Lorem id consectetur aliqua. Deserunt do enim officia occaecat occaecat eiusmod commodo nisi minim cupidatat sint mollit do reprehenderit. Ea est occaecat do amet culpa eu irure est enim excepteur duis ipsum.',
        ]}
        type="page-header"
      />
    </PageWrapper>
  );
}

'use client';

import Link from 'components/Wrappers/Link';
import { Button } from '@repo/ui/buttons';
import { toast } from 'sonner';
import axios from 'lib/axios';
import { useParams, useRouter } from 'next/navigation';
import { FormWrapper, SelectInput, TextInput } from '@repo/ui/forms';
import { useGetOrder } from 'hooks/orders';
import { orderStatusOptions } from 'lib/list-options';
import { objKeysToNumber } from 'lib/utils';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { Header } from '@repo/ui/headings/header';
import { useState } from 'react';
import { DetailCard } from '@repo/ui/cards/DetailCard';

type ComponentState = {
  fetching?: boolean;
};

export default function Page() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [state, setState] = useState<ComponentState>({});
  const { data, mutate } = useGetOrder({
    id: params?.id,
  });
  console.log(data);

  async function submit(data: { [k: string]: FormDataEntryValue }) {
    try {
      setState((s) => ({ ...s, fetching: true }));
      await axios.put('/api/v1/orders', {
        ...objKeysToNumber(['quantity', 'cost', 'price', 'reorderLevel'], data),
        id: params?.id,
      });
      toast.success('You have successfully updated the list.');
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

  // delete the item
  async function deleteItem() {
    try {
      if (!data?.id) {
        throw new Error('Order ID is required');
      }
      setState((s) => ({ ...s, fetching: true }));
      await axios.delete(`/api/v1/orders?id=${data?.id}`);
      toast.success('You have successfully deleted the list.');
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
        title={data?.id || 'Order'}
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
            name: data?.id || 'Inventory Item',
            active: true,
            href: `/dashboard/inventory/${params?.id}`,
          },
        ]}
      />
      <FormWrapper onSubmit={submit}>
        <DetailCard
          title={data?.id || 'Inventory Item'}
          description={data?.id || 'Description of the inventory item'}
          list={[
            {
              name: 'Order Number',
              value: data?.orderNumber,
            },
            {
              name: 'Status',
              value: (
                <SelectInput
                  name="status"
                  options={orderStatusOptions}
                  placeholder="Enter a status"
                  defaultValue={data?.status || 'PENDING'}
                  optional
                />
              ),
            },
            {
              name: 'Source',
              value: data?.source,
            },
            {
              name: 'Quantity',
              value: data?.quantity,
            },
            {
              name: 'Price',
              value: data?.price,
            },
            {
              name: 'Tax Rate',
              value: data?.taxRate,
            },
            {
              name: 'Unit',
              value: data?.unit,
            },
            {
              name: 'Currency',
              value: data?.currency,
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
              <Button
                type="button"
                variant="danger"
                className="text-sm/6 font-semibold text-white"
                onClick={deleteItem}
                isLoading={state.fetching}
              >
                Delete
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

'use client';

import { classNames, dateToFormattedString } from '@repo/ui/utils.ts';
import { Link } from 'components/Wrappers/Link';
import { OrderTable } from '@repo/ui/tables/OrderTable';
import { PageWrapper } from '@repo/ui/semantic';
import { HeaderTabs } from '@repo/ui/headings/headings';
import { useSearchParams } from 'next/navigation';
import { Button } from '@repo/ui/buttons';
import { useRef, useState } from 'react';
import { ArrowsClockwise } from '@phosphor-icons/react';
import { toast } from 'sonner';
import { Drawer } from '@repo/ui/drawers/drawer';
import { CreateForm } from './CreateForm';
import { useGetOrders } from 'hooks/orders';
import { Header } from '@repo/ui/headings/header';

type ComponentState = {
  drawer?: boolean;
  synced?: boolean;
  fetching?: string;
};

export default function Page() {
  const params = useSearchParams();
  const [state, setState] = useState<ComponentState>({});
  const { data } = useGetOrders({});
  const csvRef = useRef<HTMLInputElement>(null);

  async function csvUpload() {
    try {
      if (!csvRef?.current?.files) {
        throw new Error('No file selected');
      }
      const file = csvRef.current.files[0];
      const form = new FormData();
      form.append('file', file);

      // const { data } = await axios.post('/api/v1/files/csv-upload', form);
      // console.log('res data', data);

      // mutate();
      // toast.success(data?.message || 'CSV uploaded successfully');
      // if (data?.errors) {
      //   toast.error(data?.errors);
      // }
      toast.success('CSV uploaded successfully');
    } catch (error) {
      toast.error((error as Error).message || 'Error uploading CSV');
    } finally {
      if (csvRef.current) {
        csvRef.current.value = '';
      }
    }
  }
  console.log('data', data);

  async function syncOrders() {
    try {
      setState((s) => ({ ...s, fetching: 'sync' }));
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // const { data } = await axios.post('/api/v1/orders/sync');
      setState((s) => ({ ...s, synced: true }));
    } catch (error) {
      toast.error((error as Error).message || 'Error syncing orders');
    } finally {
      setState((s) => ({ ...s, fetching: undefined }));
    }
  }

  return (
    <PageWrapper>
      <Drawer
        open={state.drawer}
        onClose={() => setState((s) => ({ ...s, drawer: false }))}
      >
        <CreateForm
          onSuccess={() => setState((s) => ({ ...s, drawer: false }))}
        />
      </Drawer>
      <HeaderTabs
        LinkComponent={Link}
        title="Orders"
        description={[
          'Ad dolore ea cupidatat labore elit dolor aute.',
          'Proident anim irure pariatur enim excepteur ea. Ut culpa sit laboris culpa magna officia anim mollit cupidatat veniam. Ad ad non sint ullamco.',
        ]}
        headings={[
          {
            name: 'All',
            active: params.has('type') === false,
            href: '/dashboard/orders',
          },
          {
            name: 'Etsy',
            active: params.get('type') === 'etsy',
            href: `/dashboard/orders?type=etsy`,
          },
          {
            name: 'Shopify',
            active: params.get('type') === 'shopify',
            href: `/dashboard/orders?type=shopify`,
          },
          {
            name: 'WooCommerce',
            active: params.get('type') === 'woocommerce',
            href: `/dashboard/orders?type=woocommerce`,
          },
          {
            name: 'Manual',
            active: params.get('type') === 'manual',
            href: `/dashboard/orders?type=manual`,
          },
        ]}
        actions={
          <div className="flex sm:flex-row flex-wrap gap-4 mt-auto">
            <Button variant="primary" onClick={syncOrders}>
              <ArrowsClockwise
                className={classNames(
                  'mr-2',
                  state.fetching === 'sync'
                    ? 'animate-spin text-green-600'
                    : 'text-white',
                  state.synced ? 'hidden' : 'inline-block'
                )}
                size={20}
              />
              {state.synced ? 'Synced' : 'Sync'}
            </Button>
            <Button variant="primary" onClick={() => csvRef.current?.click()}>
              Import Orders
            </Button>
            <Button
              onClick={() => setState((s) => ({ ...s, drawer: true }))}
              variant="secondary"
            >
              Create Manual Order
            </Button>
          </div>
        }
        actionClassName="bottom-4"
      />

      {/* hidden input for csv from uploads */}
      <input type="file" className="hidden" ref={csvRef} onChange={csvUpload} />

      <OrderTable
        orders={[
          {
            name: 'Candle Large',
            orderId: '12345678',
            platform: 'Etsy',
            platformOrderId: '12345678',
            platformOrderLink: 'https://etsy.com/orders/12345678',
            customerName: 'Jane Doe',
            orderDate: dateToFormattedString(new Date().toISOString()),
            status: 'Pending',
            currency: '$',
            price: 123.45,
            itemCount: 3,
            actions: (
              <Button
                variant="link"
                LinkComponent={Link}
                href="/dashboard/orders/12345678"
              >
                View
              </Button>
            ),
          },
          {
            name: 'Candle Small',
            orderId: '12345679',
            platform: 'Shopify',
            platformOrderId: '12345679',
            platformOrderLink: 'https://shopify.com/orders/12345679',
            customerName: 'John Doe',
            orderDate: dateToFormattedString(new Date().toISOString()),
            status: 'Shipped',
            currency: '$',
            price: 234.56,
            itemCount: 2,
            actions: (
              <Button
                variant="link"
                LinkComponent={Link}
                href="/dashboard/orders/12345679"
              >
                View
              </Button>
            ),
          },
          {
            name: 'Candle Medium',
            orderId: '12345680',
            platform: 'WooCommerce',
            platformOrderId: '12345680',
            platformOrderLink: 'https://woocommerce.com/orders/12345680',
            customerName: 'Emily Johnson',
            orderDate: dateToFormattedString(new Date().toISOString()),
            status: 'Cancelled',
            currency: '$',
            price: 345.67,
            itemCount: 1,
          },
        ]}
      />

      <Header
        subtitle="Manage your orders"
        description={[
          'Sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
          'Adipisicing sunt magna elit cillum aliqua exercitation labore et adipisicing ullamco in.',
        ]}
        type="page-header"
      />
    </PageWrapper>
  );
}

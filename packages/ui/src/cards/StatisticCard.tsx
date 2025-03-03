import { classNames, dateToFormattedString } from '../../dist/utils';
import {
  User,
  Package,
  BoxArrowDown,
  DotsThreeOutline,
} from '@phosphor-icons/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

type StatisticCardTypes = {
  name?: string;
  description?: string;
  itemCount?: number | string;
  updatedAt?: string;
  LinkComponent?: React.ElementType;
  href?: string;
  amount?: string | number;
  type?: 'User' | 'Products' | 'Orders';
  status?: keyof typeof statuses;
  className?: string;
};

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
  Active: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Inactive: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Pending: 'text-yellow-700 bg-yellow-50 ring-yellow-600/10',
  Completed: 'text-green-700 bg-green-50 ring-green-600/10',
  Canceled: 'text-red-700 bg-red-50 ring-red-600/10',
  Refunded: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Failed: 'text-red-700 bg-red-50 ring-red-600/10',
  Processing: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Shipped: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Delivered: 'text-green-700 bg-green-50 ring-green-600/10',
  Returned: 'text-red-700 bg-red-50 ring-red-600/10',
  'Awaiting Payment': 'text-yellow-700 bg-yellow-50 ring-yellow-600/10',
  'Awaiting Pickup': 'text-blue-700 bg-blue-50 ring-blue-600/10',
  'Awaiting Shipment': 'text-blue-700 bg-blue-50 ring-blue-600/10',
  'Partially Shipped': 'text-blue-700 bg-blue-50 ring-blue-600/10',
  'Partially Delivered': 'text-green-700 bg-green-50 ring-green-600/10',
  'Partially Returned': 'text-red-700 bg-red-50 ring-red-600/10',
  'Partially Refunded': 'text-gray-600 bg-gray-50 ring-gray-500/10',
  'Payment Error': 'text-red-700 bg-red-50 ring-red-600/10',
  'On Hold': 'text-yellow-700 bg-yellow-50 ring-yellow-600/10',
  Cancelled: 'text-red-700 bg-red-50 ring-red-600/10',
};

const icons = {
  Products: <Package className="size-8 text-gray-400" />,
  User: <User className="size-8 text-gray-400" />,
  Orders: <BoxArrowDown className="size-8 text-gray-400" />,
};

export function StatisticCard({
  status = 'Paid',
  type = 'Products',
  ...rest
}: StatisticCardTypes) {
  const LinkComponent = rest.LinkComponent || 'a'; // Default to 'a' if LinkComponent is not provided

  return (
    <div
      className={classNames(
        'flex flex-1 flex-col overflow-hidden rounded-xl bg-gray-800 ring-1 ring-white/15 lg:min-w-[320px] min-w-[220px]',
        rest.className
      )}
    >
      <div className="flex items-center gap-x-4 border-b border-gray-600 p-6">
        {icons[type]}
        <p className="text-lg font-medium tracking-tight text-white">
          {rest.name}
        </p>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-100">
            <span className="sr-only">Open options</span>
            <DotsThreeOutline className="size-5" />
          </MenuButton>
          <MenuItems
            transition
            className="absolute right-0 z-10 mt-0.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <MenuItem>
              <LinkComponent
                href="#"
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
              >
                {/* View<span className="sr-only">, {client.name}</span> */}
                name
              </LinkComponent>
            </MenuItem>
            <MenuItem>
              <LinkComponent
                href="#"
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
              >
                {/* Edit<span className="sr-only">, {client.name}</span> */}
                name
              </LinkComponent>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <dl className="-my-3 divide-y divide-gray-400 px-6 py-4 text-sm/6">
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-100">Updated At</dt>
          <dd className="font-medium text-gray-100">
            <time dateTime={rest.updatedAt}>
              {dateToFormattedString(rest.updatedAt)}
            </time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <section className="flex flex-row gap-2">
            <dt className="text-gray-100">Amount</dt>
            <dt className="font-medium">{rest.amount}</dt>
          </section>
          <dd className="flex items-start gap-x-2">
            <div
              className={classNames(
                statuses[status],
                'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {status}
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}

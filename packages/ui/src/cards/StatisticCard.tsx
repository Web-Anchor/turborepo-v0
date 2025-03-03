import { classNames } from '../../dist/utils';
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
  tags?: string[];
  LinkComponent?: React.ElementType;
  href?: string;
  amount?: string | number;
  type?: 'User' | 'Products' | 'Orders';
  status?: keyof typeof statuses;
};

const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
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
    <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-gray-800 ring-1 ring-white/15">
      <div className="flex items-center gap-x-4 border-b border-gray-600 p-6">
        {icons[type]}
        <p className="text-lg font-medium tracking-tight text-white">
          {rest.name}
        </p>
        <Menu as="div" className="relative ml-auto">
          <MenuButton className="-m-2.5 block p-2.5 text-gray-400 hover:text-gray-500">
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
          <dt className="text-gray-500">Last invoice</dt>
          <dd className="text-gray-700">
            <time dateTime={rest.updatedAt}>{rest.updatedAt}</time>
          </dd>
        </div>
        <div className="flex justify-between gap-x-4 py-3">
          <dt className="text-gray-500">Amount</dt>
          <dd className="flex items-start gap-x-2">
            <div className="font-medium text-gray-900">{rest.amount}</div>
            <div
              className={classNames(
                statuses[status],
                'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
              )}
            >
              {/* {client.lastInvoice.status} */}
              status
            </div>
          </dd>
        </div>
      </dl>
    </div>
  );
}

import type React from 'react';
import { classNames, dateToFormattedString } from '../../dist/utils';
import {
  User,
  Package,
  BoxArrowDown,
  DotsThreeOutline,
  Bell,
  Clock,
  Calendar,
  ChatCircle,
  ShoppingCart,
  FileText,
  Gear,
  ArrowRight,
} from '@phosphor-icons/react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

// Shared types
type ActivityItemType = {
  message?: string;
  description?: string;
  type?:
    | 'User'
    | 'Products'
    | 'Orders'
    | 'Notification'
    | 'Time'
    | 'Calendar'
    | 'Message'
    | 'Purchase'
    | 'Document'
    | 'Settings';
  updatedAt?: string;
  status?:
    | 'Paid'
    | 'Withdraw'
    | 'Overdue'
    | 'Active'
    | 'Inactive'
    | 'Pending'
    | 'Completed'
    | 'Canceled'
    | 'Refunded'
    | 'Failed'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Returned'
    | 'Low Stock';
  href?: string;
};

type BaseCardProps = {
  title: string;
  icon?: React.ReactNode;
  LinkComponent?: React.ElementType;
  className?: string;
  viewAllHref?: string;
  onViewAll?: () => void;
};

// Status styles (same as original)
const statuses = {
  Paid: 'text-green-700 bg-green-50 ring-green-600/20',
  Withdraw: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Overdue: 'text-red-700 bg-red-50 ring-red-600/10',
  Active: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Inactive: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Pending: 'text-yellow-700 bg-yellow-50 ring-yellow-600/10',
  Completed: 'text-green-700 bg-green-50 ring-green-600/20',
  Canceled: 'text-red-700 bg-red-50 ring-red-600/10',
  Refunded: 'text-gray-600 bg-gray-50 ring-gray-500/10',
  Failed: 'text-red-700 bg-red-50 ring-red-600/10',
  Processing: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Shipped: 'text-blue-700 bg-blue-50 ring-blue-600/10',
  Delivered: 'text-green-700 bg-green-50 ring-green-600/20',
  Returned: 'text-red-700 bg-red-50 ring-red-600/10',
  LowStock: 'text-red-700 bg-red-50 ring-red-600/10',
};

const icon = {
  User: <User className="size-5" />,
  Products: <Package className="size-5" />,
  Orders: <BoxArrowDown className="size-5" />,
  Notification: <Bell className="size-5" />,
  Time: <Clock className="size-5" />,
  Calendar: <Calendar className="size-5" />,
  Message: <ChatCircle className="size-5" />,
  Purchase: <ShoppingCart className="size-5" />,
  Document: <FileText className="size-5" />,
  Settings: <Gear className="size-5" />,
};

// Card header icons
const cardIcons = {
  Activity: <Bell className="size-8 text-gray-400" />,
  Updates: <Clock className="size-8 text-gray-400" />,
};

// Base card component for both activity and updates
function BaseCard({
  title,
  icon,
  children,
  LinkComponent = 'a',
  className,
  viewAllHref,
  onViewAll,
}: BaseCardProps & { children: React.ReactNode }) {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col overflow-hidden rounded-xl bg-gray-800 ring-1 ring-white/15 lg:min-w-[320px] min-w-[220px]',
        className
      )}
    >
      <div className="flex items-center gap-x-4 border-b border-gray-600 p-6">
        {icon}
        <p className="text-lg font-medium tracking-tight text-white">{title}</p>
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
                Refresh
              </LinkComponent>
            </MenuItem>
            <MenuItem>
              <LinkComponent
                href="#"
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
              >
                Settings
              </LinkComponent>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>

      <div className="flex flex-col flex-1">{children}</div>

      {viewAllHref && (
        <div className="border-t border-gray-600 p-4">
          <LinkComponent
            href={viewAllHref}
            onClick={onViewAll}
            className="flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white"
          >
            View all
            <ArrowRight className="ml-1 size-4" />
          </LinkComponent>
        </div>
      )}
    </div>
  );
}

// Activity item component
function ActivityItem({
  item,
}: {
  item: ActivityItemType;
  LinkComponent?: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-x-3 py-3">
      <div
        className={classNames(
          'rounded-full p-1 text-xs font-medium ring-1 ring-inset',
          statuses[(item.status as keyof typeof statuses) || 'Inactive']
        )}
      >
        {icon[(item.type as keyof typeof icon) || 'Products']}
      </div>
      <div className="flex flex-row flex-1 min-w-0">
        <section className="flex flex-1 flex-col gap-1">
          <p className="text-sm text-gray-100">{item.message}</p>
          <p className="text-[12px] text-gray-400 line-clamp-2">
            {item.description}
          </p>
        </section>
        <time dateTime={item.updatedAt} className="text-xs text-gray-400">
          {dateToFormattedString(item.updatedAt)}
        </time>
      </div>
      {item.status && (
        <div className="flex-shrink-0">
          <div
            className={classNames(
              'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
              statuses[(item.status as keyof typeof statuses) || '']
            )}
          >
            {item.status}
          </div>
        </div>
      )}
    </div>
  );
}

// Recent Activity Card
type RecentActivityCardProps = BaseCardProps & {
  activities: ActivityItemType[];
  hidden?: boolean;
};

export function ActivityCard({
  activities,
  title = 'Recent Activity',
  icon = cardIcons.Activity,
  ...rest
}: RecentActivityCardProps) {
  if (rest.hidden) {
    return null;
  }

  return (
    <BaseCard title={title} icon={icon} {...rest}>
      <div className="divide-y divide-gray-600 px-6 py-2">
        {!activities?.length && (
          <p className="py-4 text-sm text-gray-400 text-center">
            No recent activity
          </p>
        )}

        {activities?.map((activity, key: number) => (
          <ActivityItem
            key={key}
            item={activity}
            LinkComponent={rest.LinkComponent}
          />
        ))}
      </div>
    </BaseCard>
  );
}

// Latest Updates Card
type LatestUpdatesCardProps = BaseCardProps & {
  updates: ActivityItemType[];
};

export function LatestUpdatesCard({
  updates,
  title = 'Latest Updates',
  icon = cardIcons.Updates,
  ...rest
}: LatestUpdatesCardProps) {
  return (
    <BaseCard title={title} icon={icon} {...rest}>
      <div className="divide-y divide-gray-600 px-6 py-2">
        {!updates.length && (
          <p className="py-4 text-sm text-gray-400 text-center">
            No recent activity
          </p>
        )}

        {updates?.map((activity, key: number) => (
          <ActivityItem
            key={key}
            item={activity}
            LinkComponent={rest.LinkComponent}
          />
        ))}
      </div>
    </BaseCard>
  );
}

// Keep the original StatisticCard for backward compatibility
type StatisticCardTypes = {
  name?: string;
  description?: string;
  itemCount?: number | string;
  updatedAt?: string;
  LinkComponent?: React.ElementType;
  href?: string;
  amount?: string | number;
  type?: 'User' | 'Products' | 'Orders';
  status?:
    | 'Paid'
    | 'Withdraw'
    | 'Overdue'
    | 'Active'
    | 'Inactive'
    | 'Pending'
    | 'Completed'
    | 'Canceled'
    | 'Refunded'
    | 'Failed'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Returned';
  className?: string;
};

const statisticIcons = {
  Products: <Package className="size-8 text-gray-400" />,
  User: <User className="size-8 text-gray-400" />,
  Orders: <BoxArrowDown className="size-8 text-gray-400" />,
};

export function StatisticCard({
  status = 'Paid',
  type = 'Products',
  ...rest
}: StatisticCardTypes) {
  const LinkComponent = rest.LinkComponent || 'a';

  return (
    <div
      className={classNames(
        'flex flex-1 flex-col overflow-hidden rounded-xl bg-gray-800 ring-1 ring-white/15 lg:min-w-[320px] min-w-[220px]',
        rest.className
      )}
    >
      <div className="flex items-center gap-x-4 border-b border-gray-600 p-6">
        {statisticIcons[type]}
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
                View
              </LinkComponent>
            </MenuItem>
            <MenuItem>
              <LinkComponent
                href="#"
                className="block px-3 py-1 text-sm/6 text-gray-900 data-[focus]:bg-gray-50 data-[focus]:outline-none"
              >
                Edit
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
                'rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset',
                statuses[status]
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

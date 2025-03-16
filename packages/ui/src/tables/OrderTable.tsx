import React from 'react';
import { classNames, dateToFormattedString } from '../../dist/utils';
import { BaseCard, statuses } from '../cards/ActivityCard';
import { BoxArrowDown, ShoppingCart } from '@phosphor-icons/react';
import { Badge } from '../badges';

/** Individual order properties */
export type OrderItemProps = {
  name?: string;
  /** Your internal order ID, e.g. "ORD-001" */
  orderId?: string;
  /** Display name of the customer, e.g. "John Doe" */
  customerName?: string;
  /** Date string for the order, e.g. "2025-01-03" */
  orderDate?: string;
  /** Platform of the order, e.g. "etsy", "shopify", "woocommerce", or "manual" */
  platform?: string;
  /**
   * The platform-specific ID, e.g. "#12345678"
   * (Optional if you want to display the store’s own order reference)
   */
  platformOrderId?: string;
  /**
   * A link to open that platform’s order page (if available).
   * If provided, the platformOrderId becomes a clickable link.
   */
  platformOrderLink?: string;
  /**
   * Order status text, e.g. "shipped", "processing", "delivered", etc.
   * Adjust styling as needed to match your color system.
   */
  status?: string;
  /** The total price (numeric or string) */
  price?: number | string;
  /** Currency symbol or code to prepend, e.g. "$" or "USD" */
  currency?: string;
  /** Number of items in the order */
  itemCount?: number;
  actions?: React.ReactNode;
  /**
   * Callback for when "View Details" is clicked.
   * Could also be a link if you prefer.
   */
  onViewDetails?: () => void;
};

/** Props for rendering a list of orders */
export type OrderTableProps = {
  /** Array of orders to display */
  orders?: OrderItemProps[];
  /** Optional className for the container */
  className?: string;
  title?: string;
};

/** Main component that renders multiple orders in the style shown */
export function OrderTable({
  orders,
  title = 'Recent Orders',
  ...rest
}: OrderTableProps) {
  return (
    <BaseCard
      title={title}
      icon={<ShoppingCart className="text-indigo-500" size={24} />}
      {...rest}
    >
      <div className="divide-y divide-gray-600 px-6 py-2">
        {!orders?.length && (
          <p className="py-4 text-sm text-gray-400 text-center">
            No recent activity
          </p>
        )}

        {orders?.map((order, key: number) => (
          <div className="flex flex-row items-start gap-3 py-3" key={key}>
            <div
              className={classNames(
                'rounded-full p-1 text-xs font-medium ring-1 ring-inset',
                statuses[(order.status as keyof typeof statuses) || 'Inactive']
              )}
            >
              <BoxArrowDown className="text-indigo-500" size={20} />
            </div>
            <div className="flex flex-row flex-1 gap-2 min-w-0">
              <div className="flex flex-col gap-1 min-w-[25%]">
                <p className="text-sm text-gray-100 truncate max-w-44">
                  {order.name}
                </p>
                <div className="flex flex-row gap-1">
                  <p className="text-[12px] text-gray-400 line-clamp-2">
                    {order.customerName}
                  </p>
                  <time
                    dateTime={order.orderDate}
                    className="text-xs text-gray-400"
                  >
                    {dateToFormattedString(order.orderDate)}
                  </time>
                </div>
              </div>
              <Badge title={order.platform} status={order.status} />
              <Badge title={order.status} status={order.status} />
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col">
                <p className="text-sm text-gray-100 truncate max-w-28">
                  <span>{order.price} </span>
                  {order.currency}
                </p>
                <p className="text-xs text-gray-400">{order.itemCount} items</p>
              </div>
              {order.actions}
            </div>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}

import { classNames, dateToFormattedString } from '../../dist/utils';

interface Product {
  name?: string;
  description?: string;
  category?: string;
  quantity?: number;
  price?: number;
  status?: string;
  action?: React.ReactNode;
  reorderLevel?: number;
  updatedAt?: string;
}

interface TableHeader {
  name: string;
  className: string;
}

interface ProductTableProps {
  items?: Product[];
  headers?: TableHeader[];
  theme?: 'light' | 'dark' | 'custom';
  className?: string;
}

function themeStatus(status?: string): string {
  switch (status) {
    case 'ACTIVE':
      return 'bg-green-100 text-green-800';
    case 'INACTIVE':
      return 'bg-red-100 text-red-800';
    case 'DAMAGED':
      return 'bg-yellow-100 text-yellow-800';
    case 'UNDER_MAINTENANCE':
      return 'bg-blue-100 text-blue-800';
    case 'DISCONTINUED':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const themes = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-800 text-white',
  custom: 'bg-indigo-50 text-indigo-900',
};

export function ProductTable({
  items,
  theme = 'light',
  ...rest
}: ProductTableProps) {
  return (
    <div
      className={classNames(
        `container mx-auto px-2 sm:px-4 lg:px-6 py-2 rounded-lg shadow-md border border-gray-200`,
        themes[theme],
        rest.className
      )}
    >
      <div className="overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-opacity-50">
              <tr>
                {rest?.headers?.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`py-3.5 pl-4 px-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 text-nowrap ${header.className}`}
                  >
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-opacity-50">
              {items?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-opacity-75 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium">{item.name}</div>
                        <div className="text-sm opacity-75">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden sm:table-cell">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.price ? `$${item.price.toFixed(2)}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span
                      className={classNames(
                        'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20',
                        themeStatus(item.status)
                      )}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    {item.reorderLevel}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    <span
                      className={classNames(
                        'inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20',
                        themeStatus(
                          isLowOnStock(item.quantity, item.reorderLevel)
                            ? 'INACTIVE'
                            : 'ACTIVE'
                        )
                      )}
                    >
                      {isLowOnStock(item.quantity, item.reorderLevel)
                        ? 'Low Stock'
                        : 'Good Levels'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    {dateToFormattedString(item.updatedAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    {item.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function isLowOnStock(quantity: number = 0, reorderLevel?: number) {
  try {
    return reorderLevel && quantity <= reorderLevel;
  } catch {
    return false;
  }
}

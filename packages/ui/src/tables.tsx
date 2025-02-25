import { classNames, dateToFormattedString } from '../dist/utils';

interface Item {
  id: string;
  name?: string;
  description?: string;
  category?: string;
  quantity?: number;
  price?: number;
  status?: string;
  action?: React.ReactNode;
  updatedAt?: string;
}

interface TableHeader {
  name: string;
  className: string;
}

interface ItemTableProps {
  items?: Item[];
  headers?: TableHeader[];
  theme?: 'light' | 'dark' | 'custom';
}

function themeStatus(status?: string): string {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Inactive':
      return 'bg-red-100 text-red-800';
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

const defaultHeaders: TableHeader[] = [
  { name: 'Name', className: '' },
  { name: 'Category', className: 'hidden sm:table-cell' },
  { name: 'Quantity', className: '' },
  { name: 'Price', className: '' },
  { name: 'Status', className: 'hidden sm:table-cell' },
  { name: 'Last Updated', className: 'hidden lg:table-cell' },
  { name: 'Actions', className: '' },
];

const themes = {
  light: 'bg-white text-gray-900',
  dark: 'bg-gray-800 text-white',
  custom: 'bg-indigo-50 text-indigo-900',
};

export default function ItemTable({
  items,
  headers = defaultHeaders,
  theme = 'light',
}: ItemTableProps) {
  return (
    <div
      className={`container mx-auto px-4 sm:px-6 lg:px-8 py-8 ${themes[theme]}`}
    >
      <div className="mt-8 overflow-hidden sm:rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-opacity-50">
              <tr>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    scope="col"
                    className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${header.className}`}
                  >
                    {header.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-opacity-50">
              {items?.map((item) => (
                <tr
                  key={item.id}
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
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-sm ${themeStatus(item.status)}`}
                    >
                      {item.status}
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

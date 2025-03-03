import { classNames, dateToFormattedString } from '../dist/utils';

interface Item {
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

interface ItemTableProps {
  items?: Item[];
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

export default function ItemTable({
  items,
  theme = 'light',
  ...rest
}: ItemTableProps) {
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

type User = {
  name?: string;
  title?: string;
  department?: string;
  email?: string;
  role?: string;
  image?: string;
  LinkComponent?: React.ElementType;
  editLink?: string;
  // Add more properties as needed
};

type ComponentTypes = {
  className?: string;
  children?: React.ReactNode;
  users?: User[];
};
export function UserTable(props: ComponentTypes) {
  return (
    <div className="px-4 py-2 sm:px-6 lg:px-8 bg-white shadow sm:rounded-lg">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-gray-900 shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {props.users?.map((person) => {
                  const LinkComponent = person.LinkComponent || 'a'; // Default to 'a' if LinkComponent is not provided

                  return (
                    <tr key={person.email}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="size-11 shrink-0">
                            <img
                              alt=""
                              src={person.image}
                              className="size-11 rounded-full"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {person.name}
                            </div>
                            <div className="mt-1 text-gray-500">
                              {person.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{person.title}</div>
                        <div className="mt-1 text-gray-500">
                          {person.department}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {person.role}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <LinkComponent
                          href={person.editLink || '#'}
                          className={classNames(
                            'text-indigo-600 hover:text-indigo-900'
                          )}
                        >
                          Edit
                          <span className="sr-only">, {person.name}</span>
                        </LinkComponent>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

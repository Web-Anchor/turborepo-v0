import { classNames, conditionalReturn } from '../dist/utils';
import { Button } from './button';
import { dateToFormattedString } from '../dist/utils';

type CollectionCardTypes = {
  name?: string;
  description?: string;
  itemCount?: number | string;
  updatedAt?: string;
  tags?: string[];
  LinkComponent?: React.ElementType;
  href?: string;
  type?: 'primary' | 'secondary';
};

export function CollectionCard({
  name,
  description,
  itemCount = 0,
  updatedAt,
  tags,
  LinkComponent,
  href = '#',
  type = 'primary',
}: CollectionCardTypes) {
  return (
    <div
      className={classNames(
        'flex flex-col justify-between rounded-lg border border-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl',
        conditionalReturn(type === 'secondary', 'border-tertiary')
      )}
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-start">
          <h3
            className={classNames(
              'text-xl font-semibold truncate',
              conditionalReturn(type === 'secondary', 'text-tertiary')
            )}
          >
            {name}
          </h3>
          <span
            className={classNames(
              'text-nowrap bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full',
              conditionalReturn(
                type === 'secondary',
                'bg-tertiary text-primary'
              )
            )}
          >
            {itemCount} items
          </span>
        </div>
        <p
          className={classNames(
            'text-gray-400 line-clamp-4',
            conditionalReturn(type === 'secondary', 'text-lavender')
          )}
        >
          {description}
        </p>
        <div
          className={classNames(
            'flex items-center text-gray-500 text-sm gap-2',
            conditionalReturn(type === 'secondary', 'text-lavender')
          )}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="inline-block h-6 w-6"
          >
            <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-68-76a12,12,0,1,1-12-12A12,12,0,0,1,140,132Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,132ZM96,172a12,12,0,1,1-12-12A12,12,0,0,1,96,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,140,172Zm44,0a12,12,0,1,1-12-12A12,12,0,0,1,184,172Z"></path>
          </svg>
          <section className="flex gap-2 text-nowrap">
            Last updated:
            <span className="line-clamp-1">
              {dateToFormattedString(updatedAt)}
            </span>
          </section>
        </div>
        {!!tags?.length && (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <span
                key={index}
                className={classNames(
                  'bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full flex items-center gap-2',
                  conditionalReturn(type === 'secondary', 'text-tertiary')
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                  className="inline-block h-3 w-3"
                >
                  <path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63Zm-96,96L48,132.69V48h84.69L232,147.31ZM96,84A12,12,0,1,1,84,72,12,12,0,0,1,96,84Z"></path>
                </svg>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="bg-gray-700 px-4 py-3 flex gap-2 justify-between items-center">
        <Button
          className={classNames(
            'flex gap-2 items-center text-gray-400 p-0 hoover:text-red-600',
            conditionalReturn(type === 'secondary', 'text-tertiary')
          )}
          variant="link"
          LinkComponent={LinkComponent}
          href={href}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="inline-block h-4 w-4"
          >
            <path d="M223.68,66.15,135.68,18a15.88,15.88,0,0,0-15.36,0l-88,48.17a16,16,0,0,0-8.32,14v95.64a16,16,0,0,0,8.32,14l88,48.17a15.88,15.88,0,0,0,15.36,0l88-48.17a16,16,0,0,0,8.32-14V80.18A16,16,0,0,0,223.68,66.15ZM128,32l80.34,44-29.77,16.3-80.35-44ZM128,120,47.66,76l33.9-18.56,80.34,44ZM40,90l80,43.78v85.79L40,175.82Zm176,85.78h0l-80,43.79V133.82l32-17.51V152a8,8,0,0,0,16,0V107.55L216,90v85.77Z"></path>
          </svg>
          <p>View inventory lists</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="inline-block h-4 w-4"
          >
            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
          </svg>
        </Button>
      </div>
    </div>
  );
}

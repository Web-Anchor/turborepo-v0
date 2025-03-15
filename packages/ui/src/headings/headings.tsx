import { classNames } from '../../dist/utils';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export interface Heading {
  name?: string;
  active?: boolean;
  className?: string;
  href?: string;
  action?: React.ReactNode;
}

interface HeaderTabsProps {
  title?: string;
  description?: string[];
  headings: Heading[];
  actions?: React.ReactNode;
  LinkComponent?: React.ElementType;
  actionClassName?: string;
}

export function HeaderTabs({ LinkComponent = 'a', ...rest }: HeaderTabsProps) {
  // Get the active heading, or default to the first one.
  const currentHeading =
    rest.headings.find((heading) => heading.active) || rest.headings[0];

  return (
    <div className="relative border-b border-gray-200 pb-5 sm:pb-0">
      <div className="md:flex gap-4 md:items-center md:justify-between">
        <div>
          {rest.title && (
            <h3 className="text-base lg:text-4xl font-semibold light:text-gray-900 lg:mb-6">
              {rest.title}
            </h3>
          )}
          {rest.description?.map((paragraph, index) => (
            <p key={index} className="mt-1 text-sm light:text-gray-500">
              {paragraph}
            </p>
          ))}
        </div>
        {rest.actions && (
          <div
            className={classNames(
              'mt-3 flex md:absolute md:top-3 md:right-0 md:mt-0',
              rest.actionClassName
            )}
          >
            {rest.actions}
          </div>
        )}
      </div>
      <div className="mt-4 lg:mt-6">
        {/* Mobile: a select input */}
        <div className="grid grid-cols-1 sm:hidden">
          <select
            defaultValue={currentHeading?.name}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline outline-1 outline-offset-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          >
            {rest.headings.map((heading, key: number) => (
              <option key={key} value={heading.name}>
                {heading.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 h-5 w-5 self-center justify-self-end text-gray-500"
          />
        </div>
        {/* Desktop: tabs */}
        <div className="hidden sm:block">
          <nav className="-mb-px flex space-x-4">
            {rest.headings.map((heading, key: number) => {
              if (heading.action) {
                return (
                  <div
                    key={key}
                    className={classNames(
                      heading.active
                        ? 'border-indigo-400 text-indigo-400'
                        : 'border-transparent text-gray-200 hover:border-indigo-300 hover:text-indigo-300',
                      'border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap cursor-pointer',
                      heading.className
                    )}
                  >
                    {heading.action}
                  </div>
                );
              }

              return (
                <LinkComponent
                  key={heading.name}
                  href={heading.href || '#'}
                  aria-current={heading.active ? 'page' : undefined}
                  className={classNames(
                    heading.active
                      ? 'border-indigo-400 text-indigo-400'
                      : 'border-transparent text-gray-200 hover:border-indigo-300 hover:text-indigo-300',
                    'border-b-2 px-1 pb-4 text-sm font-medium whitespace-nowrap',
                    heading.className
                  )}
                >
                  {heading.name}
                </LinkComponent>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

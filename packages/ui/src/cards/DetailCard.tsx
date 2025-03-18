import { classNames } from '../../lib/utils';

export type ListType = {
  name: string;
  value?: string | React.ReactNode;
};

type DetailCardProps = {
  title: string;
  description: string;
  list: ListType[];
  className?: string;
  footer?: React.ReactNode;
};

export function DetailCard({
  title,
  description,
  list,
  className,
  footer,
}: DetailCardProps) {
  return (
    <div
      className={classNames(
        'overflow-hidden bg-slate-800 sm:rounded-lg shadow-lg',
        className
      )}
    >
      {(title || description) && (
        <div className="px-4 py-6 sm:px-6">
          {title && (
            <h3 className="text-base/7 font-semibold light:text-gray-900">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 max-w-2xl text-sm/6 light:text-gray-500">
              {description}
            </p>
          )}
        </div>
      )}
      <div className="border-t border-white/10">
        <dl className="divide-y divide-white/10">
          {list.map((item, index) => (
            <div
              key={index}
              className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
            >
              <dt className="text-sm font-medium light:text-gray-900">
                {item.name}
              </dt>
              <dd className="mt-1 text-sm/6 light:text-gray-700 sm:col-span-2 sm:mt-0">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      {footer && (
        <div className="px-4 py-6 sm:px-6 border-t border-white/10">
          {footer}
        </div>
      )}
    </div>
  );
}

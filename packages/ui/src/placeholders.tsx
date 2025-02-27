import { classNames } from '../dist/utils';

type CardTypes = {
  className?: string;
  type?: 'user' | 'post';
};

export function UserCard({ className, type = 'user' }: CardTypes) {
  return (
    <div
      className={classNames(
        'w-full max-w-sm rounded-md border border-blue-300 p-4',
        className
      )}
    >
      <div className="flex animate-pulse space-x-4">
        {type === 'user' && (
          <div className="size-10 rounded-full bg-gray-200"></div>
        )}
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 rounded bg-gray-200"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-2 rounded bg-gray-200"></div>
              <div className="col-span-1 h-2 rounded bg-gray-200"></div>
            </div>
            <div className="h-2 rounded bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClerkCard({ className }: CardTypes) {
  const h = 'h-4';

  return (
    <div
      className={classNames(
        'w-full max-w-sm rounded-md border border-blue-300 p-4',
        className
      )}
    >
      <div className="flex animate-pulse space-x-4">
        <div className="flex-1 space-y-6 py-1">
          <div className={classNames('rounded bg-gray-200', h)}></div>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div
                className={classNames('col-span-2 rounded bg-gray-200', h)}
              ></div>
              <div
                className={classNames('col-span-1 rounded bg-gray-200', h)}
              ></div>
            </div>

            <div className={classNames('rounded bg-gray-200', h)}></div>
            <div className={classNames('rounded bg-gray-200 h-32')}></div>
            <div className={classNames('rounded bg-gray-200 h-16')}></div>
            <div className={classNames('rounded bg-gray-200', h)}></div>
            <div className={classNames('rounded bg-gray-200', h)}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

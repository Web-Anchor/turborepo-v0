import { classNames } from '../dist/utils';
import { statuses } from './cards/ActivityCard';

type ComponentTypes = {
  title?: string | React.ReactNode;
  className?: string;
  status?: string;
};

export function Badge({ status = 'Inactive', ...props }: ComponentTypes) {
  // --------------------------------------------------------------------------------
  // 📌 Main Component for the Page content
  // --------------------------------------------------------------------------------

  return (
    <span
      className={classNames(
        'h-fit inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600',
        statuses[status as keyof typeof statuses],
        props.className
      )}
    >
      {props.title || 'Inactive'}
    </span>
  );
}

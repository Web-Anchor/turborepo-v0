import { classNames } from '../dist/helpers';

type ComponentTypes = {
  className?: string;
  children?: React.ReactNode;
};
export function Filler(props: ComponentTypes) {
  return (
    <div
      className={classNames(
        'overflow-hidden bg-gray-50 sm:rounded-lg text-slate-800',
        props.className
      )}
    >
      <div className="px-4 py-5 sm:p-6 flex justify-center items-center">
        {props.children || 'Filler content'}
      </div>
    </div>
  );
}

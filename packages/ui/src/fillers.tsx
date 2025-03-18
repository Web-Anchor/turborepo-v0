import { classNames } from '../lib/utils';

type ComponentTypes = {
  className?: string;
  children?: React.ReactNode;
};
export function Filler(props: ComponentTypes) {
  return (
    <div
      className={classNames(
        'flex justify-center align-center overflow-hidden bg-gray-50 sm:rounded-lg text-slate-800',
        props.className
      )}
    >
      <div className="px-4 py-5 sm:p-6 flex flex-col justify-center align-center">
        {props.children || <p>Filler content</p>}
      </div>
    </div>
  );
}

import { classNames } from '../dist/helpers';

type ComponentTypes = {
  className?: string;
};
export function Filler(props: ComponentTypes) {
  return (
    <section
      className={classNames(
        'min-w-[200px] h-[200px] rounded-lg bg-gradient-to-br from-gray-200 to-solver-400',
        'border-2 border-gray-300',
        props.className
      )}
    />
  );
}

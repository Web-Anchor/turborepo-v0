import { classNames } from '../dist/utils';

type Defaults = {
  children?: React.ReactNode;
  className?: string;
};

type ComponentTypes = {
  gridSize?: '6x2' | '4x4' | '3x3' | '2x6' | '6x6';
} & Defaults;

export function BentoGrid({ gridSize = '6x2', ...props }: ComponentTypes) {
  // --------------------------------------------------------------------------------
  // 📌  Children to have class of col-span-X columns
  // example: <div className="flex lg:col-span-2">...</div>
  // --------------------------------------------------------------------------------

  return (
    <section
      className={classNames(
        'grid grid-cols-1 gap-4 max-w-4xl my-8 lg:my-16',
        gridToClassName(gridSize),
        props.className
      )}
    >
      {props.children}
    </section>
  );
}

function gridToClassName(grid?: string): string {
  switch (grid) {
    case '6x2':
      return 'lg:grid-cols-6 lg:grid-rows-2';
    case '4x4':
      return 'lg:grid-cols-4 lg:grid-rows-4';
    case '3x3':
      return 'lg:grid-cols-3 lg:grid-rows-3';
    case '2x6':
      return 'lg:grid-cols-2 lg:grid-rows-6';
    default:
      return 'lg:grid-cols-6 lg:grid-rows-6';
  }
}

import { classNames } from '../dist/utils';

type Defaults = {
  children?: React.ReactNode;
  className?: string;
};

type ComponentTypes = {
  gridSize?: '6x2' | '4x4' | '3x3' | '2x6' | '6x6' | '8x8' | '6x1' | '8x1';
} & Defaults;

export function BentoGrid({ gridSize = '8x1', ...props }: ComponentTypes) {
  // --------------------------------------------------------------------------------
  // 📌  Children to have class of col-span-X columns
  // example: <div className="flex lg:col-span-2">...</div>
  // --------------------------------------------------------------------------------

  return (
    <section
      className={classNames(
        'grid grid-cols-1 gap-4 max-w-4xl',
        gridToClassName(gridSize),
        props.className
      )}
    >
      {props.children}
    </section>
  );
}

type GridCardTypes = {
  className?: string;
  children?: React.ReactNode;
};

export function GridCard({ ...props }: GridCardTypes) {
  // --------------------------------------------------------------------------------
  // 📌  Children to have class of col-span-X columns
  // example: <div className="flex lg:col-span-2">...</div>
  // --------------------------------------------------------------------------------

  return (
    <section
      className={classNames(
        'flex flex-wrap gap-4 p-2 bg-white rounded-xl ring-1 ring-white/15 lg:col-span-full overflow-hidden',
        props.className
      )}
    >
      {props.children}
    </section>
  );
}

function gridToClassName(grid?: string): string {
  switch (grid) {
    case '8x1':
      return 'lg:grid-cols-8 lg:grid-rows-1';
    case '6x2':
      return 'lg:grid-cols-6 lg:grid-rows-2';
    case '4x4':
      return 'lg:grid-cols-4 lg:grid-rows-4';
    case '3x3':
      return 'lg:grid-cols-3 lg:grid-rows-3';
    case '2x6':
      return 'lg:grid-cols-2 lg:grid-rows-6';
    case '6x6':
      return 'lg:grid-cols-6 lg:grid-rows-6';
    case '8x8':
      return 'lg:grid-cols-8 lg:grid-rows-8';
    case '6x1':
      return 'lg:grid-cols-6 lg:grid-rows-1';
    default:
      return 'lg:grid-cols-6 lg:grid-rows-6';
  }
}

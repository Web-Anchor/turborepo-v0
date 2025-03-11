import { classNames } from '../dist/utils';

type ComponentTypes = {
  children?: React.ReactNode;
  className?: string;
};

export function PageWrapper({ ...props }: ComponentTypes) {
  // --------------------------------------------------------------------------------
  // 📌 Main Component for the Page content
  // --------------------------------------------------------------------------------

  return (
    <main
      className={classNames(
        'flex flex-col gap-8 flex-1 min-w-0 min-h-0 overflow-auto max-w-screen-2xl px-6 py-8',
        props.className
      )}
    >
      {props.children}
    </main>
  );
}

import { classNames } from '../lib/utils';

type ComponentTypes = {
  children?: React.ReactNode;
  className?: string;
  text?: string;
};
export function PageTitle(props: ComponentTypes) {
  return (
    <h1
      className={classNames(
        'mt-3 text-3xl font-bold tracking-tight',
        props.className
      )}
    >
      {props.text || props.children}
    </h1>
  );
}

export function Paragraph(props: ComponentTypes) {
  return (
    <p className={classNames('mt-2 text-sm/6', props.className)}>
      {props.text || props.children}
    </p>
  );
}

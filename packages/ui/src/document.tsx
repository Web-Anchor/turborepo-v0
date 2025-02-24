import { classNames } from '../dist/helpers';

type ComponentTypes = {
  children?: React.ReactNode;
  className?: string;
  text?: string;
};
export function PageTitle(props: ComponentTypes) {
  return (
    <h1
      className={classNames(
        'mt-3 text-3xl font-extrabold tracking-tight',
        props.className
      )}
    >
      {props.text || props.children}
    </h1>
  );
}

export function Paragraph(props: ComponentTypes) {
  return (
    <p className={classNames('mt-2 max-w-lg text-sm/6', props.className)}>
      {props.text || props.children}
    </p>
  );
}

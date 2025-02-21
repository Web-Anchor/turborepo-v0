import { classNames } from '../dist/helpers';

type ComponentTypes = {
  className?: string;
  text?: string;
};
export function PageTitle(props: ComponentTypes) {
  return (
    <h1
      className={classNames(
        'mt-3 text-3xl font-extrabold tracking-tight text-slate-900',
        props.className
      )}
    >
      {props.text}
    </h1>
  );
}

export function Paragraph(props: ComponentTypes) {
  return (
    <p
      className={classNames(
        'mt-2 max-w-lg text-sm/6 text-slate-500',
        props.className
      )}
    >
      {props.text}
    </p>
  );
}

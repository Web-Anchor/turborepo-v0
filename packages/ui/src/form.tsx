import { classNames } from '../dist/helpers';

type ComponentTypes = {
  className?: string;
  children?: React.ReactNode;
  onSubmit: (data: { [k: string]: FormDataEntryValue }) => void;
};
export function FormWrapper(props: ComponentTypes) {
  function submit(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const data = Object.fromEntries(formData.entries());

      props.onSubmit(data);
    } catch (error) {
      console.error(error);
      // Handle form submission error here
    }
  }

  return (
    <form
      className={classNames('space-y-12', props.className)}
      onSubmit={submit}
    >
      {props.children}
    </form>
  );
}

type InputTypes = {
  className?: string;
  inputClassName?: string;
  type?: 'text' | 'email' | 'password';
  placeholder?: string;
  name: string;
  label?: string;
  value?: string;
  // onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  optional?: boolean;
};

export function TextInput({ type = 'text', ...rest }: InputTypes) {
  return (
    <div className={classNames('flex flex-1 flex-col', rest.className)}>
      <div className="flex justify-between">
        <label
          htmlFor={rest.name}
          className="text-sm/6 font-medium flex self-end"
        >
          {rest.label}
        </label>
        {rest.optional && (
          <span className="text-sm/6 font-medium flex self-end">Optional</span>
        )}
      </div>
      <div className="mt-2 flex flex-1">
        <input
          name={rest.name}
          type={type}
          value={rest.value}
          placeholder={rest.placeholder}
          aria-describedby={`${rest.name} input`}
          className={classNames(
            'block min-w-0 grow bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6',
            'border border-slate-700 rounded-md',
            rest.inputClassName
          )}
        />
      </div>
    </div>
  );
}

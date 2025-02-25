import { classNames, mergeIf } from 'lib/utils';
import { useState } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

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
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  name: string;
  label?: string;
  defaultValue?: string;
  // onChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  optional?: boolean;
};

export function TextInput({ type = 'text', ...rest }: InputTypes) {
  return (
    <div className={classNames('flex flex-1 flex-col', rest.className)}>
      <div className="flex flex-row gap-2">
        <label
          htmlFor={rest.name}
          className="text-sm/6 font-medium flex self-end mr-auto"
        >
          {rest.label}
        </label>
        {rest.optional && (
          <span className="text-sm/6 font-medium flex self-end">Optional</span>
        )}
        {type === 'number' && (
          <>
            {rest.optional && (
              <span className="text-sm/6 font-medium flex self-end">|</span>
            )}
            <span className="text-sm/6 font-medium flex self-end">Number</span>
          </>
        )}
      </div>
      <div className="mt-2 flex flex-1">
        <input
          name={rest.name}
          type={type}
          defaultValue={rest.defaultValue}
          placeholder={rest.placeholder}
          aria-describedby={`${rest.name} input`}
          className={classNames(
            'block min-w-0 grow bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6',
            'border border-slate-700 rounded-md',
            'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none', // Remove number input arrows
            mergeIf(type === 'number', 'appearance-none'), // Remove number input arrows
            rest.inputClassName
          )}
        />
      </div>
    </div>
  );
}

export interface Option {
  label: string;
  value: string;
}

export interface SelectInputTypes {
  name: string;
  label: string;
  placeholder?: string;
  optional?: boolean;
  defaultValue?: string;
  options: Option[];
  inputClassName?: string;
  onChange?: (option: Option) => void;
  className?: string;
}

export function SelectInput({ options, ...rest }: SelectInputTypes) {
  // Find the default selected option
  const defaultOption = options.find(
    (opt) => opt.value === rest.defaultValue
  ) || { label: rest.placeholder || '', value: '' };

  const [selected, setSelected] = useState<Option>(defaultOption);

  return (
    <div className={classNames('flex flex-1 flex-col', rest.className)}>
      <div className="mt-2 relative">
        <Listbox
          value={selected.value}
          onChange={(value: string) => {
            const newOption = options.find(
              (option) => option.value === value
            ) || {
              label: '',
              value: '',
            };
            setSelected(newOption);
            if (rest.onChange) rest.onChange(newOption);
          }}
        >
          {rest.label && (
            <section className="flex flex-row gap-2 justify-between mb-2">
              <Label
                htmlFor={rest.name}
                className="text-sm/6 font-medium flex self-end"
              >
                {rest.label}
              </Label>
              {rest.optional && (
                <span className="text-sm/6 font-medium flex self-end">
                  Optional
                </span>
              )}
            </section>
          )}
          <ListboxButton
            name={rest.name}
            className={classNames(
              'min-h-9 block w-full bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500',
              'border border-slate-700 rounded-md focus:outline-none focus:outline-2 focus:outline-indigo-600 sm:text-sm/6',
              rest.inputClassName
            )}
          >
            <span className="flex justify-start truncate">
              {selected.label || rest.placeholder}
            </span>
          </ListboxButton>
          <ListboxOptions className="absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => {
              return (
                <ListboxOption
                  key={option.value}
                  value={option.value}
                  className={() => {
                    return classNames(
                      'cursor-pointer select-none relative py-2 pl-3 pr-9'
                    );
                  }}
                >
                  {({ focus, selected }) => {
                    return (
                      <>
                        <span
                          className={classNames(
                            'block truncate',
                            focus ? 'font-semibold' : 'font-normal'
                          )}
                        >
                          {option.label}
                        </span>
                        {selected && (
                          <span
                            className={classNames(
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                              mergeIf(selected, 'text-white')
                            )}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              viewBox="0 0 256 256"
                            >
                              <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                            </svg>
                          </span>
                        )}
                      </>
                    );
                  }}
                </ListboxOption>
              );
            })}
          </ListboxOptions>
        </Listbox>
      </div>
    </div>
  );
}

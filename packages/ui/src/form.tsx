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
          defaultValue={rest.defaultValue}
          placeholder={rest.placeholder}
          aria-describedby={`${rest.name} input`}
          className={classNames(
            'block min-w-0 grow bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6',
            'border border-slate-700 rounded-md',
            mergeIf(type === 'number', 'appearance-none'), // Remove number input arrows
            rest.inputClassName
          )}
        />
      </div>
    </div>
  );
}

// select input
type SelectInputTypes = {
  className?: string;
  inputClassName?: string;
  name: string;
  label?: string;
  defaultValue?: string;
  options: { label: string; value: string }[];
  optional?: boolean;
  multiple?: boolean;
  placeholder?: string;
};

export function SelectInput({ options, ...rest }: SelectInputTypes) {
  const [selected, setSelected] = useState<{ label?: string; value?: string }>({
    label: rest.defaultValue || rest.placeholder,
  });
  console.log('selected', selected);

  return (
    <Listbox
      value={selected || []}
      onChange={(value) => {
        setSelected(
          options.find((option) => option.value === value) || {
            label: '',
            value: '',
          }
        );
      }}
    >
      <section>
        <Label className="block text-sm/6 font-medium text-white">
          {rest.label}
        </Label>
        <div className="relative">
          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white/5 py-1.5 pl-3 pr-2 text-left text-white outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
            <span className="col-start-1 row-start-1 flex w-full gap-2 pr-6">
              <span className="truncate">{selected?.label}</span>
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              className="col-start-2 row-start-1 self-center h-5 w-5 text-gray-500"
              viewBox="0 0 256 256"
            >
              <path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path>
            </svg>
          </ListboxButton>

          <ListboxOptions
            transition
            className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/5 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
          >
            {options.map((item, index) => (
              <ListboxOption
                key={index}
                value={item?.value}
                className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-white data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <div className="flex">
                  <span className="truncate font-normal group-data-[selected]:font-semibold">
                    {item.label}
                  </span>
                </div>

                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="currentColor"
                    className="h-5 w-5"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                  </svg>
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </section>
    </Listbox>
  );
}

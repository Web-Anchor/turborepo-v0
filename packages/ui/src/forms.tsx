'use client';

import { classNames, mergeIf } from '../dist/utils';
import { useState } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Switch,
} from '@headlessui/react';
import { Button } from './buttons';
import { MagnifyingGlass, Check, Warning } from '@phosphor-icons/react';

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
  disabled?: boolean;
};

export function TextInput({ type = 'text', ...rest }: InputTypes) {
  return (
    <div
      className={classNames(
        'flex flex-1 flex-col',
        mergeIf(!!rest.disabled, 'opacity-25'),
        rest.className
      )}
    >
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
          disabled={rest.disabled}
        />
      </div>
    </div>
  );
}

// textarea input
type TextAreaTypes = {
  className?: string;
  inputClassName?: string;
  placeholder?: string;
  name: string;
  label?: string;
  defaultValue?: string;
  optional?: boolean;
};

export function TextAreaInput({ ...rest }: TextAreaTypes) {
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
      </div>
      <div className="mt-2 flex flex-1">
        <textarea
          name={rest.name}
          defaultValue={rest.defaultValue}
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

export interface Option {
  label: string;
  value: string;
}

export interface SelectInputTypes {
  name: string;
  label?: string;
  placeholder?: string;
  optional?: boolean;
  defaultValue?: string;
  options: Option[];
  inputClassName?: string;
  onChange?: (option: Option) => void;
  className?: string;
  description?: string | React.ReactNode;
}

export function SelectInput({ options, ...rest }: SelectInputTypes) {
  // Find the default selected option
  const defaultOption = options.find(
    (opt) => opt.value === rest.defaultValue
  ) || { label: rest.placeholder || '', value: '' };

  const [selected, setSelected] = useState<Option>(defaultOption);
  const isOtherSelected = selected.value === 'OTHER';

  return (
    <div className={classNames('flex flex-1 flex-col', rest.className)}>
      <div className="mt-2 relative">
        {!isOtherSelected && (
          <Listbox
            value={selected.value || ''}
            onChange={(value: string) => {
              const newOption = options.find(
                (option) => option.value === value
              ) || {
                label: '',
                value: '',
              };
              setSelected(newOption);
              rest.onChange?.(newOption);
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
              <span
                className={classNames(
                  'flex justify-start truncate',
                  selected.value ? '' : 'text-gray-500'
                )}
              >
                {selected.label || rest.placeholder}
              </span>

              {/* FORM hidden input to store the selected value */}
              <input
                type="hidden"
                name={rest.name}
                value={selected.value || rest.defaultValue || ''}
                aria-describedby={`${rest.name} input`}
              />
            </ListboxButton>
            <ListboxOptions className="absolute z-10 mt-4 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {options.length === 0 && <NotFoundPlaceholder />}
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
                            <Check className="absolute inset-y-0 right-0 flex items-center pr-4" />
                          )}
                        </>
                      );
                    }}
                  </ListboxOption>
                );
              })}
            </ListboxOptions>
          </Listbox>
        )}
        {/* show text input when OTHER is selected */}
        {isOtherSelected && (
          <section className="relative">
            <TextInput
              {...rest}
              name={rest.name}
              label={`${rest.label} | Other`}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="absolute inset-y-[34px] right-0 flex items-center pr-2 hover:text-gray-400 cursor-pointer opacity-85"
              onClick={() => setSelected(defaultOption)}
            >
              <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
            </svg>
          </section>
        )}
      </div>
    </div>
  );
}

// switch input
type SwitchInputTypes = {
  className?: string;
  name?: string;
  label?: string;
  defaultValue?: boolean;
  optional?: boolean;
  onChange?: (checked: boolean) => void;
};

export function SwitchInput({ name = '', ...rest }: SwitchInputTypes) {
  const [enabled, setEnabled] = useState(rest.defaultValue || false);
  console.log('enabled', enabled);

  function toggle() {
    console.log('toggle');

    setEnabled(!enabled);
    rest.onChange?.(!enabled);
  }

  return (
    <Switch
      checked={enabled}
      onChange={toggle}
      className="group relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden data-checked:bg-indigo-600"
    >
      <input
        type="checkbox"
        name={name}
        value={enabled.toString()}
        className="hidden"
      />
      <span className="sr-only">Use setting</span>
      <span className="pointer-events-none relative inline-block size-5 transform rounded-full bg-white ring-0 shadow-sm transition duration-200 ease-in-out group-data-checked:translate-x-5">
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center transition-opacity duration-200 ease-in group-data-checked:opacity-0 group-data-checked:duration-100 group-data-checked:ease-out"
        >
          <svg fill="none" viewBox="0 0 12 12" className="size-3 text-gray-400">
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span
          aria-hidden="true"
          className="absolute inset-0 flex size-full items-center justify-center opacity-0 transition-opacity duration-100 ease-out group-data-checked:opacity-100 group-data-checked:duration-200 group-data-checked:ease-in"
        >
          <svg
            fill="currentColor"
            viewBox="0 0 12 12"
            className="size-3 text-indigo-600"
          >
            <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
          </svg>
        </span>
      </span>
    </Switch>
  );
}

// search with lookup functionality. have dropdown with search results. hoovered item is highlighted. onClick item is selected and input is updated with callBack function
type SearchInputTypes = Omit<SelectInputTypes, 'onChange' | 'options'> & {
  options?: Option[];
  type?: 'text' | 'number' | 'email' | 'password';
  onChange?: (value: string) => void;
  onClick?: (value: string) => void;
  onSelect?: (option: Option) => void;
  notFoundPlaceholder?: string | React.ReactNode;
  dropdownClassName?: string;
};

export function SearchInput({
  name = '',
  options,
  type = 'text',
  ...rest
}: SearchInputTypes) {
  const [state, setState] = useState<{ options?: Option; input?: string }>({
    options: { label: '', value: '' },
  });

  const handleClick = (value: string) => {
    setState((prev) => ({ ...prev, options: undefined }));
    rest?.onChange?.(value);
    rest?.onClick?.(value);
  };

  const handleSelect = (option: Option) => {
    setState((prev) => ({ ...prev, options: option, input: undefined }));
    rest.onSelect?.(option);
  };

  return (
    <div className={classNames('flex flex-1 flex-col', rest.className)}>
      <div className="relative flex flex-col gap-2">
        <Listbox
          value={state?.options?.value || ''}
          onChange={(value: string) => {
            const newOption = options?.find(
              (option) => option.value === value
            ) || {
              label: '',
              value: '',
            };
            setState((prev) => ({ ...prev, options: newOption }));
            rest.onChange?.(value);
          }}
        >
          {rest.label && (
            <section className="flex flex-row gap-2 justify-between">
              <Label
                htmlFor={name}
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
          <section
            className={classNames(
              'relative',
              'flex flex-row gap-4',
              'min-w-0 grow text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6',
              'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none', // Remove number input arrows
              rest.inputClassName
            )}
          >
            {/* FORM hidden input to store the selected value */}
            <input
              type="hidden"
              name={name}
              value={state?.options?.value || ''}
              aria-describedby={`${name} input`}
            />
            <input
              type={type}
              value={state?.options?.label || state?.input || ''}
              defaultValue={rest.defaultValue}
              placeholder={rest.placeholder}
              aria-describedby={`${name} input`}
              className={classNames(
                'block w-full min-w-0 grow bg-white/5 px-3 py-1.5 text-base text-white placeholder:text-gray-500 focus:outline focus:outline-0 sm:text-sm/6',
                'border border-slate-700 rounded-md',
                'appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none', // Remove number input arrows
                mergeIf(type === 'number', 'appearance-none'), // Remove number input arrows
                rest.inputClassName
              )}
              onChange={(e) => {
                rest.onChange?.(e.target.value);
                setState((prev) => ({
                  ...prev,
                  input: e.target.value,
                  options: undefined,
                }));
              }}
            />
            <Button
              type="button"
              onClick={() => handleClick(state.input || '')}
            >
              <MagnifyingGlass className="w-6 h-6 text-white" />
            </Button>
          </section>
          <section
            className={classNames(
              'absolute z-10 mt-[80px] max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm',
              mergeIf(
                (options?.length === 0 && !state?.input) || !state?.input,
                'hidden'
              ),
              rest.dropdownClassName
            )}
          >
            {options?.length === 0 && (
              <NotFoundPlaceholder
                title={
                  rest.notFoundPlaceholder ||
                  'No results found. Try searching for something else.'
                }
              />
            )}

            {options?.map((option, key: number) => {
              return (
                <section
                  key={key}
                  className={classNames(
                    'cursor-pointer select-none relative py-2 pl-3 pr-9 hover:text-white/6 hover:bg-indigo-300'
                  )}
                  onClick={() => handleSelect(option)}
                >
                  <span className={classNames('block truncate')}>
                    {option.label}
                  </span>
                  {state.options?.value === option.value && (
                    <Check className="absolute top-2 right-0 flex items-center pr-4 text-white size-8 shrink-0" />
                  )}
                </section>
              );
            })}
          </section>
        </Listbox>
        {rest.description && (
          <div className="text-sm/6 text-gray-500">{rest.description}</div>
        )}
      </div>
    </div>
  );
}

function NotFoundPlaceholder({
  ...rest
}: {
  title?: string | React.ReactNode;
}) {
  return (
    <div className="border-l-4 border-yellow-400 bg-yellow-50 px-4 py-2">
      <div className="flex">
        <div className="shrink-0">
          <Warning className="h-5 w-5 text-yellow-700" />
        </div>
        <div className="ml-3">
          <section className="text-sm text-yellow-700">
            {rest.title || 'No results found!'}
          </section>
        </div>
      </div>
    </div>
  );
}

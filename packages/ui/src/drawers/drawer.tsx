import { classNames } from '../../lib/utils';
import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type DrawerProps = {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
};

export function Drawer({ open = false, ...rest }: DrawerProps) {
  function onClose() {
    rest.onClose?.();
  }

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <div className="fixed inset-0" />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700"
            >
              <section
                className={classNames(
                  'flex h-full flex-col overflow-y-scroll bg-gray-800 shadow-xl',
                  rest.className
                )}
              >
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                >
                  <span className="absolute -inset-2.5" />
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>

                {rest.children}
              </section>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

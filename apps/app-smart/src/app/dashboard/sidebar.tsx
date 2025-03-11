'use client';

import type { Metadata } from 'next';
import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from '@headlessui/react';
import {
  Bars3Icon,
  ChartPieIcon,
  Bars3BottomLeftIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import {
  HouseSimple,
  Cube,
  RowsPlusBottom,
  CalendarDots,
  CloudArrowUp,
  ArrowsIn,
  ShoppingCart,
  Tag,
  Ruler,
  CardsThree,
} from '@phosphor-icons/react';
import { classNames } from 'lib/utils';
import { usePathname } from 'next/navigation';
import Image from 'components/Wrappers/Image';
import Link from 'components/Wrappers/Link';
import { ClerkUser } from 'types/data-types';
import { useWhoIAm } from 'hooks/users';
import MemoWrapper from 'components/Wrappers/MemoWrapper';
import { mergeIf } from '@repo/ui/utils.ts';

export const metadata: Metadata = {
  title: 'Dashboard 📦',
};

type SidebarTypes = {
  children: React.ReactNode;
};

type SidebarState = {
  sidebarOpen: boolean;
  sidebarWidth?: string; // Sidebar width
};

export default function RootLayout({ children }: SidebarTypes) {
  const [state, setState] = useState<SidebarState>({
    sidebarOpen: false,
  });
  const path = usePathname();
  const sm = state?.sidebarWidth;
  const { data: user } = useWhoIAm();

  return (
    <div>
      <Dialog
        open={state?.sidebarOpen}
        onClose={() => setState((prev) => ({ ...prev, sidebarOpen: false }))}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() =>
                    setState((prev) => ({ ...prev, sidebarOpen: false }))
                  }
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
              <div className="flex h-16 shrink-0 items-center">
                <UserImageWrapper user={user} />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      <MenuWrapper path={path} />
                    </ul>
                  </li>
                  <li>
                    {!sm && (
                      <div className="text-xs/6 font-semibold text-gray-400">
                        Your teams
                      </div>
                    )}
                    <ul role="list" className="-mx-2 mt-2 space-y-1">
                      {secondaryMenu().map((team) => (
                        <li key={team.name}>
                          <Link
                            href={team.href}
                            className={classNames(
                              team.current
                                ? 'bg-gray-800 text-white'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                              'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                            )}
                          >
                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                              {team.initial}
                            </span>
                            {!sm && (
                              <span className="truncate">{team.name}</span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ✅ Static sidebar for desktop */}
      <div
        className={classNames(
          'hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col border-r border-tertiary',
          state?.sidebarWidth
        )}
      >
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center gap-5 flex-row">
            <Image
              src="https://picsum.photos/100"
              alt="Your Company"
              size="xSmall"
              className="h-10 w-10 rounded-md"
            />
            {!sm && (
              <p className="text-white text-sm/6 font-semibold">SMART 📦</p>
            )}
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  <MenuWrapper type={sm ? 'sm' : undefined} path={path} />
                </ul>
              </li>
              <li>
                {!sm && (
                  <div className="text-xs/6 font-semibold text-gray-400">
                    Your teams
                  </div>
                )}
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {secondaryMenu().map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className={classNames(
                          path === item.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        )}
                      >
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {item.initial}
                        </span>
                        <span className="truncate">{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <section
                  className={classNames(
                    'relative flex flex-row items-center gap-x-4',
                    sm && 'flex-col'
                  )}
                >
                  <Link
                    href="/dashboard/settings"
                    className="flex flex-1 gap-x-4 px-4 py-3 text-sm/6 font-semibold order-2"
                  >
                    <section className="flex flex-row gap-3 items-center rounded-md px-3 py-2 flex-1 text-white hover:bg-[#33415580] hover:text-slate-400 transition-all duration-300">
                      <UserImageWrapper user={user} />
                      <span className="sr-only">Your profile</span>
                      {!sm && (
                        <span aria-hidden="true" className="line-clamp-1">
                          {user?.firstName || user?.lastName || 'Anonymous'}
                        </span>
                      )}
                    </section>
                  </Link>
                  <button
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,
                        sidebarWidth: prev?.sidebarWidth
                          ? undefined
                          : 'lg:w-20',
                      }))
                    }
                    className={classNames(
                      'flex items-center order-3 gap-x-4 p-2 rounded-md cursor-pointer text-white ml-auto mr-4 hover:bg-gray-800',
                      sm && 'm-auto order-1'
                    )}
                  >
                    <ArrowsIn
                      aria-hidden="true"
                      className="size-4 shrink-0 text-white justify-end hover:text-gray-200"
                    />
                  </button>
                </section>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          onClick={() => setState((prev) => ({ ...prev, sidebarOpen: true }))}
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon aria-hidden="true" className="size-6" />
        </button>
        <div className="flex-1 text-sm/6 font-semibold text-white">
          Dashboard
        </div>
        <Link href="#">
          <span className="sr-only">Your profile</span>
          <UserImageWrapper user={user} />
        </Link>
      </div>

      <MemoWrapper>
        <main className={classNames('py-10 lg:pl-72', sm && 'lg:pl-20')}>
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </MemoWrapper>
    </div>
  );
}

function MenuWrapper({ path, type }: { path: string; type?: 'sm' }) {
  const sm = type === 'sm';

  return (
    <>
      {primaryMenu().map((item: NavigationItem, key: number) => {
        return (
          <li key={key}>
            <Link
              href={item.href}
              className={classNames(
                path === item.href
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
              )}
            >
              {item.icon && (
                <item.icon
                  aria-hidden="true"
                  className={classNames(
                    'size-6 shrink-0',
                    mergeIf(sm, 'm-auto')
                  )}
                />
              )}
              {!sm && item.name}
            </Link>
            {/* Menu sub navigation */}
            {item.navigation && path.includes(item.href) && (
              <ul
                role="list"
                className={classNames(
                  'ml-4 space-y-1 my-1',
                  mergeIf(sm, 'ml-0')
                )}
              >
                {item.navigation.map((subItem: NavigationItem, key: number) => {
                  return (
                    <li key={key}>
                      <Link
                        href={subItem.href}
                        className={classNames(
                          path === subItem.href
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                          'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold'
                        )}
                      >
                        {subItem.icon && (
                          <subItem.icon
                            aria-hidden="true"
                            className="size-6 shrink-0"
                          />
                        )}
                        {subItem.initial && (
                          <span
                            className={classNames(
                              'flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white',
                              subItem.theme
                            )}
                          >
                            {subItem.initial}
                          </span>
                        )}

                        {!sm && subItem.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </>
  );
}

function UserImageWrapper({ user }: { user?: ClerkUser | null }) {
  return (
    <Image
      src={user?.imageUrl}
      alt={user?.firstName || 'Anonymous'}
      size="xSmall"
      className="h-8 w-8 rounded-full min-w-8"
    />
  );
}

type NavigationItem = {
  name: string;
  href: string;
  icon?: React.ElementType;
  initial?: React.ReactNode;
  navigation?: NavigationItem[];
  theme?: string;
};

function primaryMenu(): NavigationItem[] {
  const navigation: NavigationItem[] = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: HouseSimple,
    },
    {
      name: 'Inventory',
      href: '/dashboard/inventory',
      icon: Cube,
      navigation: [
        {
          name: 'Add Inventory Item',
          href: '/dashboard/inventory/create',
          initial: <p>I</p>,
          theme: 'bg-indigo text-green-600',
        },
      ],
    },
    {
      name: 'Orders',
      href: '/dashboard/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Products',
      href: '/dashboard/products',
      icon: Tag,
      navigation: [
        {
          name: 'Create Product',
          href: '/dashboard/products/create',
          initial: <p>P</p>,
        },
      ],
    },
    {
      name: 'BOM',
      href: '/dashboard/bom',
      icon: Ruler,
      navigation: [
        {
          name: 'Create BOM',
          href: '/dashboard/bom/create',
          initial: <p>B</p>,
        },
      ],
    },
    {
      name: 'Clusters',
      href: '/dashboard/clusters',
      icon: CardsThree,
    },
    {
      name: 'Teams',
      href: '/dashboard/teams',
      icon: UserGroupIcon,
    },
    {
      name: 'List Groups',
      href: '/dashboard/groups',
      icon: RowsPlusBottom,
    },
    {
      name: 'Lists',
      href: '/dashboard/lists',
      icon: Bars3BottomLeftIcon,
    },
    {
      name: 'Maintenance',
      href: '/dashboard/maintenance',
      icon: CalendarDots,
    },
    {
      name: 'Documents',
      href: '/dashboard/documents',
      icon: CloudArrowUp,
    },
    {
      name: 'Reports',
      href: 'dashboard/reports',
      icon: ChartPieIcon,
    },
  ];

  return navigation;
}

function secondaryMenu() {
  const teams = [
    {
      name: 'Reports',
      href: '/dashboard/reports',
      initial: 'R',
      current: false,
    },
    {
      name: 'Integrations',
      href: '/dashboard/integrations',
      initial: 'I',
      current: false,
    },
    {
      name: 'Setting',
      href: '/dashboard/settings',
      initial: 'S',
      current: false,
    },
  ];

  return teams;
}

<template>
  <Popover
    as="header"
    class="bg-gradient-to-r from-sky-800 to-cyan-600 pb-24"
    v-slot="{ open }"
  >
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div
        class="
          relative
          flex flex-wrap
          items-center
          justify-center
          lg:justify-between
        "
      >
        <!-- Logo -->
        <div class="absolute left-0 flex-shrink-0 py-5 lg:static">
          <a href="#">
            <span class="sr-only">Your Company</span>
            <img
              class="h-12 w-auto px-2"
              src="./../assets/logo.png"
              alt="Pfadfinderlilie"
            />
          </a>
        </div>

        <!-- Right section on desktop -->
        <div class="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
          <button
            type="button"
            class="
              flex-shrink-0
              rounded-full
              p-1
              text-cyan-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="relative ml-4 flex-shrink-0">
            <div>
              <MenuButton
                class="
                  flex
                  rounded-full
                  bg-white
                  text-sm
                  ring-2 ring-white ring-opacity-20
                  focus:outline-none focus:ring-opacity-100
                "
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
              </MenuButton>
            </div>
            <transition
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="
                  absolute
                  -right-2
                  z-10
                  mt-2
                  w-48
                  origin-top-right
                  rounded-md
                  bg-white
                  py-1
                  shadow-lg
                  ring-1 ring-black ring-opacity-5
                  focus:outline-none
                "
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div
          class="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20"
        >
          <div class="lg:grid lg:grid-cols-3 lg:items-center lg:gap-8">
            <!-- Left nav -->
            <div class="hidden lg:col-span-2 lg:block">
              <nav class="flex space-x-4">
                <a
                  v-for="item in navigation"
                  :key="item.name"
                  :href="item.href"
                  :class="[
                    item.current ? 'text-white' : 'text-cyan-100',
                    'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10',
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  >{{ item.name }}</a
                >
              </nav>
            </div>
            <div class="px-12 lg:px-0">
              <!-- Search -->
              <div class="mx-auto w-full max-w-xs lg:max-w-md">
                <label for="search" class="sr-only">Search</label>
                <div class="relative text-white focus-within:text-gray-600">
                  <div
                    class="
                      pointer-events-none
                      absolute
                      inset-y-0
                      left-0
                      flex
                      items-center
                      pl-3
                    "
                  >
                    <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search"
                    class="
                      block
                      w-full
                      rounded-md
                      border border-transparent
                      bg-white bg-opacity-20
                      py-2
                      pl-10
                      pr-3
                      leading-5
                      text-white
                      placeholder-white
                      focus:border-transparent
                      focus:bg-opacity-100
                      focus:text-gray-900
                      focus:placeholder-gray-500
                      focus:outline-none
                      focus:ring-0
                      sm:text-sm
                    "
                    placeholder="Search"
                    type="search"
                    name="search"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Menu button -->
        <div class="absolute right-0 flex-shrink-0 lg:hidden">
          <!-- Mobile menu button -->
          <PopoverButton
            class="
              inline-flex
              items-center
              justify-center
              rounded-md
              bg-transparent
              p-2
              text-cyan-200
              hover:bg-white hover:bg-opacity-10 hover:text-white
              focus:outline-none focus:ring-2 focus:ring-white
            "
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </PopoverButton>
        </div>
      </div>
    </div>

    <TransitionRoot as="template" :show="open">
      <div class="lg:hidden">
        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <PopoverOverlay class="fixed inset-0 z-20 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="duration-150 ease-out"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <PopoverPanel
            focus
            class="
              absolute
              inset-x-0
              top-0
              z-30
              mx-auto
              w-full
              max-w-3xl
              origin-top
              transform
              p-2
              transition
            "
          >
            <div
              class="
                divide-y divide-gray-200
                rounded-lg
                bg-white
                shadow-lg
                ring-1 ring-black ring-opacity-5
              "
            >
              <div class="pt-3 pb-2">
                <div class="flex items-center justify-between px-4">
                  <div>
                    <img
                      class="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=cyan&shade=600"
                      alt="Your Company"
                    />
                  </div>
                  <div class="-mr-2">
                    <PopoverButton
                      class="
                        inline-flex
                        items-center
                        justify-center
                        rounded-md
                        bg-white
                        p-2
                        text-gray-400
                        hover:bg-gray-100 hover:text-gray-500
                        focus:outline-none
                        focus:ring-2
                        focus:ring-inset
                        focus:ring-cyan-500
                      "
                    >
                      <span class="sr-only">Close menu</span>
                      <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </PopoverButton>
                  </div>
                </div>
                <div class="mt-3 space-y-1 px-2">
                  <a
                    v-for="item in navigation"
                    :key="item.name"
                    :href="item.href"
                    class="
                      block
                      rounded-md
                      px-3
                      py-2
                      text-base
                      font-medium
                      text-gray-900
                      hover:bg-gray-100 hover:text-gray-800
                    "
                    >{{ item.name }}</a
                  >
                </div>
              </div>
              <div class="pt-4 pb-2">
                <div class="flex items-center px-5">
                  <div class="flex-shrink-0">
                    <img
                      class="h-10 w-10 rounded-full"
                      :src="user.imageUrl"
                      alt=""
                    />
                  </div>
                  <div class="ml-3 min-w-0 flex-1">
                    <div class="truncate text-base font-medium text-gray-800">
                      {{ user.name }}
                    </div>
                    <div class="truncate text-sm font-medium text-gray-500">
                      {{ user.email }}
                    </div>
                  </div>
                  <button
                    type="button"
                    class="
                      ml-auto
                      flex-shrink-0
                      rounded-full
                      bg-white
                      p-1
                      text-gray-400
                      hover:text-gray-500
                      focus:outline-none
                      focus:ring-2
                      focus:ring-cyan-500
                      focus:ring-offset-2
                    "
                  >
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div class="mt-3 space-y-1 px-2">
                  <a
                    v-for="item in userNavigation"
                    :key="item.name"
                    :href="item.href"
                    class="
                      block
                      rounded-md
                      px-3
                      py-2
                      text-base
                      font-medium
                      text-gray-900
                      hover:bg-gray-100 hover:text-gray-800
                    "
                    >{{ item.name }}</a
                  >
                </div>
              </div>
            </div>
          </PopoverPanel>
        </TransitionChild>
      </div>
    </TransitionRoot>
  </Popover>
</template>

<script setup>
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverOverlay,
  PopoverPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import {
  AcademicCapIcon,
  BanknotesIcon,
  Bars3Icon,
  BellIcon,
  CheckBadgeIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

const user = {
  name: "Chelsea Hagon",
  email: "chelsea.hagon@example.com",
  role: "Human Resources Manager",
  imageUrl:
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};
const navigation = [
  { name: "Home", href: "#", current: true },
  { name: "Personen", href: "#", current: false },
  { name: "Gruppen", href: "#", current: false },
  { name: "Veranstaltungen", href: "#", current: false },
];
const userNavigation = [
  { name: "Dein Profil", href: "#" },
  { name: "Einstellungen", href: "#" },
  { name: "Logout", href: "#" },
];
const stats = [
  { label: "", value: 12 },
  { label: "Sick days left", value: 4 },
  { label: "Personal days left", value: 2 },
];
const actions = [
  {
    icon: ClockIcon,
    name: "Request time off",
    href: "#",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    icon: CheckBadgeIcon,
    name: "Benefits",
    href: "#",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    icon: UsersIcon,
    name: "Schedule a one-on-one",
    href: "#",
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    icon: BanknotesIcon,
    name: "Payroll",
    href: "#",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    icon: ReceiptRefundIcon,
    name: "Submit an expense",
    href: "#",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    icon: AcademicCapIcon,
    name: "Training",
    href: "#",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];
const recentHires = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
  },
];
const announcements = [
  {
    id: 1,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.",
  },
  {
    id: 2,
    title: "New password policy",
    href: "#",
    preview:
      "Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.",
  },
  {
    id: 3,
    title: "Office closed on July 2nd",
    href: "#",
    preview:
      "Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.",
  },
];
</script>
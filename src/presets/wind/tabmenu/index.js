export default {
  root: {
    class: 'overflow-x-auto'
  },
  menu: {
    class: [
      // Flexbox
      'flex flex-1',

      // Spacing
      'list-none',
      'p-0 m-0',

      // Colors
      // 'bg-background-0 dark:bg-background-700',
      'border-b border-background-200 dark:border-background-600',
      'text-background-900 dark:text-background-0/80'
    ]
  },
  menuitem: {
    class: 'mr-0'
  },
  action: ({ context, state }) => ({
    class: [
      'relative',

      // Font
      'font-medium',
      'text-md',

      // Flexbox and Alignment
      'flex items-center',

      // Spacing
      'py-4 px-3',
      '-mb-[1px]',

      // Shape
      'border-b-2',
      'rounded-t-md',

      // Colors and Conditions
      {
        'border-background-200 dark:border-background-600': state.d_activeIndex !== context.index,
        // 'bg-background-0 dark:bg-background-800': state.d_activeIndex !== context.index,
        'text-background-700 dark:text-background-0/80': state.d_activeIndex !== context.index,

        // 'bg-background-0 dark:bg-background-800': state.d_activeIndex === context.index,
        'border-primary-500 dark:border-primary-400': state.d_activeIndex === context.index,
        'text-primary-500 dark:text-primary-400': state.d_activeIndex === context.index
      },

      // States
      'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset',
      'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
      {
        'hover:bg-background-0 dark:hover:bg-background-700/80':
          state.d_activeIndex !== context.index,
        'hover:border-background-400 dark:hover:border-background-500':
          state.d_activeIndex !== context.index,
        'hover:text-background-900 dark:hover:text-background-0':
          state.d_activeIndex !== context.index
      },

      // Transitions
      'transition-all duration-200',

      // Misc
      'cursor-pointer select-none text-decoration-none',
      'overflow-hidden',
      'user-select-none',
      'whitespace-nowrap'
    ]
  }),
  icon: {
    class: 'mr-2'
  }
}

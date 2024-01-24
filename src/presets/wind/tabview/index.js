export default {
  navContainer: ({ props }) => ({
    class: [
      // Position
      'relative',

      // Misc
      { 'overflow-hidden': props.scrollable }
    ]
  }),
  navContent: {
    class: [
      // Overflow and Scrolling
      'overflow-y-hidden overscroll-contain',
      'overscroll-auto',
      'scroll-smooth',
      '[&::-webkit-scrollbar]:hidden'
    ]
  },
  previousButton: {
    class: [
      // Flexbox and Alignment
      'flex items-center justify-center',

      // Position
      '!absolute',
      'top-0 left-0',
      'z-20',

      // Size and Shape
      'h-full w-12',
      'rounded-none',

      // Colors
      'bg-background-0 dark:bg-background-800',
      'text-primary-500 dark:text-primary-400',
      'shadow-md'
    ]
  },
  nextButton: {
    class: [
      // Flexbox and Alignment
      'flex items-center justify-center',

      // Position
      '!absolute',
      'top-0 right-0',
      'z-20',

      // Size and Shape
      'h-full w-12',
      'rounded-none',

      // Colors
      'bg-background-0 dark:bg-background-800',
      'text-primary-500 dark:text-primary-400',
      'shadow-md'
    ]
  },
  nav: {
    class: [
      // Flexbox
      'flex flex-1',

      // Spacing
      'list-none',
      'p-0 m-0',

      // Colors
      'bg-background-0 dark:bg-background-800',
      'border-b border-background-200 dark:border-background-700',
      'text-background-900 dark:text-background-0/80'
    ]
  },
  tabpanel: {
    header: ({ props }) => ({
      class: [
        // Spacing
        'mr-0',

        // Misc
        {
          'opacity-60 cursor-default user-select-none select-none pointer-events-none':
            props?.disabled
        }
      ]
    }),
    headerAction: ({ parent, context }) => ({
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
          'border-background-200 dark:border-background-700':
            parent.state.d_activeIndex !== context.index,
          'bg-background-0 dark:bg-background-800': parent.state.d_activeIndex !== context.index,
          'text-background-700 dark:text-background-0/80':
            parent.state.d_activeIndex !== context.index,

          // eslint-disable-next-line no-dupe-keys
          'bg-background-0 dark:bg-background-800': parent.state.d_activeIndex === context.index,
          'border-primary-500 dark:border-primary-400':
            parent.state.d_activeIndex === context.index,
          'text-primary-500 dark:text-primary-400': parent.state.d_activeIndex === context.index
        },

        // States
        'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset',
        'focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',
        {
          'hover:bg-background-0 dark:hover:bg-background-800/80':
            parent.state.d_activeIndex !== context.index,
          'hover:border-background-400 dark:hover:border-background-600':
            parent.state.d_activeIndex !== context.index,
          'hover:text-background-900 dark:hover:text-background-0':
            parent.state.d_activeIndex !== context.index
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
    headerTitle: {
      class: [
        // Text
        'leading-none',
        'whitespace-nowrap'
      ]
    },
    content: {
      class: [
        // Spacing
        'p-6',

        // Shape
        'rounded-b-md',

        // Colors
        'bg-background-0 dark:bg-background-800',
        'text-background-700 dark:text-background-0/80',
        'border-0'
      ]
    }
  }
}

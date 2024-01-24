export default {
  root: {
    class: 'shadow-md rounded-lg'
  },
  header: ({ props }) => ({
    class: [
      // Alignments
      'flex items-center justify-between',

      // Colors
      'text-background-700 dark:text-background-0/80',
      'bg-background-0 dark:bg-background-900',
      'border-b border-background-200 dark:border-background-800',

      //Shape
      'rounded-tl-lg rounded-tr-lg',

      // Conditional Spacing
      { 'px-5 md:px-6 py-5': !props.toggleable, 'py-3 px-5 md:px-6': props.toggleable }
    ]
  }),
  title: {
    class: 'leading-none font-medium'
  },
  toggler: {
    class: [
      // Alignments
      'inline-flex items-center justify-center',

      // Sized
      'w-8 h-8',

      //Shape
      'border-0 rounded-full',

      //Color
      'bg-transparent',
      'text-background-600 dark:text-background-100/80',

      // States
      'hover:text-background-900 dark:hover:text-background-0/80',
      'hover:bg-background-50 dark:hover:bg-background-800/50',
      'focus:outline-none focus:outline-offset-0 focus-visible:ring-2 focus-visible:ring-primary-600 focus-visible:ring-inset dark:focus-visible:ring-primary-500',

      // Transitions
      'transition duration-200 ease-in-out',

      // Misc
      'overflow-hidden relative no-underline'
    ]
  },
  togglerIcon: {
    class: 'inline-block'
  },
  content: {
    class: [
      // Spacing
      'py-6 px-5 md:px-6',

      // Shape
      'last:rounded-br-lg last:rounded-bl-lg',

      //Color
      'bg-background-0 dark:bg-background-900',
      'text-background-700 dark:text-background-0/80'
    ]
  },
  footer: {
    class: [
      // Spacing
      'py-6 px-5 md:px-6',

      //Shape
      'rounded-bl-lg rounded-br-lg',

      // Color
      'bg-background-0 dark:bg-background-900',
      'text-background-600 dark:text-background-0/70',
      'border-t border-background-200 dark:border-background-800'
    ]
  },
  transition: {
    enterFromClass: 'max-h-0',
    enterActiveClass:
      'overflow-hidden transition-[max-height] duration-1000 ease-[cubic-bezier(0.42,0,0.58,1)]',
    enterToClass: 'max-h-[1000px]',
    leaveFromClass: 'max-h-[1000px]',
    leaveActiveClass:
      'overflow-hidden transition-[max-height] duration-[450ms] ease-[cubic-bezier(0,1,0,1)]',
    leaveToClass: 'max-h-0'
  }
}

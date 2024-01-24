export default {
  root: {
    class: [
      'block',

      // Spacing
      'px-5 md:px-6 py-5',

      // Shape
      'rounded-md rounded-lg',

      // Color
      'bg-background-0 dark:bg-background-900',
      'text-background-700 dark:text-background-0/80',
      'ring-1 ring-inset ring-background-300 dark:ring-background-700 ring-offset-0'
    ]
  },
  legend: ({ props }) => ({
    class: [
      // Font
      'font-medium',
      'leading-none',

      //Spacing
      { 'p-0': props.toggleable, 'px-3 py-1.5': !props.toggleable },

      // Shape
      'rounded-md',

      // Color
      'text-background-700 dark:text-background-0/80',

      'bg-background-0 dark:bg-background-900',

      // Transition
      'transition-none',

      // States
      { '': props.toggleable },
      {
        'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-primary-600 ring-inset dark:focus:ring-primary-500':
          props.toggleable
      }
    ]
  }),
  toggler: ({ props }) => ({
    class: [
      // Alignments
      'flex items-center justify-center',
      'relative',

      //Spacing
      { 'px-3 py-1.5': props.toggleable },

      // Shape
      { 'rounded-md': props.toggleable },

      // Color
      {
        'text-background-700 dark:text-background-200 hover:text-background-900 hover:text-background-900':
          props.toggleable
      },

      // States
      { 'hover:text-background-900 dark:hover:text-background-100': props.toggleable },
      {
        'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500':
          props.toggleable
      },

      // Misc
      {
        'transition-none cursor-pointer overflow-hidden select-none': props.toggleable
      }
    ]
  }),
  togglerIcon: {
    class: 'mr-2 inline-block'
  },
  legendTitle: {
    class: 'flex items-center justify-center leading-none'
  },
  content: {
    class: 'p-0'
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

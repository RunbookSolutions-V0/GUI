export default {
  root: {
    class: ['cursor-pointer inline-flex relative select-none align-bottom', 'w-4 h-4']
  },
  checkbox: ({ props, context }) => ({
    class: [
      'relative',

      // Alignment
      'flex',
      'items-center',
      'justify-center',

      // Size
      'w-4',
      'h-4',

      // Shape
      'rounded',
      'border',

      // Colors
      'text-background-600',
      {
        'border-background-300 bg-background-0 dark:border-background-700 dark:bg-background-900':
          props.modelValue == null,
        'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400':
          props.modelValue !== null
      },

      // States
      'focus:outline-none focus:outline-offset-0',
      {
        'ring-2 ring-primary-500 dark:ring-primary-400': !props.disabled && context.focused,
        'cursor-default opacity-60': props.disabled
      },

      // Transitions
      'transition-colors',
      'duration-200'
    ]
  }),
  checkicon: {
    class: [
      // Font
      'text-normal',

      // Size
      'w-3',
      'h-3',

      // Colors
      'text-white dark:text-background-900',

      // Transitions
      'transition-all',
      'duration-200'
    ]
  },
  uncheckicon: {
    class: [
      // Font
      'text-normal',

      // Size
      'w-3',
      'h-3',

      // Colors
      'text-white dark:text-background-900',

      // Transitions
      'transition-all',
      'duration-200'
    ]
  }
}

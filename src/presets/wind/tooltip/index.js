export default {
  // eslint-disable-next-line no-unused-vars
  root: ({ context, props }) => ({
    class: [
      // Position
      'absolute',
      // Spacing
      {
        'px-1.5':
          context?.right ||
          context?.left ||
          (!context?.right && !context?.left && !context?.top && !context?.bottom),
        'py-1.5': context?.top || context?.bottom
      }
    ]
  }),
  arrow: {
    class: 'hidden'
  },
  text: {
    class: [
      // Size
      'text-xs leading-none',

      // Spacing
      'p-2',

      // Shape
      'rounded-md',

      // Color
      'text-background-900 dark:text-background-0/80',
      'bg-background-0 dark:bg-background-900',
      'ring-1 ring-inset ring-background-200 dark:ring-background-800 ring-offset-0',

      // Misc
      'whitespace-pre-line',
      'break-words'
    ]
  }
}

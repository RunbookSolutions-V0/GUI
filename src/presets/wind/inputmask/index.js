export default {
  root: ({ context }) => ({
    class: [
      // Font
      'font-sans leading-6',

      // Spacing
      'm-0 py-1.5 px-3 sm:text-sm',

      // Colors
      'text-background-900 dark:text-background-0',
      'placeholder:text-background-400 dark:placeholder:text-background-500',
      'bg-background-0 dark:bg-background-900',
      'ring-1 ring-inset ring-background-300 dark:ring-background-700 ring-offset-0',
      'shadow-sm',

      // Shape
      'rounded-md',
      'appearance-none',

      // Interactions
      {
        'outline-none focus:ring-primary-500 dark:focus:ring-primary-400': !context.disabled,
        'opacity-60 select-none pointer-events-none cursor-default': context.disabled
      }
    ]
  })
}

export default {
  root: {
    class: [
      //Shape
      'rounded-lg',
      'shadow-md',

      //Color
      'bg-background-0 dark:bg-background-900',
      'text-background-700 dark:text-background-0/80'
    ]
  },
  header: {
    class: ['border-b border-background-200 dark:border-background-700']
  },
  body: {
    class: 'py-5'
  },
  title: {
    class: 'text-lg font-medium mb-2 px-5 md:px-6'
  },
  subtitle: {
    class: [
      //Spacing
      'mb-1 px-5 md:px-6',

      //Color
      'text-background-600 dark:text-background-0/60'
    ]
  },
  content: {
    class: 'py-6 px-5 md:px-6'
  },
  footer: {
    class: ['px-5 md:px-6 pt-5 pb-0', 'border-t border-background-200 dark:border-background-700']
  }
}

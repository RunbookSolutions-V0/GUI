export default {
  root: ({ props }) => ({
    class: [
      // Misc
      { 'opacity-60 select-none pointer-events-none cursor-default': props.disabled }
    ]
  }),
  range: {
    class: [
      // Stroke
      'stroke-current',

      // Color
      'stroke-background-200 dark:stroke-background-700',

      // Fill
      'fill-none',

      // Transition
      'transition duration-100 ease-in'
    ]
  },
  value: {
    class: [
      // Animation
      'animate-dash-frame',

      // Color
      'stroke-primary-500 dark:stroke-primary-400',

      // Fill
      'fill-none'
    ]
  },
  label: {
    class: [
      // Text Style
      'text-center text-xl',

      // Color
      'fill-background-600 dark:fill-background-200'
    ]
  }
}

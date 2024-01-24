export default {
    root: ({ props, context }) => ({
        class: [
            // Alignments
            'items-center inline-flex text-center align-bottom justify-center',

            // Sizes & Spacing
            'px-2.5 py-1.5',
            'text-sm',

            // Shapes
            'rounded-md shadow-sm',

            // Colors
            'text-background-700 dark:text-white/80',
            { 'ring-1 ring-background-200 dark:ring-background-700': !context.focused },
            {
                'bg-background-0 dark:bg-background-900 ': !props.modelValue,
                'bg-background-100 dark:bg-background-700': props.modelValue
            },

            // States
            'hover:bg-background-200 dark:hover:bg-background-600/80',
            {
                'outline-none outline-offset-0 ring-2 ring-inset ring-primary-500 dark:ring-primary-400': context.focused && !props.disabled
            },

            // Transitions
            'transition-all duration-200',

            // Misc
            { 'cursor-pointer': !props.disabled, 'opacity-60 select-none pointer-events-none cursor-default': props.disabled }
        ]
    }),
    label: {
        class: 'font-semibold text-center w-full'
    },
    icon: {
        class: [' mr-2', 'text-background-700 dark:text-white/80']
    }
};

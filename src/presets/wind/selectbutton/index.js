export default {
    root: ({ props }) => ({
        class: ['shadow-sm', { 'opacity-60 select-none pointer-events-none cursor-default': props.disabled }]
    }),
    button: ({ context }) => ({
        class: [
            'relative',
            // Font
            'text-sm',
            'leading-none',

            // Flex Alignment
            'inline-flex items-center align-bottom text-center',

            // Spacing
            'px-2.5 py-1.5',

            // Shape
            'ring-1 ring-background-200 dark:ring-background-700',
            'first:rounded-l-md first:rounded-tr-none first:rounded-br-none',
            'last:rounded-tl-none last:rounded-bl-none last:rounded-r-md ',

            // Color
            {
                'bg-background-0 dark:bg-background-900': !context.active,
                'text-background-700 dark:text-white/80': !context.active,
                'bg-background-100 dark:bg-background-700': context.active
            },

            // States
            'focus:outline-none focus:outline-offset-0 focus:ring-primary-500 dark:focus:ring-primary-400',
            'hover:bg-background-200 dark:hover:bg-background-600/80',
            { 'opacity-60 select-none pointer-events-none cursor-default': context.disabled },

            // Transition
            'transition duration-200',

            // Misc
            'cursor-pointer select-none overflow-hidden'
        ]
    }),
    label: {
        class: 'font-semibold'
    }
};

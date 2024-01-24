export default {
    root: {
        class: [
            // Sizing and Shape
            'min-w-[12rem]',
            'rounded-md',
            // Spacing

            // Colors
            'bg-background-0 dark:bg-background-700',
            'text-background-700 dark:text-white/80',
            'ring-1 ring-background-200 dark:ring-background-700'
        ]
    },
    wrapper: {
        class: [
            // Overflow
            'overflow-auto'
        ]
    },
    list: {
        class: 'py-1 list-none m-0'
    },
    item: ({ context }) => ({
        class: [
            // Font
            'sm:text-sm',
            'leading-none',
            { 'font-normal': !context.selected, 'font-bold': context.selected },

            // Position
            'relative',

            // Shape
            'border-0',
            'rounded-none',

            // Spacing
            'm-0',
            'py-2 px-4',

            // Color
            { 'text-background-700 dark:text-white/80': !context.focused && !context.selected },
            { 'bg-background-200 dark:bg-background-600/60 text-background-700 dark:text-white/80': context.focused && !context.selected },
            { 'bg-primary-500 dark:bg-primary-400 text-white dark:text-background-700': context.focused && context.selected },
            { 'bg-background-100 dark:bg-background-300/10 text-primary-500 dark:text-primary-400': !context.focused && context.selected },

            //States
            'hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white dark:hover:text-background-700',
            'focus-visible:outline-none focus-visible:outline-offset-0 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400',

            // Misc
            'cursor-pointer',
            'overflow-hidden',
            'whitespace-nowrap'
        ]
    }),
    itemgroup: {
        class: [
            //Font
            'font-bold',
            'sm:text-sm',

            // Spacing
            'm-0',
            'py-2 px-4',

            // Color
            'text-background-800 dark:text-white/80',
            'bg-background-0 dark:bg-background-600/80',

            // Misc
            'cursor-auto'
        ]
    },
    header: {
        class: [
            // Spacing
            'p-0',
            'm-0',

            //Shape
            'rounded-tl-md',
            'rounded-tr-md',
            'border-b border-background-200 dark:border-background-700',

            // Color
            'text-background-700 dark:text-white/80',
            'bg-background-100 dark:bg-background-800'
        ]
    },
    filtercontainer: {
        class: 'relative'
    },
    filterinput: {
        class: [
            // Font
            'font-sans',
            'leading-none',
            'sm:text-sm',

            // Sizing
            'py-1.5 px-3',
            'pr-7',
            '-mr-7',
            'w-full',

            //Color
            'text-background-700 dark:text-white/80',
            'bg-background-0 dark:bg-background-900',
            'placeholder:text-background-400',

            // Shape
            'border-0',
            'rounded-tl-md',
            'rounded-tr-md',
            'appearance-none',

            // States
            'focus:ring-2 focus:ring-inset focus:outline-none focus:outline-offset-0',
            'focus:ring-primary-600 dark:focus:ring-primary-500',

            // Misc
            'appearance-none'
        ]
    },
    filtericon: {
        class: ['absolute', 'top-1/2 right-3', '-mt-2']
    },
    emptymessage: {
        class: [
            // Font
            'leading-none',
            'sm:text-sm',

            // Spacing
            'py-2 px-4',

            // Color
            'text-background-800 dark:text-white/80',
            'bg-transparent'
        ]
    }
};

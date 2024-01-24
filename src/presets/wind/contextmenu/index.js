export default {
    root: {
        class: [
            // Sizing and Shape
            'min-w-[12rem]',
            'rounded-md',
            'shadow-md',

            // Spacing
            'p-1.5',

            // Colors
            'bg-background-0 dark:bg-background-700',
            'text-background-700 dark:text-white/80',
            'dark:border dark:border-background-700'
        ]
    },
    menu: {
        class: [
            // Spacings and Shape
            'list-none',
            'm-0',
            'p-0',
            'outline-none'
        ]
    },
    menuitem: {
        class: 'relative'
    },
    content: ({ context }) => ({
        class: [
            //Shape
            'rounded-md',

            //  Colors
            {
                'text-background-500 dark:text-white/70': !context.focused && !context.active,
                'text-background-500 dark:text-white/70 bg-background-200 dark:bg-black/70': context.focused && !context.active,
                'text-background-900 dark:text-background-0/80 bg-background-50 dark:bg-black/70': context.focused && context.active,
                // eslint-disable-next-line no-dupe-keys
                'text-background-900 dark:text-background-0/80 bg-background-50 dark:bg-black/70': !context.focused && context.active
            },

            // Hover States
            {
                'hover:bg-background-50 dark:hover:bg-background-800': !context.active,
                'hover:bg-background-100 dark:hover:bg-black/40 text-background-900 dark:text-background-0/80': context.active
            },

            // Transitions
            'transition-shadow',
            'duration-200'
        ]
    }),
    action: {
        class: [
            'relative',

            // Font
            'font-semibold',

            // Flexbox
            'flex',
            'items-center',

            // Spacing
            'py-2',
            'px-3',

            // Misc
            'no-underline',
            'overflow-hidden',
            'cursor-pointer',
            'select-none'
        ]
    },
    icon: {
        class: [
            // Spacing
            'mr-2',
            'leading-6',
            'text-sm'
        ]
    },
    label: {
        class: ['leading-6', 'text-sm']
    },
    submenu: ({ props }) => ({
        class: [
            // Size
            'w-full sm:w-48',

            // Spacing
            'p-1.5',
            'm-0',
            'list-none',

            // Shape
            'shadow-md',
            'rounded-md',

            // Position
            'static sm:absolute',
            'z-10',
            { 'sm:absolute sm:left-full sm:top-0': props.level > 1 },

            // Color
            'bg-background-0 dark:bg-background-700'
        ]
    }),
    submenuicon: {
        class: ['ml-auto']
    },
    separator: {
        class: 'border-t border-background-200 dark:border-background-600 my-1'
    },
    transition: {
        enterFromClass: 'opacity-0',
        enterActiveClass: 'transition-opacity duration-250'
    }
};

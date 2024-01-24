export default {
  root: ({ props, parent }) => ({
    class: [
      // Display
      'inline-flex',

      { 'flex-col': props.showButtons && props.buttonLayout == 'vertical' },

      //Sizing
      { '!w-16': props.showButtons && props.buttonLayout == 'vertical' },

      // Shape
      {
        'first:rounded-l-md rounded-none last:rounded-r-md':
          parent.instance.$name == 'InputGroup' && !props.showButtons
      },
      {
        'border-0 border-y border-l last:border-r border-background-300 dark:border-background-600':
          parent.instance.$name == 'InputGroup' && !props.showButtons
      },

      {
        'ring-1 ring-background-300 dark:ring-background-700 ring-offset-0':
          parent.instance.$name !== 'InputGroup'
      },
      'shadow-sm',
      'rounded-md'
    ]
  }),
  input: {
    root: ({ parent }) => ({
      class: [
        // Display
        'flex flex-auto',

        //Text
        'sm:text-sm',
        { 'text-center': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        // Spacing
        'm-0',
        'py-1.5 px-3',

        // Shape
        'rounded-md',
        { 'rounded-tr-none rounded-br-none': parent.props.showButtons },
        {
          'rounded-tl-none rounded-bl-none':
            parent.props.showButtons && parent.props.buttonLayout == 'horizontal'
        },
        { 'rounded-none': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        // Colors
        'text-background-900 dark:text-background-0',
        'placeholder:text-background-400 dark:placeholder:text-background-500',
        'bg-background-0 dark:bg-background-900',
        {
          'border-r border-background-300 dark:border-background-700':
            parent.props.showButtons && parent.props.buttonLayout == 'stacked'
        },
        {
          'border-x border-background-300 dark:border-background-700':
            parent.props.showButtons && parent.props.buttonLayout == 'horizontal'
        },
        {
          'border-y border-background-300 dark:border-background-700':
            parent.props.showButtons && parent.props.buttonLayout == 'vertical'
        },

        // States
        'outline-none focus:ring-primary-600 dark:focus:ring-primary-500',
        'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 dark:focus:ring-primary-500',

        //Position
        {
          'order-2':
            parent.props.buttonLayout == 'horizontal' || parent.props.buttonLayout == 'vertical'
        }
      ]
    })
  },

  buttongroup: {
    class: ['flex', 'flex-col']
  },

  incrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        'flex flex-auto',

        // Alignment
        'items-center',
        'justify-center',
        'text-center align-bottom',

        //Position
        'relative',
        { 'order-3': parent.props.showButtons && parent.props.buttonLayout == 'horizontal' },
        { 'order-1': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        //Color
        'text-background-600 dark:text-background-400',
        'bg-background-0 dark:bg-background-800',

        // Sizing
        'w-[3rem]',
        { 'px-2.5 py-1.5': parent.props.showButtons && parent.props.buttonLayout !== 'stacked' },
        { 'p-0': parent.props.showButtons && parent.props.buttonLayout == 'stacked' },
        { 'w-full': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        // Shape
        'rounded-md',
        {
          'rounded-tl-none rounded-br-none rounded-bl-none':
            parent.props.showButtons && parent.props.buttonLayout == 'stacked'
        },
        {
          'rounded-bl-none rounded-tl-none':
            parent.props.showButtons && parent.props.buttonLayout == 'horizontal'
        },
        {
          'rounded-bl-none rounded-br-none':
            parent.props.showButtons && parent.props.buttonLayout == 'vertical'
        },

        //States
        'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 focus:dark:ring-primary-500',
        'hover:bg-background-50 dark:hover:bg-background-700',

        //Misc
        'cursor-pointer overflow-hidden select-none'
      ]
    }),
    label: {
      class: 'h-0 w-0'
    }
  },
  decrementbutton: {
    root: ({ parent }) => ({
      class: [
        // Display
        'flex flex-auto',

        // Alignment
        'items-center',
        'justify-center',
        'text-center align-bottom',

        //Position
        'relative',
        { 'order-1': parent.props.showButtons && parent.props.buttonLayout == 'horizontal' },
        { 'order-3': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        //Color
        'text-background-600 dark:text-background-400',
        'bg-background-0 dark:bg-background-800',

        // Sizing
        'w-[3rem]',
        { 'px-2.5 py-1.5': parent.props.showButtons && parent.props.buttonLayout !== 'stacked' },
        { 'p-0': parent.props.showButtons && parent.props.buttonLayout == 'stacked' },
        { 'w-full': parent.props.showButtons && parent.props.buttonLayout == 'vertical' },

        // Shape
        'rounded-md',
        {
          'rounded-tr-none rounded-tl-none rounded-bl-none':
            parent.props.showButtons && parent.props.buttonLayout == 'stacked'
        },
        {
          'rounded-tr-none rounded-br-none ':
            parent.props.showButtons && parent.props.buttonLayout == 'horizontal'
        },
        {
          'rounded-tr-none rounded-tl-none ':
            parent.props.showButtons && parent.props.buttonLayout == 'vertical'
        },

        //States
        'focus:outline-none focus:outline-offset-0 focus:ring-2 focus:ring-inset focus:ring-primary-600 focus:dark:ring-primary-500',
        'hover:bg-background-50 dark:hover:bg-background-700',

        //Misc
        'cursor-pointer overflow-hidden select-none'
      ]
    }),
    label: {
      class: 'h-0 w-0'
    }
  }
}

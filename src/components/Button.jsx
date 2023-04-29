export default function Button({
  // eslint-disable-next-line react/prop-types
  type = 'button',
    // eslint-disable-next-line react/prop-types
  onClick = () => undefined,
    // eslint-disable-next-line react/prop-types
  variant = 'secondary',
    // eslint-disable-next-line react/prop-types, no-unused-vars
  size = 'sm',
    // eslint-disable-next-line react/prop-types
  fullWidth = false,
    // eslint-disable-next-line react/prop-types
  disabled,
    // eslint-disable-next-line react/prop-types
  children,
    // eslint-disable-next-line react/prop-types
  className,
  ...props
}) {
  // const sizeClass = () => {
  //   switch (size) {
  //     case 'xs':
  //       return 'gap-0.5 px-2.5 py-1 text-xs';

  //     case 'sm':
  //       return 'gap-1 px-3.5 py-2 text-sm';

  //     case 'md':
  //       return 'gap-2 px-7 py-4 text-base';

  //     default:
  //       return 'gap-1 px-2.5 py-2 text-sm';
  //   }
  // };

  const variantClass = () => {
    switch (variant) {
      case 'primary':
        return 'text-white bg-primary-50 ring-primary-50 hover:bg-primary-60 active:bg-primary-70';

      case 'secondary':
        return 'text-slate-700 bg-[#F4F4F4] ring-[[#F4F4F4]] hover:bg-slate-100 active:bg-slate-200';

      case 'danger':
        return 'text-white bg-danger-6 ring-danger-6 hover:bg-danger-7 hover:bg-danger-7 active:bg-danger-8';

      default:
        return 'text-white bg-primary-50 ring-primary-50 hover:bg-primary-60 active:bg-primary-70';
    }
  };

  return (
    <button
      disabled={disabled}
      onClick={(e) => onClick(e)}
      type={type}
      className={`text-lg leading-[27px] py-3 px-10 font-semibold items-center justify-between rounded-full ring-1 focus:outline-none focus-visible:ring-2 disabled:bg-slate-300 disabled:text-slate-500 disabled:ring-slate-300 ${
        fullWidth ? 'flex w-full' : 'inline-flex'
      } ${className} ${variantClass()}`}
      {...props}
    >
      {children}
    </button>
  );
}

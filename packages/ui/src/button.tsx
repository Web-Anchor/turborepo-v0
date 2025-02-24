import { classNames } from '../dist/helpers';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  isLoading?: boolean;
  children: React.ReactNode;
  href?: string;
  LinkComponent?: React.ElementType;
  onClick?: () => void | Promise<void>;
  spinnerColor?: '#000000' | '#FFFFFF' | '#1B1A55';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export function Button({
  variant = 'primary',
  isLoading = false,
  children,
  href,
  spinnerColor = '#FFFFFF',
  ...rest
}: ButtonProps) {
  const baseClasses =
    'relative inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    secondary:
      'text-gray-700 bg-gray-300 hover:bg-gray-400 focus:ring-gray-500',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500',
    link: 'text-blue-600 focus:ring-blue-500 focus:text-white',
  };

  const classes = `${baseClasses} ${variantClasses[variant]}`;
  const LinkComponent = rest.LinkComponent || 'a'; // Default to 'a' if LinkComponent is not provided

  const content = (
    <>
      {isLoading && (
        <div
          className={classNames(
            'absolute inset-0 flex items-center justify-center'
          )}
        >
          {spinner({ color: spinnerColor })}
        </div>
      )}
      {children}
    </>
  );

  if (href) {
    return (
      <LinkComponent
        href={href}
        className={classNames(classes, rest.className)}
      >
        {content}
      </LinkComponent>
    );
  }

  return (
    <button
      disabled={isLoading || rest.disabled}
      onClick={rest.onClick}
      {...rest}
      className={classNames(classes, rest.className)}
    >
      {content}
    </button>
  );
}

function spinner({ color }: { color: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 256 256"
      className="w-6 h-6 animate-spin"
    >
      <path
        d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm88,88H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"
        fill={color}
      />
    </svg>
  );
}

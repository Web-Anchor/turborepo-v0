import { classNames, mergeIf } from '../../dist/utils';

type ThemeOptions = 'light' | 'dark' | 'primary' | 'secondary';

type HeaderTypes = {
  title?: string | React.ReactElement;
  subtitle?: string;
  description?: string | React.ReactNode | Array<string | React.ReactNode>;
  className?: string;
  theme?: ThemeOptions;
  size?: 'small';
  type?: 'page-header';
  id?: string;
};

export function Header({
  title,
  subtitle,
  description,
  className,
  theme = 'dark',
  size,
  type,
  id,
}: HeaderTypes) {
  // Return null if no content is provided.
  const hasDescription =
    description &&
    ((Array.isArray(description) && description.length > 0) ||
      (!Array.isArray(description) && description));
  if (!title && !subtitle && !hasDescription) {
    return null;
  }

  // Define theme-specific classes.
  const themeStyles = {
    light: {
      container: '',
      subtitle: 'text-indigo-600',
      title: 'text-gray-800',
      description: 'text-gray-500',
    },
    dark: {
      container: '',
      subtitle: 'text-indigo-600',
      title: 'text-white',
      description: 'text-gray-200',
    },
    primary: {
      container: 'bg-blue-50',
      subtitle: 'text-blue-600',
      title: 'text-blue-900',
      description: 'text-blue-700',
    },
    secondary: {
      container: 'bg-gray-100',
      subtitle: 'text-green-600',
      title: 'text-green-900',
      description: 'text-green-700',
    },
  };

  const selectedTheme = themeStyles[theme] || themeStyles.light;

  return (
    <div
      className={classNames(
        'px-6 py-10 sm:py-16 lg:px-8 text-left lg:text-center',
        selectedTheme?.container,
        mergeIf(type === 'page-header', 'py-5 lg:p-0 lg:text-left'),
        className
      )}
      id={id}
    >
      <div
        className={classNames(
          'flex flex-col mx-auto max-w-4xl gap-3',
          mergeIf(type === 'page-header', 'mx-0')
        )}
      >
        {subtitle && (
          <h2
            className={classNames(
              'text-base font-semibold leading-7',
              selectedTheme.subtitle,
              mergeIf(
                type === 'page-header',
                'text-xs lg:text-sm leading-6 order-1'
              )
            )}
          >
            {subtitle}
          </h2>
        )}
        {title && (
          <h1
            className={classNames(
              'text-4xl font-bold tracking-tight sm:text-7xl',
              selectedTheme.title,
              mergeIf(size === 'small', 'lg:text-4xl'),
              mergeIf(
                type === 'page-header',
                'text-md sm:text-5xl font-bold tracking-tight order-0'
              )
            )}
          >
            {title}
          </h1>
        )}
        {hasDescription && (
          <div className="flex flex-col gap-2">
            {Array.isArray(description) &&
              description.map((desc, index) => (
                <p
                  key={index}
                  className={classNames(
                    'text-lg leading-8',
                    selectedTheme.description,
                    mergeIf(type !== 'page-header', title && 'mt-3'),
                    mergeIf(type === 'page-header', 'text-sm leading-6 order-2')
                  )}
                >
                  {desc}
                </p>
              ))}
            {!Array.isArray(description) && (
              <p
                className={classNames(
                  'text-lg leading-8',
                  selectedTheme.description,
                  mergeIf(type !== 'page-header', title && 'mt-3'),
                  mergeIf(type === 'page-header', 'text-sm leading-6 order-2')
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

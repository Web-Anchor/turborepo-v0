import { FC, ReactNode, memo } from 'react';

/**
 * MemoWrapper is a simple memoized component that returns its children.
 * It is useful for wrapping components to avoid unnecessary re-renders.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The children elements to render.
 * @returns {React.ReactNode} The memoized children.
 */

interface MemoWrapperProps {
  children: ReactNode;
}

const MemoWrapper: FC<MemoWrapperProps> = memo(({ children }) => {
  return <>{children}</>;
});

MemoWrapper.displayName = 'MemoWrapper';

export default MemoWrapper;

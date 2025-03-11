'use client';

import { useState, useCallback, memo } from 'react';
import NextImage from 'next/image';
import { toast } from 'sonner';
import { User, ImageBroken } from '@phosphor-icons/react';
import { classNames } from '../../lib/utils';

type ImageProps = {
  src?: string;
  alt?: string;
  className?: string;
  /**
   * Determines which fallback icon to use when the image fails.
   * 'profile-icon' will render the User icon,
   * any other value (or 'error') will render the ImageBroken icon.
   */
  fallback?: 'profile-icon' | 'error';
  imageFit?: 'object-contain' | 'cover';
  size?: 'small' | 'medium' | 'large' | 'xSmall';
};

const imageSize = {
  xSmall: 'h-4 w-4',
  small: 'h-8 w-8',
  medium: 'h-16 w-16',
  large: 'h-32 w-32',
};

export function Image({
  alt = 'EUH Portal',
  fallback = 'profile-icon',
  imageFit = 'object-contain',
  size = 'medium',
  ...rest
}: ImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      toast.error('Image not found or format not supported!');
    }
  }, [hasError]);

  // If there's no source or an error occurred, render a fallback icon.
  if (hasError || !rest.src) {
    return (
      <section
        className={classNames(
          'flex items-center bg-gray-100',
          imageSize[size],
          rest.className
        )}
      >
        {fallback === 'profile-icon' && (
          <User
            weight="duotone"
            className={classNames(imageSize[size], rest.className)}
          />
        )}
        {fallback === 'error' && (
          <ImageBroken
            weight="duotone"
            className={classNames(imageSize[size], rest.className)}
          />
        )}
      </section>
    );
  }

  return (
    <section
      className={classNames(
        'relative overflow-hidden',
        imageSize[size],
        rest.className
      )}
    >
      <NextImage
        src={rest.src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className={classNames(imageFit)}
        quality={75}
        onError={handleError}
      />
    </section>
  );
}

export default memo(Image);

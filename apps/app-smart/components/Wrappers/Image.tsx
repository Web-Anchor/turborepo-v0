'use client';

import { useState, useCallback } from 'react';
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

export default function Image({
  src,
  alt = 'EUH Portal',
  className,
  fallback = 'profile-icon',
  imageFit = 'object-contain',
  size = 'medium',
}: ImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    if (!hasError) {
      setHasError(true);
      toast.error('Image not found or format not supported!');
    }
  }, [hasError]);

  // If there's no source or an error occurred, render a fallback icon.
  if (hasError || !src) {
    return (
      <section
        className={classNames(
          'flex items-center bg-gray-100',
          imageSize[size],
          className
        )}
        style={{ width: '100%', height: '100%' }}
      >
        {fallback === 'profile-icon' && <User size={48} weight="duotone" />}
        {fallback === 'error' && <ImageBroken size={48} weight="duotone" />}
      </section>
    );
  }

  return (
    <section
      className={classNames(
        'relative overflow-hidden',
        imageSize[size],
        className
      )}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        className={classNames(imageFit)}
        quality={75}
        onError={handleError}
      />
    </section>
  );
}

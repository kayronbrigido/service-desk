import { bucketEnv } from "@src/config/environment";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import NextImage from "next/image";
import React from "react";
import NoImage from '@src/assets/images/no-image.jpg'

type ImageProps = {
  style?: React.CSSProperties,
  sizes?: string,
  src: string | StaticImport
  alt?: string;
  title?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  quality?: number | `${number}`;
  preload?: boolean;
  priority?: boolean;
  loading?: "eager" | "lazy" | undefined;
  blurDataURL?: string;
  unoptimized?: boolean;
  overrideSrc?: string;
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
} & React.RefAttributes<HTMLImageElement | null>;

export function Image(props: ImageProps) {
  const src = props.src || NoImage.src;

  return (
    <NextImage
      {...props}
      src={src}
      alt={props.alt ?? ''}
      title={props.title ?? ''}
      width={!props.fill ? Number(props.width) || 100 : undefined}
      height={!props.fill ? Number(props.height) || 100 : undefined}
      unoptimized={true}
    />
  );
}
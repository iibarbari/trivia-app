import classNames from 'classnames';
import Link from 'next/link';
import React, { Ref } from 'react';
import styles from './Button.module.css';

type TButtonSize = 'sm' | 'lg';
type TButtonVariant = 'solid' | 'outline';
type TButtonColor = 'primary' | 'secondary';

type CommonProps = {
  color?: TButtonColor;
  disabled?: boolean;
  size?: TButtonSize;
  variant?: TButtonVariant;
};

type AnchorProps = React.PropsWithoutRef<JSX.IntrinsicElements['a']>;
type ButtonProps = Overwrite<React.PropsWithoutRef<JSX.IntrinsicElements['button']>, {}>;

export type Props = CommonProps & (ButtonProps | AnchorProps);

function isAnchorProps(props: AnchorProps | ButtonProps): props is AnchorProps {
  return (props as AnchorProps).href !== undefined;
}

function isButtonProps(props: AnchorProps | ButtonProps): props is ButtonProps {
  return ['button', 'reset', 'submit', undefined].includes(
    (props as ButtonProps).type,
  );
}

function Button(
  {
    children,
    className,
    color = 'primary',
    disabled = false,
    size = 'sm',
    variant = 'solid',
    ...props
  }: Props,
  ref: Ref<HTMLAnchorElement | HTMLButtonElement>,
) {
  const commonProps = {
    className: classNames(
      styles.button,
      styles[size],
      styles[variant],
      styles[color],
      disabled && styles.disabled,
      className,
    ),
    ...(disabled ? { 'aria-disabled': disabled } : undefined),
  };

  if (isAnchorProps(props)) {
    return (
      <Link href={props.href || ''} passHref>
        <a {...commonProps} {...props} ref={ref as Ref<HTMLAnchorElement>}>
          {children}
        </a>
      </Link>
    );
  }

  if (isButtonProps(props)) {
    return (
      <button
        type={(props.type as ButtonProps['type']) === undefined ? 'button' : props.type}
        {...commonProps}
        {...props}
        ref={ref as Ref<HTMLButtonElement>}
      >
        {children}
      </button>
    );
  }

  return null;
}

export default React.forwardRef(Button);

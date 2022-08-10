import classNames from 'classnames';
import Link from 'next/link';
import React, { Ref } from 'react';
import styles from './Button.module.css';

type CommonProps = {
  disabled?: boolean;
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
    disabled = false,
    ...props
  }: Props,
  ref: Ref<HTMLAnchorElement | HTMLButtonElement>,
) {
  const commonProps = {
    className: classNames(
      styles.button,
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
        /* eslint-disable-next-line react/button-has-type */
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

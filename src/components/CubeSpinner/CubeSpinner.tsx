import classNames from 'classnames';
import { Spin } from 'antd';
import { ReactNode } from 'react';
import styles from './CubeSpinner.module.css';

type SpinnerProps = {
  size: number;
  className?: string;
  color?: string;
  animationDuration?: number;
  rotated?: boolean;
  tilted?: boolean;
};

export function CubeSpinner({
  size,
  className,
  color = 'var(--color-primary)',
  animationDuration = 1.3,
  rotated = false,
  tilted = false,
}: SpinnerProps) {
  return (
    <div
      className={classNames(styles['cube-grid'], className, {
        [styles.rotated]: rotated,
        [styles.tilted]: tilted,
      })}
      style={{ width: size, height: size }}
    >
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 6.5}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 4.33}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 3.25}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 13}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 6.5}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 4.5}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `0s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 13}s`,
        }}
      />
      <div
        className={classNames(styles.cube)}
        style={{
          backgroundColor: color,
          animationDuration: `${animationDuration}s`,
          animationDelay: `${animationDuration / 6.5}s`,
        }}
      />
    </div>
  );
}

type SpinProps = {
  size?: 'small' | 'medium' | 'large';
  spinning?: boolean;
  children?: ReactNode;
};

export function CubeSpin({ size = 'medium', spinning = false, children }: SpinProps) {
  return (
    <Spin
      spinning={spinning}
      indicator={
        <CubeSpinner
          tilted
          // eslint-disable-next-line no-nested-ternary
          size={size === 'small' ? 24 : size === 'medium' ? 32 : 40}
          color="var(--color-primary)"
          animationDuration={1.6}
        />
      }
    >
      {children}
    </Spin>
  );
}

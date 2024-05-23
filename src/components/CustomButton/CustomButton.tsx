import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';
import defaultButtonStyles from './DefaultButton.module.css';
import commonButtonStyles from './CommonButton.module.css';
import invertedCommonButtonStyles from './InvertedCommonButton.module.css';
import afterEffectStyles from './AfterEffect.module.css';

const CustomButtonTypes = ['common', 'inverted'] as const;

type CustomButtonType = (typeof CustomButtonTypes)[number];

interface ExtendedButtonProps extends ButtonProps {
  variety?: CustomButtonType;
}

export default function CustomButton(props: ExtendedButtonProps): JSX.Element {
  const { variety, ...restProps } = props;
  const buttonProps = { ...(restProps as ButtonProps) };

  return (
    <Button
      type="default"
      className={classNames(defaultButtonStyles.defaultButton, afterEffectStyles.afterEffect, {
        [commonButtonStyles.commonButton]: variety === 'common',
        [invertedCommonButtonStyles.invertedButton]: variety === 'inverted',
      })}
      {...buttonProps}
    />
  );
}

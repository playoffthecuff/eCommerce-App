import { Button, ButtonProps } from 'antd';
import classNames from 'classnames';

import { ButtonVariety } from '../../types/types';

import defaultButtonStyles from './DefaultButton.module.css';
import commonButtonStyles from './CommonButton.module.css';
import invertedCommonButtonStyles from './InvertedCommonButton.module.css';
import afterEffectStyles from './AfterEffect.module.css';
import filtersButtonStyles from './FiltersButton.module.css';

const CustomButtonTypes = ['common', 'inverted', 'filters'] as const;

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
        [commonButtonStyles.commonButton]: variety === ButtonVariety.COMMON,
        [invertedCommonButtonStyles.invertedButton]: variety === ButtonVariety.INVERTED,
        [filtersButtonStyles.filtersButton]: variety === ButtonVariety.FILTERS,
      })}
      {...buttonProps}
    />
  );
}

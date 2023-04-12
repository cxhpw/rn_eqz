import React from 'react';
import { forwardRef, memo } from 'react';
import Flex from '../Flex';
import { IButtonGroupProps } from './types';
import { useTheme } from '@shopify/restyle';
import { Theme } from '../Theme/theme';

const ButotnGroup = memo(
  forwardRef(
    (
      { direction = 'row', isAttached, children }: IButtonGroupProps,
      ref?: any,
    ) => {
      const theme = useTheme<Theme>();
      const borderRadius = theme.borderRadii.x1;
      let computedChildren;
      if (Array.isArray(children)) {
        computedChildren = React.Children.toArray(children).map(
          (child: any, index: number) => {
            if (typeof child === 'string' || typeof child === 'number') {
              return child;
            }
            return React.cloneElement(child, {
              key: `button-group-child-${index}`,

              ...(isAttached ? { borderRadius: 0 } : {}),
              ...(isAttached && index === 0
                ? direction === 'column'
                  ? { borderTopLeftRadius: borderRadius }
                  : { borderTopRightRadius: borderRadius }
                : {}),
              ...(isAttached && index === children?.length - 1
                ? direction === 'column'
                  ? { borderBottomLeftRadius: borderRadius }
                  : { borderBottomRightRadius: borderRadius }
                : {}),

              //when buttons are attached, remove double border from them, just keep borderRight in case for direction row and borderBottom in case of direction column for every component
              ...(isAttached && index !== 0
                ? direction === 'column'
                  ? { borderTopWidth: 0 }
                  : { borderLeftWidth: 0 }
                : {}),
              ...child.props,
            });
          },
        );
      } else {
        computedChildren = React.Children.toArray(children).map(
          (child: any, index: number) => {
            return React.cloneElement(child, {
              key: `button-group-child-${index}`,
              ...child.props,
            });
          },
        );
      }
      return (
        <Flex flexDirection={direction} ref={ref}>
          {computedChildren}
        </Flex>
      );
    },
  ),
);

export default ButotnGroup;

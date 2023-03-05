import React from 'react';
import { PropsWithChildren } from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './PortalHost';

export type Props = PropsWithChildren<{}>;

class Portal extends React.Component<Props> {
  // @component ./PortalHost.tsx
  static Host = PortalHost;

  render() {
    const { children } = this.props;

    return (
      <PortalContext.Consumer>
        {manager => {
          return (
            <PortalConsumer manager={manager as PortalMethods}>
              {children}
            </PortalConsumer>
          );
        }}
      </PortalContext.Consumer>
    );
  }
}
export default Portal;

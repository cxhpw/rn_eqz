import { Text } from 'react-native';
import { Component, ErrorInfo, PropsWithChildren, ReactNode } from 'react';

type Props = PropsWithChildren<{
  customNode?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  onRefresh?: () => void;
}>;
export class index extends Component<Props, { error: Error | null }> {
  static displayName = 'ErrorBlock';
  state = {
    error: null,
  };
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.log('报错');
    if (this.props.onError) {
      this.props.onError(error, info);
    } else {
      console.error(error, info);
    }
  }
  render() {
    if (this.state.error) {
      return <Text>报错</Text>;
    }
    return this.props.children;
  }
}

export default index;

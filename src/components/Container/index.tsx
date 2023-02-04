import type { PropsWithChildren } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Container: React.FC<
  PropsWithChildren<{ hasHeader?: boolean; backgroundColor?: string }>
> = ({ hasHeader = true, children, backgroundColor }) => {
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: backgroundColor || '#fff' },
  });

  return (
    <SafeAreaView
      style={styles.container}
      edges={
        hasHeader ? ['left', 'right', 'bottom'] : ['top', 'left', 'right']
      }>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      {children}
    </SafeAreaView>
  );
};

export default Container;

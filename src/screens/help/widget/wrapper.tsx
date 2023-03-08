import { View, ActivityIndicator } from 'react-native';
import { HtmlParse } from '@/components';
import { memo, useState } from 'react';

const Wrapper: React.FC<{
  html: string;
}> = ({ html }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && <ActivityIndicator />}
      <HtmlParse
        onLoadEnd={() => {
          setLoading(false);
        }}
        html={html}
      />
    </>
  );
};

export default memo(Wrapper);

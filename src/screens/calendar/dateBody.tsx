import { StyleSheet, View } from 'react-native';

import DateSection from './dateSection';
import useCaledatService from './useCaledatService';

type Props = {
  months?: number[];
  years?: number[];
};
const DateBody: React.FC<Props> = () => {
  console.log('dateBody render');
  const { dates, years, months } = useCaledatService.useModel();
  return (
    <View style={styles.wrapper}>
      {dates?.map((item, index) => {
        return (
          <DateSection
            dates={item}
            title={`${years![index]}年${months![index]}月`}
            key={`date${index}`}
          />
        );
      })}
    </View>
  );
};

export default DateBody;

const styles = StyleSheet.create({
  wrapper: {},
});

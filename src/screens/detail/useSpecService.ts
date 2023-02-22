import { useSafeState } from 'ahooks';
import { useEffect } from 'react';

export default function useSpecService(data: ProductDetail['guige'] = []) {
  const [spec, setSpec] = useSafeState<Spec[]>([]);
  const [defaultValue, setDefaultValue] = useSafeState<string>();
  useEffect(() => {
    if (!data.length) {
      return;
    }
    let guige: Spec[] = [];
    let guigeText: string[] = [];
    const run = () => {
      for (let i = 0; i < data.length; i++) {
        let str = '';
        let result = {} as Spec;
        let children: Spec[] = [];
        result.name = data[i].GuiGeName;
        str = str + `${result.name}:`;
        let arr = data[i].GuiGeValue.split(',');
        for (let j = 0; j < arr.length; j++) {
          let subSpec = {} as Spec;
          subSpec.name = arr[j];
          if (j === 0) {
            subSpec.checked = true;
            str = str + subSpec.name;
            guigeText.push(str);
          } else {
            subSpec.checked = false;
          }
          children.push(subSpec);
        }
        result.children = children;
        guige.push(result);
      }
    };
    run();
    setSpec(guige);
    setDefaultValue(guigeText.join(','));
  }, [data, setSpec, setDefaultValue]);
  const onChange = (index: number, obj: Spec) => {
    const i = spec[index].children.indexOf(obj);
    if (i !== -1) {
      spec[index].children = spec[index].children.map((item, idx) => {
        return {
          ...item,
          checked: idx === i,
        };
      });
      let arr = defaultValue?.split(',') || [];
      var reg = /:.*$/g;
      arr[index] = arr[index].replace(reg, `:${spec[index].children[i].name}`);
      setDefaultValue(arr.join(','));
      setSpec([...spec]);
    }
  };
  return {
    spec,
    defaultValue,
    onChange,
  };
}

// jest-custom-matchers.d.ts
import '@testing-library/jest-native/extend-expect'; // 导入扩展库的声明

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainSubstring(expectedSubstring: string): R;
      // 在这里添加更多的自定义匹配器声明
    }
  }
}

/* eslint-disable no-undef */
describe('例子', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('点击按钮', async () => {
    await element(by.id('testBtn')).tap();
    await expect(element(by.id('testContext'))).toHaveText('Value: 2');
  });
});

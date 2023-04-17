## 1.如何替换启动页

```code
yarn add react-native-bootsplash

yarn react-native generate-bootsplash path-to-logo-image
```

可选参数：

- --background-color=[color] 启动页背景色。hex 格式

- --logo-width=[width] 1 倍图 logo 大小（正方形）。默认为 100

- --assets-path=[path] logo 存放在项目目录下的位置

- --flavor=[flavor] 安卓下有效。表示不是`main`目录的安卓资源文件夹

生成文件示例：

```
android/app/src/main/res/drawable/bootsplash.xml
android/app/src/main/res/values/colors.xml (creation and edition)
android/app/src/main/res/mipmap-hdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-mdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xhdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xxhdpi/bootsplash_logo.png
android/app/src/main/res/mipmap-xxxhdpi/bootsplash_logo.png

ios/YourProjectName/BootSplash.storyboard
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo.png
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo@2x.png
ios/YourProjectName/Images.xcassets/BootSplashLogo.imageset/bootsplash_logo@3x.png

# Only if --assets-path was specified
assets/bootsplash_logo.png
assets/bootsplash_logo@1,5x.png
assets/bootsplash_logo@2x.png
assets/bootsplash_logo@3x.png
assets/bootsplash_logo@4x.png
```

## 2. 如何替换应用图标

```
yarn add -D @bam.tech/react-native-make

npx react-native set-icon --path path-to-image
```

要求：

- `path-to-image` 指向图片的路径必填
- 图片必须是正方形的
- 图片不能有透明图层，两个平台都不支持
- 图片最大尺寸是 1024 \* 1024
- 支持安卓自适应图标
- 图片格式支持.png 和 .jpeg
- 安卓平台下，上面的命令会在 android/app/src/main/res 目录下生成一堆图标文件

## 3. 如何生成 svg 图标

- 保证你的项目里安装了 `react-native-svg` 和 `react-native-iconfont-cli`
- 执行命令 `npx iconfont-init` 生成配置文件：

此时项目根目录会生成一个 iconfont.json 的文件，内容如下：

```
  "symbol_url": "直接复制iconfont官网提供的项目链接。请务必看清是.js后缀而不是.css后缀",
  "use_typescript": false,
  "save_dir": "./src/iconfont",
  "trim_icon_prefix": "icon",
  "default_icon_size": 18,
  "local_svgs": "./localSvgs"
```

- 开始生成 React-Native 标准组件

```
npx iconfont-rn
// or
yarn svg-init
```

## 4.配置外链打开 app 内指定页面以及传参

在 linking.ts 文件中配置相关链接，相关配置文档[查看](https://reactnavigation.org/docs/deep-linking)

通过使用 uri-scheme 配置

```
npx uri-scheme add rntemplate
```

测试

```
npx uri-scheme open rntemplate://路径 --ios
```

xcode

```
xcrun simctl openurl booted "rntemplate://路径"
```

adb

```
adb shell am start -W -a android.intent.action.VIEW -d "rntemplate://路径" [your android package name]
```

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

## 5.配置热更新

热更新使用的是微软家的 codePush 和使用它家的管理平台[https://appcenter.ms](https://appcenter.ms)

- 需要全局安装 codePush-cli

```
npm install -g code-push-cli
```

- 注册-登录

```
code-push register

code-push login
```

- 创建应用

```
code-push app add <appName> <platform> react-native
```

创建成功后，可以到[网站地址](https://appcenter.ms)查看

- 查看应用 Deploymeny Key

```
code-push deployment list <appName> -k
```

- 推送热更新文件

```
code-push release-react <appName> <platform> [options]
```

```
选项：
  --bundleName, -b           Name of the generated JS bundle file. If unspecified, the standard bundle name will be used, depending on the specified platform: "main.jsbundle" (iOS), "index.android.bundle" (Android) or "index.windows.bundle" (Windows)  [字符串] [默认值: null]
  --deploymentName, -d       Deployment to release the update to  [字符串] [默认值: "Staging"]
  --description, --des       Description of the changes made to the app with this release  [字符串] [默认值: null]
  --development, --dev       Specifies whether to generate a dev or release build  [布尔] [默认值: false]
  --disabled, -x             Specifies whether this release should be immediately downloadable  [布尔] [默认值: false]
  --entryFile, -e            Path to the app's entry Javascript file. If omitted, "index.<platform>.js" and then "index.js" will be used (if they exist)  [字符串] [默认值: null]
  --gradleFile, -g           Path to the gradle file which specifies the binary version you want to target this release at (android only).  [默认值: null]
  --mandatory, -m            Specifies whether this release should be considered mandatory  [布尔] [默认值: false]
  --noDuplicateReleaseError  When this flag is set, releasing a package that is identical to the latest release will produce a warning instead of an error  [布尔] [默认值: false]
  --plistFile, -p  Path to the plist file which specifies the binary version you want to target this release at (iOS only).  [默认值: null]
  --plistFilePrefix, --pre   Prefix to append to the file name when attempting to find your app's Info.plist file (iOS only).  [默认值: null]
  --rollout, -r              Percentage of users this release should be immediately available to  [字符串] [默认值: "100%"]
  --privateKeyPath, -k       Specifies the location of a RSA private key to sign the release with  [字符串] [默认值: false]
  --sourcemapOutput, -s      Path to where the sourcemap for the resulting bundle should be written. If omitted, a sourcemap will not be generated.  [字符串] [默认值: null]
  --targetBinaryVersion, -t  Semver expression that specifies the binary app version(s) this release is targeting (e.g. 1.1.0, ~1.2.3). If omitted, the release will target the exact version specified in the "Info.plist" (iOS), "build.gradle" (Android) or "Package.appxmanifest" (Windows) files.  [字符串] [默认值: null]
  --outputDir, -o            Path to where the bundle and sourcemap should be written. If omitted, a bundle and sourcemap will not be written.  [字符串] [默认值: null]
  --config, -c               Path to the React Native CLI configuration file  [字符串] [默认值: null]
  -v, --version              显示版本号  [布尔]

示例：
  release-react MyApp ios Releases the React Native iOS project in the current working directory to the "MyApp" app's "Staging" deployment

  release-react MyApp android -d Production -k ~/.ssh/codepush_rsa  Releases the React Native Android project in the current working directory to the "MyApp" app's "Production" deployment, signed with the "codepush_rsa" private key

  release-react MyApp windows --dev Releases the development bundle of the React Native Windows project in the current working directory to the "MyApp" app's "Staging" deployment

```

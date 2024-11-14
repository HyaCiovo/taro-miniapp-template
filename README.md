# Preact尝试版本

## 本地开发

### 版本要求
node >= 18.17.0

- #### 安装依赖

  ```shell
  pnpm install
  ```
- #### 启动本地开发服务

  ```shell
  pnpm run dev:weapp
  ```
- #### 启动开发者工具预览及调试

  ```shell
  微信开发者工具打开 weapp 文件夹并运行
  ```

## 生产打包

- **运行生产打包命令**

  ```shell
  pnpm run build:weapp
  ```

  

## 发布版本

- **发布预览版本**
- **发布生产版本**



## 所用技术

- [Taro](https://taro-docs.jd.com/docs)
- [Preact](https://preactjs.com/)
- [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [weapp-tailwindcss](https://weapp-tw.icebreaker.top/docs/quick-start/frameworks/taro)
- [lodash](https://www.lodashjs.com/)
- [dayjs](https://day.js.org/zh-CN/)

## 所用组件库

- [@antmjs/vantui](https://antmjs.github.io/vantui/#/home)




## VSCode 配置说明

- 推荐安装

  - `eslint`、`tslint`、`stylelint`、`prettier`
  
- 推荐使用 VScode->Preferences->setting，设置

  ```js
  {
    'eslint.autoFixOnSave': true,
    'tslint.autoFixOnSave': true,
    'eslint.validate': [
      'javascript',
      'javascriptreact',
      'html',
      {
        language: 'typescript',
        autoFix: true,
      },
      {
        language: 'typescriptreact',
        autoFix: true,
      },
    ],
    'prettier.stylelintIntegration': true,
    '[css]': {
      'editor.formatOnSave': true,
    },
    '[scss]': {
      'editor.formatOnSave': true,
    },
  }
  ```

## 目录结构

```text
├── config
├── README.md
├── package.json
├── src
│   ├── constant
│   ├── components
│   ├── hooks
│   ├── store
│   ├── pages
│   ├── styles
│   ├── types
│   ├── utils
|	      ├── index.ts
|	      └── request.ts
│   ├── app.config.ts
│   ├── app.less
│   ├── app.tsx
│   └── index.html
├── types
│   └── global.d.ts
├── .editorconfig
├── .eslintrc
├── .gitignore
├── .npmrc
├── babel.config.js
├── project.config.json
├── project.private.config.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── pnpm-lock.yaml
```


### 性能优化

> 请参考[小程序性能优化指南 | Taro 文档](https://nervjs.github.io/taro-docs/docs/optimized)。

- 针对页面内容渲染较多，导致页面进入时白屏率过高时，可通过`Taro.nextTick()`对非首屏展示的内容进行延时渲染，以减少用户等待时间；

  > 为了方便，可以抽成一个组件在多个地方使用。

  ```tsx
  /**
   * 使用该组件包裹，延迟渲染
   */
  const NextTickComponent: React.FC = ({ children }) => {
    const [isMounted, setIsMounted] = useState(false);
  
    useEffect(() => {
      Taro.nextTick(() => {
        setIsMounted(true);
      });
    }, []);
  
    return isMounted ? <>{children}</> : null;
  };
  
  export default NextTickComponent;
  
  
  // 用法
  <NextTickComponent>
    <Content />
  </NextTickComponent>
  ```

  

- 跳转预加载在 [官方文档](https://link.juejin.cn/?target=https%3A%2F%2Ftaro-docs.jd.com%2Fdocs%2Foptimized%23%E8%B7%B3%E8%BD%AC%E9%A2%84%E5%8A%A0%E8%BD%BD) 有说明，小程序由 A 页面跳转到 B 页面的过程中，从 A 页面发起跳转到 B 页面触发 onLoad，有着 300~400 毫秒的延时。我们可以在跳转的同时，开始请求相对慢的接口，能够在进入B页面时尽快拿到数据；

  ```tsx
  // A页面
  Taro.preload({
    RequestPromise: getData(),
  })
  Taro.navigateTo({ url: '/pages/B/B' })
  
  // B页面
  useEffect(() => {
    Taro.getCurrentInstance().preloadData?.RequestPromise?.then(res => {
      // 获取数据，更新渲染
    })
  }, []);
  ```

- 图片优化。适当压缩图片大小，对于长图可以分割图片，开启`lazyload`懒加载。要注意的是页面要在三屏以上，懒加载功能才会生效，就是说上一屏、当前屏、下一屏的图片是立刻加载的，之外的才会懒加载；

- 对于数据实时性要求较低的文章、商品展示页面，可以自行实现缓存优先策略；

- 项目中比较复杂、更新渲染有性能问题的组件可以尝试使用`Taro`官方提供的[小程序性能优化组件](https://link.juejin.cn/?target=https%3A%2F%2Ftaro-docs.jd.com%2Fblog%2F2021-03-10-taro-3-1-lts%232-%E6%96%B0%E5%A2%9E%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96%E7%BB%84%E4%BB%B6-customwrapper)：CustomWrapper来包裹该组件。

  ```jsx
  <CustomWrapper>  
    <GoodsList>
  </CustomWrapper>
  ```



### 埋点集成

- 参考文档：[微信小程序集成](https://developer.umeng.com/docs/147615/detail/147619)、[支付宝小程序集成](https://developer.umeng.com/docs/147615/detail/147727)、[uni-app多端小程序框架集成](https://developer.umeng.com/docs/147615/detail/178170)


- 参考代码：[Taro集成demo](https://github.com/umeng/mp-demos/tree/master/taro)






### 开发注意事项

> 1. 当代码更新后，开发者工具不会相应更新时。考虑：关闭`Taro`的`cache`缓存、关闭开发者工具热重载；
>2. `@antmjs/vantui`的组件使用`tailwindcss`类名有时不会生效；
> 3. 最新版微信开发者工具的真机调试有问题，`真机调试1.0`无法运行，推荐切换至`真机调试2.0`，或者回退开发者工具版本；
> 4. `Taro`的`dev`和`build`命令切换运行后，需要在微信开发者工具中清除缓存后，重新启动编译；
> 5. 每次发布版本推荐将`js`转为`es5`版本，提高兼容性。

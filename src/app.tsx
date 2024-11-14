import Taro from "@tarojs/taro";
// import uma, { defaultConfig } from "src/utils/trace";
import useCheckUpdate from "./hooks/useCheckUpdate";
import "./app.less";

// const env = process.env.TARO_ENV || "weapp";

/**
 * 友盟统计初始化
 * 支付宝小程序不支持 useOpenid、autoGetOpenid参数。
*/
// Taro.uma = uma.init(env === "weapp" ? {
//   ...defaultConfig,
//   // 使用Openid进行统计，此项为false时将使用友盟+uuid进行用户统计。
//   // 使用Openid来统计微信小程序的用户，会使统计的指标更为准确，对系统准确性要求高的应用推荐使用Openid。
//   useOpenid: false,
//   // 使用openid进行统计时，是否授权友盟自动获取Openid，
//   // 如若需要，请到友盟后台"设置管理-应用信息"(https://mp.umeng.com/setting/appset)中设置appId及secret
//   autoGetOpenid: false,
// } : defaultConfig)

const App = ({ children }: React.PropsWithChildren) => {
  useCheckUpdate();

  Taro.setNavigationBarColor({
    frontColor: "#000000",
    backgroundColor: "#ffffff",
    animation: {
      duration: 400,
      timingFunc: "easeIn",
    },
  });


  return (
    <>
      {children}
    </>
  );
};

export default App;

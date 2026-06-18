import type { UserConfigExport } from "@tarojs/cli"

export default {

  mini: {
    debugReact: true,
  },
  h5: {
    // 开启 React 源码追踪功能
    enableSourceMap: true,
  }
} satisfies UserConfigExport<'vite'>

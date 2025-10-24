const enConfig = require('./locales/en')
const zhConfig = require('./locales/zh')

module.exports = {
    configureWebpack: {
        node: {
          global: true,
          process: true
        },
    },
    plugins: [
        ['@vuepress/last-updated', {
            transformer: (timestamp, lang) => {
                const moment = require('moment')
                moment.locale(lang)
                return moment(timestamp).fromNow()
            }
        }
        ],

        ["vuepress-plugin-nuggets-style-copy", {
            copyText: "复制代码",
            tip: {
                content: "复制成功"
            }
        }
        ],
    ],
 
    title: 'mxdraw',
    // git 仓库名称
    base: '/mxdraw_docs/',
    theme: 'reco',
    shouldPrefetch: () => false,
    themeConfig: {
        // https://console.leancloud.cn/apps 云服务获取appId和 appKey 用于文档评论功能
        // valineConfig: {
        //     appId: 'Jar1fCXHWmhsq2Kgvrf5X1wl-gzGzoHsz',// your appId
        //     appKey: 'oQAlijCWUg8UzvgLWsggvrDV', // your appKey
        // },
        searchMaxSuggestions: 10,
        // 生成子侧边栏
        subSidebar: 'auto',
        locales: {
            "/": zhConfig,
            "/en/": enConfig,
        },
    },
    // 语言设置
    locales: {
        '/': {
            lang: 'zh-CN',
            description: 'mxdraw是构建CAD网页在线绘图的JS库，实现在线CAD图纸预览和编辑等功能的一套解决方案',
        },
        '/en/': {
            lang: 'en-US',
            description: 'mxdraw is a JS library for building CAD web pages for online drawing, providing a solution for previewing and editing CAD drawings online',
        }
    },
}
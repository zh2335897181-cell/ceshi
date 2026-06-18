export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/services/index',
    'pages/booking/index',
    'pages/profile/index',
    'pages/admin/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#1a1a1a',
    navigationBarTitleText: 'LUMIÈRE 美学沙龙',
    navigationBarTextStyle: 'white'
  },
  tabBar: {
    color: '#8b7355',
    selectedColor: '#c9a96e',
    backgroundColor: '#1a1a1a',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: '/assets/tabbar/home.png',
        selectedIconPath: '/assets/tabbar/home-active.png'
      },
      {
        pagePath: 'pages/services/index',
        text: '项目',
        iconPath: '/assets/tabbar/sparkles.png',
        selectedIconPath: '/assets/tabbar/sparkles-active.png'
      },
      {
        pagePath: 'pages/booking/index',
        text: '预约',
        iconPath: '/assets/tabbar/calendar.png',
        selectedIconPath: '/assets/tabbar/calendar-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: '/assets/tabbar/user.png',
        selectedIconPath: '/assets/tabbar/user-active.png'
      }
    ]
  }
})

import Mock from 'mockjs'

const List = []
const count = 50

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    title: '@sentence(10, 20)',
    cover: image_uri,
    'type|1': ['拼团', '报名', '抽奖', '投票', '地推'],
    finalPrice: '@float(0, 100, 2, 2)',
    startTime: '@datetime',
    endTime: '@datetime',
    'status|1': ['进行中', '已结束', '已隐藏', '未开始'],
    'isRecommend|1': ['是', '否'],
    'isAnli|1': ['是', '否'],
    merchant: {
      name: '@first'
    }
    /*activityEndTime: +Mock.Random.date('T'),
    activityRule: baseContent,
    activitySetting: baseContent,
    activityStartTime: +Mock.Random.date('T'),
    address: '',
    advancedSetting: '',
    content: '',
    cover: image_uri,
    createUserId: '@integer',
    createdAt: '@datetime',
    desc: '',
    enableActivityTime: '@integer(0, 1)',
    enableAdvancedSetting: '@integer(0, 1)',
    enableUserSale: '@integer(0, 1)',
    endTime: +Mock.Random.date('T'),
    ext: '',
    merchantId: '@integer(1, 10)',
    requireColumns: '',
    startTime: +Mock.Random.date('T'),
    title: '@title(5, 10)',
    type: '@integer(0, 1)',
    updatedAt: +Mock.Random.date('T'),
    userSaleSetting: ''
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 10)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']*/
  }))
}

const data = Mock.mock({
  'items|30': [{
    id: '@increment',
    cover: image_uri,
    title: '@sentence(5, 10)',
    'type|1': ['拼团', '报名', '抽奖', '投票', '地推'],
    'industry|1': ['教育', '体育', '珠宝', '汽车'],
    num: '@integer(1, 100000)',
    'status|1': ['published', 'draft', 'deleted']
  }]
})



export default [
  {
    url: '/api/activity/list',
    type: 'get',
    response: config => {
      const { searchStr , page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (searchStr && item.name.indexOf(searchStr) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const merchantList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: merchantList
        }
      }
    }
  },
  {
    url: '/api/scheme/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]


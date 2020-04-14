/** When your routing table is too long, you can split it into small modules**/

import Layout from '@/layout'

const merchantRouter = {
  path: '/merchant',
  component: Layout,
  redirect: '/merchant/dashboard',
  name: 'Merchant',
  meta: {
    title: '商家管理中心',
    icon: 'chart'
  }
}

export default merchantRouter
<route lang="json">
  {
    "meta": {
      "title": "测试页面3",
      "icon": "ReadFilled",
      "requiresAuth": true,
      "sort": 3,
      "permissions": ["admin", "business-manage"],
      "hideInMenu": false,
      "keepAlive": "BusinessManage",
      "pageGroup":"1",
      "customBar":"customBar",
      "barStyle":{
        "height":"100px"
      }
    }
  }
</route>

<script>
export default {
  name: 'BusinessManage',
}
</script>

<template>
  <div>
    测试页面1
  </div>
</template>

<style lang="less" scoped></style>

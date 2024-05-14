<route lang="json">
  {
    "meta": {
      "title": "测试页面",
      "icon": "ReadFilled",
      "requiresAuth": true,
      "sort": 8,
      "permissions": ["admin", "business-manage"],
      "hideInMenu": false,
      "keepAlive": "BusinessManage",
      "pageGroup":"1"
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
    测试页面2
  </div>
</template>

<style lang="less" scoped></style>

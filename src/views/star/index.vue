<template>
    <div>
        star
        <el-button @click='ck()'>点击</el-button>
    </div>
</template>

<script>
import { getStar } from '@/api/star'
export default {
  name: 'star',
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  methods: {
    ck() {
      const info = {
        username: 'admin',
        password: '123456'
      }
      getStar(info).then(response => {
        console.log(response)
      }).catch(res => {
        console.log(res + '123')
      })
    }
  },
  mounted() {
  }
}
</script>

<style scoped >

</style>

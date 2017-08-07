<template>
  <div class="singer">
    <list-view :data="singer"></list-view>
  </div>
</template>

<script>
import ListView from 'base/listview/listview'
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import Singer from 'common/js/singer'

export default {
  data() {
    return {
      singer: []
    }
  },
  created() {
    this._getSingerList()
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singer = this._normallizeSinger(res.data.list)
        }
      })
    },
    _normallizeSinger(list) {
      let data = {
        hot: {
          title: '热门',
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < 10) {
          data.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!data[key]) {
          data[key] = {
            title: key,
            items: []
          }
        }
        data[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      let hot = []
      let aToz = []
      for (let k in data) {
        if (data[k].title.match(/[a-zA-Z]/)) {
          aToz.push(data[k])
        } else if (data[k].title === '热门') {
          hot.push(data[k])
        }
      }
      aToz.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(aToz)
    }
  },
  components: {
    ListView
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>

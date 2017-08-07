<template>
  <scroll class="listview" :data="data" ref="scroll">
    <ul>
      <li v-for="item1 in data" :key="item1.title" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{item1.title}}</h2>
        <ul>
          <li v-for="item2 in item1.items" :key="item2.id" class="list-group-item">
            <img v-lazy="item2.avatar" class="avatar" />
            <span class="name">{{item2.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortCutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" class="item" :data-index="index">{{item}}</li>
      </ul>
    </div>
  </scroll>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'

export default {
  created () {
    this.touch = {}
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((item1) => {
        return item1.title.substr(0, 1)
      })
    }
  },
  components: {
    Scroll
  },
  methods: {
    onShortcutTouchStart(e) {
      let startIndex = e.target.getAttribute('data-index')
      this.touch.startIndex = +startIndex
      this.touch.startY = e.touches[0].pageY
      console.log(this.touch.startY)
      this.scrollTo(startIndex)
    },
    onShortCutTouchMove(e) {
      let changeIndex = (e.touches[0].pageY - this.touch.startY) / 18 | 0
      this.scrollTo(this.touch.startIndex + changeIndex)
    },
    scrollTo(index) {
      this.$refs.scroll.scrollToElement(this.$refs.listGroup[index])
    }
  }
}
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

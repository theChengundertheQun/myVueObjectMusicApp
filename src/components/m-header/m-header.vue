<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Music</h1>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped rel="stylesheet/stylus">
    @import "~common/stylus/variable"
    @import "~common/stylus/mixin"

    .m-header
        height: 44px
        text-align: center
        color: $color-theme
        .icon
            display: inline-block
            width: 30px
            height: 32px
            bg-image('logo')
            background-size: 30px 32px
            margin-top: 6px
            margin-right: 10px
            vertical-align: top
        .text
            line-height: 44px
            display: inline-block
            font-size: $font-size-large
</style>

<template>
  <el-tooltip effect="dark" content="选择喜欢的主题" placement="bottom">
    <el-color-picker
    v-model="theme"
    class="theme-picker"
    size="small"
    :predefine="_predefineColors"
    popper-class="theme-picker-dropdown"/>
  </el-tooltip>
</template>

<script>

// const version = require('element-ui/package.json').version // element-ui version from node_modules
// default color
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      chalk: '', // content of theme-chalk css
      theme: localStorage.getItem('theme') || '#1065A7' // default color
    }
  },
  computed: {
    ...mapState({
    // ...
      _predefineColors: '_predefineColors'
    })
  },
  watch: {
    theme (val, oldVal) {
      if (typeof val !== 'string') return
      const themeCluster = this.getThemeCluster(val.replace('#', ''))
      const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))

      const styles = [].slice.call(document.querySelectorAll('style'))
        .filter(style => {
          const text = style.innerText
          return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
      styles.forEach(style => {
        const { innerText } = style
        if (typeof innerText !== 'string') return
        style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
      })
      localStorage.setItem('theme', val)
      this.A_pcolor(val)
      this.$message({
        message: '换肤成功',
        type: 'success'
      })
    }
  },

  methods: {
    updateStyle (style, oldCluster, newCluster) {
      let newStyle = style
      oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
      })
      return newStyle
    },

    getThemeCluster (theme) {
      const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        if (tint === 0) { // when primary color is in its rgb space
          return [red, green, blue].join(',')
        } else {
          red += Math.round(tint * (255 - red))
          green += Math.round(tint * (255 - green))
          blue += Math.round(tint * (255 - blue))

          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)

          return `#${red}${green}${blue}`
        }
      }

      const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16)
        let green = parseInt(color.slice(2, 4), 16)
        let blue = parseInt(color.slice(4, 6), 16)

        red = Math.round((1 - shade) * red)
        green = Math.round((1 - shade) * green)
        blue = Math.round((1 - shade) * blue)

        red = red.toString(16)
        green = green.toString(16)
        blue = blue.toString(16)

        return `#${red}${green}${blue}`
      }

      const clusters = [theme]
      for (let i = 0; i <= 9; i++) {
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
      }
      clusters.push(shadeColor(theme, 0.1))
      return clusters
    },
    ...mapMutations([
      'A_pcolor'
    ])
  }
}
</script>

<template>
  <div class="text-black">
    <div class='author text-black' v-if='$root.isMoblie'>
      <img class='avatar' src="https://avatars2.githubusercontent.com/u/18487314?v=3&s=460" alt="" v-on:touchstart.stop.prevent='clear'
        v-on:touchend.stop.prevent='clear'>
      <h1>ChanCart</h1>
      <h1>入职大半年的页面仔</h1>
    </div>
    <h1 class='font-size-rxxsmall cntr-flex aligni-center'><img class='github' src='../webcom/github.png'>itHub</h1>
    <a href="https://github.com/ChanSun" class="text-black">https://github.com/ChanSun</a>
    <h1 class='font-size-rxxsmall cntr-flex aligni-center'><img class='gmail' src='../webcom/gmail.ico' alt="">mail</h1>
    <a href="mailto:chenrixi@gmail.com" class="text-black">chenrixi@gmail.com</a>
    <button class='cntr-block cntr-tm hq-btn' @click='toEdit'>Editor</button>
    <LoginBox :logincb='login' :show='$root.check_login' :disMiss='handleMiss' :disabled='inputDis' :mes='message' />
  </div>
</template>
<script>
  /*eslint no-console: ['error', { allow: ['log', 'error'] }] */
  let blurNum = null
  let setTime = ''
  let prefix = (function () {
    let styles = window.getComputedStyle(document.documentElement, ''),
      pre = (Array.prototype.slice
        .call(styles)
        .join('')
        .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
      )[1],
      dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1]
    return {
      dom: dom,
      lowercase: pre,
      css: '-' + pre + '-',
      js: pre[0].toUpperCase() + pre.substr(1)
    }
  })()
  import LoginBox from '../coms/loginbox.vue'

  export default {
    data() {
      return {
        inputDis: false,
        message: ''
      }
    },
    computed: {
      check_login() {
        return this.$root.check_login
      }
    },
    methods: {
      handleMiss() {
        this.$root.check_login = false
      },
      toEdit() {
        this.$router.push({
          name: 'bgeditor'
        })
        // this.$root.check_login = !this.$root.check_login
      },
      login(userInfo) {
        this.inputDis = true
        this.$axios.post(`${this.$root.apiRoot}/session`, userInfo).then(response => {
          if (response.status == 200) {
            this.$router.push({
              name: 'bgeditor'
            })
            this.handleMiss()
          }
          this.inputDis = false

        }, error => {
          this.inputDis = false
          if (error.response) {
            // console.log(error.response.headers.info)
            this.message = decodeURI(error.response.headers.info)
            // console.log(this.mes)
            this.$toast(decodeURI(error.response.headers.info))
          }
        })
      },
      clear(e) {
        let _this = e.target
        switch (e.type) {
          case 'touchstart':
            blurNum = parseInt(getComputedStyle(_this)[`${prefix.css}filter`].replace('blur(', '').replace('px)', ''))
            setTime = setInterval(function () {
              if (blurNum <= 0) return clearInterval(setTime)
              blurNum -= 1
              _this.style[`${prefix.css}filter`] = `blur(${blurNum}px)`
            }, 100)
            break
          case 'touchend':
            if (blurNum > 0) {
              clearInterval(setTime)
              _this.style[`${prefix.css}filter`] = 'blur(12px)'
            }
            break
          default:
            console.log('fuck')
        }
      }
    },
    components: {
      LoginBox
    }
  }

</script>
<style scoped>
  .author {
    position: relative;
    padding: 0.15rem .15rem 0rem 3.5rem;
    overflow: visible;
    line-height: 1.5;
    min-height: 3rem;
  }

  .avatar {
    overflow: hidden;
    border-radius: 8px;
    position: absolute;
    top: 15px;
    left: 15px;
    width: 2.5rem;
    margin-right: 15px;
    border-radius: 3px;
    filter: blur(12px);
  }

  .github {
    width: .8rem;
    height: .8rem;
    display: inline-block;
  }

  .gmail {
    width: .6rem;
    height: .6rem;
    display: inline-block;
  }

</style>
<style>
  .toast-top {
    background: white;
    padding: 8px;
    position: fixed;
    top: 8px;
    right: 8px;
    border-radius: 5px;
    z-index: 999;
  }

</style>

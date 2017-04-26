<template>
	<div style="height:100%">
		<div class='root-wrap'>
			<nav class='navbar'></nav>
			<div class='header cntr-flex' v-show='$root.isMoblie'>
				<Tab :edgeHeight='8' style='width:100%;height:100%' :makeCurIndex='headerIndex'>
					<TabItem @itemClick='pushRouter("main")'>
						Home
					</TabItem>
					<TabItem @itemClick='pushRouter("self")'>
						About me
					</TabItem>
				</Tab>
			</div>
			<div v-show='!$root.isMoblie' class='header_side'>
				<div class='author'>
					<div class="avatar">
						<img src="https://avatars2.githubusercontent.com/u/18487314?v=3&s=460" />
					</div>
					<router-link :to="{name:'main'}" class='text-black-force bread cntr-tm'><strong>Home</strong></router-link>
					<router-link :to="{name:'self'}" class='text-black-force bread'><strong>About Me</strong></router-link>
				</div>
			</div>
			<div class='main-wrap' :class='{"mobile-main-wrap":!$root.isMoblie}'>
				<transition :name='transitionName'>
					<!--<keep-alive>-->
						<router-view class='router-view'></router-view>
					<!--</keep-alive>-->
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
import Tab from '../coms/tab.vue'
import TabItem from '../coms/tab-item.vue'
export default {
	data() {
		return {
			transitionName: '',
			tab: 'main',
			show: false,
		}
	},
	computed: {
		showpre() {
			return this.$route.name == 'main' ? false : true
		},
		headerIndex() {
			let index
			switch (this.$route.name) {
			case 'main':
				index = 0
				break
			case 'self':
				index = 1
				break
			default:
				index = 0
				// console.log('fk')
			}
			return index
		}
	},
	watch: {
		$route(to, from) {
			const toPath = this.delEmpty(to.path.split('/'))
			const fromPath = this.delEmpty(from.path.split('/'))
			const toDepth = toPath.length
			const fromDepth = fromPath.length
			if (!this.$root.isMoblie) return
			if (toDepth == fromDepth) {
				this.transitionName = ''
			} else if (toDepth > fromDepth) {
				this.transitionName = 'slide-left'
			} else {
				this.transitionName = 'slide-right'
			}
		}
	},
	methods: {
		nav() {
			this.show = !this.show
		},
		changetab(tab) {
			this.$router.push({ name: tab })
		},
		delEmpty(arr) {
			let array = arr.filter(function (n) { return n })
			return array
		},
		preClick() {
			this.$router.go(-1)
		},
		pushRouter(name) {
			this.$router.push({ name })
		}
	},
	components: {
		Tab,
		TabItem
	}
}
</script>
<style lang='postcss' scoped>
$gray:#D3DCE6;
$orange:#ff9800;
$black:#606060;
$darkgray:#666666;
$red:#f70968;
  .nav{
    height: 0rem;
    position: absolute;
    top: .9rem;
    background: #464545;
    width: 100%;
    color:white;
    transition: all 800ms ease;
    justify-content: space-around;
    align-items: center;
  }
  a{
    color: white;
  }
  .pre{
    position: absolute;
    left: 1em;
  }
  .show-nav{
    height: 1rem;
  }
  .link-active{
    color: orange;
  }
  .text-center{
    text-align: center;
  }
  .icon-cog{
    transition: all 300ms ease;
    position:absolute;
    top:.2rem;
    right:.5rem;
  }
  .cog-tra{
    transform: rotate(180deg);
  }
  .root-wrap{
    position: relative;
    margin-left: auto;
    margin-right: auto;
    height: 100%;
  }
  .header{
    cursor: pointer;
    overflow: hidden;
    position: absolute;
    top: 0;
    left:0;
    height: .9rem;  
    font-size: .5rem;
    width: 100%;
    color: white;
    background-color: $black;
    font-family: sans-serif;
    text-align: center;
    /*padding: 8px;*/
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .header-text{
    color:#f8f8ff;
    font-size: .4rem;
    text-shadow: 0 0 20px #c4b6b6;
  }
  .main-wrap{
    background-color: rgb(220, 217, 212);
    background-image: linear-gradient(rgba(255, 255, 255, 0.498039) 0%, rgba(0, 0, 0, 0.498039) 100%), radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.0980392) 0%, rgba(0, 0, 0, 0.498039) 50%);
    background-blend-mode: soft-light, screen;  
    /*color:$gray;*/
    box-sizing: border-box;
    overflow: auto;
    height: 100%;
    padding-top: .9rem;
    padding-bottom: 0rem;
    transition: all 300ms ease;
  }
  .show-paddingtop{
    padding-top: 1.9rem;
  }
  .router-view{
    font-size: .3rem;
    width: 100%;
    height: 100%;
    /*position: relative;*/
    backface-visibility: hidden;
    /*position: absolute;*/
    /*top: 0;*/
    /*left: 0;*/
    padding: .2rem;
  }
  .footer{
    position: absolute;
    bottom: 0;
    width:100%;
    background-color: $black;
    padding: .1rem;
    display: flex;
    z-index: 99;
     .tab-item{
        flex:1;
        display: block;
        flex: 1;
        /*padding: 7px 0;*/
        color: #999;
        display: flex;
        justify-content: center;
        align-content: center;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
     }
     .tab-icon{
        width:.45rem;
        height: .45rem;
        background-color: $darkgray;
     }
  }
  .slide-left-enter-active {
    animation: right-in .5s;
    position: absolute;
  }
  .slide-left-leave-active {
    animation: right-out .5s;
    position: absolute;
  }
  .slide-right-enter-active {
    animation: left-in .5s;
    position: absolute;
  }
  .slide-right-leave-active {
    animation: left-out .5s;
    position: absolute;
  }

  @keyframes right-in {
    0% {
      transform: translate3d(100%,0,0);
    }
    100% {
      transform: translate3d(0,0,0);
    }
  }
  @keyframes right-out {
    0% {
      transform: translate3d(0,0,0);
    }
    100% {
      transform: translate3d(-100%,0,0);
    }
  }
 @keyframes left-in {
    0% {
      transform: translate3d(-100%,0,0);
    }
    100% {
      transform: translate3d(0,0,0);
    }
  }
  @keyframes left-out {
    0% {
      transform: translate3d(0,0,0);
    }
    100% {
      transform: translate3d(100%,0,0);
    }
  }
  [class^="icon-"], [class*=" icon-"] {
    font-size: .5rem;
    /*margin-bottom: .1rem;*/
  }
  /*no mobile style*/
  .header_side{
    width: 4rem;
    height: 100vh;
    box-shadow: -1px 0px 11px #9e9898;
    background-color: rgb(220, 217, 212);
    background-image: linear-gradient(rgba(255, 255, 255, 0.498039) 0%, rgba(0, 0, 0, 0.498039) 100%), radial-gradient(at 50% 0%, rgba(255, 255, 255, 0.0980392) 0%, rgba(0, 0, 0, 0.498039) 50%);
    background-blend-mode: soft-light, screen;
    position: fixed;
    left: 0;
    top: 5px;
  }
  .mobile-main-wrap{
    padding-left: 4rem;
  }
  .author{
    text-align: center;
    a{
      display: block;
    }
    .github{
      width: .8rem;
      height: .8rem;
    }  
    .gmail{
      width: .6rem;
      height: .6rem;
      display: inline-block;
    }
    img{
      width: 100%;
    }
  }
  .avatar{
    width: 2rem;
    height: 2rem;
    margin: 0 auto;
    margin-top: 1rem;
    img:hover{
      -webkit-animation:flash 1s .2s ease both;
      -moz-animation:flash 1s .2s ease both;
    };
  }
  @-webkit-keyframes flash{
    0%,50%,100%{opacity: 1;}
    25%,75%{opacity: 0;}
  }
  @-moz-keyframes flash{
    0%,50%,100%{opacity: 1;}
    25%,75%{opacity: 0;}
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
  .bread:hover{
    color:orange !important;
  }
  .navbar{
    z-index: 999;
    padding-top: 5px;
    background: url('../webcom/color-bar-3.svg') repeat-x top left;
    border: 0;
    text-transform: uppercase;
    font-size: .85em;
    font-weight: 700;
    position: absolute;
    width: 100%;
  }
</style>
<style>
.tab-item {
	font-size: .4rem !important;
}
</style>

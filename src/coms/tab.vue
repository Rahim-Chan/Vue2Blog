<template>
	<div class="tab-box">
		<slot></slot>
		<div class='edge' ref='edge'></div>
	</div>
</template>
<script>
	// import {Test} from './items.js';
	export default{
		// mixins:[Test],
		data(){
			return{
				curIndex:0,
				chilLength:0,

			}
		},
		props:{
			makeCurIndex:{
				default:0,
				type:Number
			},
			edgeHeight:{
				default:3,
				type:Number,
			},
			themeColor:{
				default:"orange",
				type:String
			}
		},
		mounted(){
			this.$refs.edge.style.height = this.edgeHeight+'px'
			this.$refs.edge.style.backgroundColor = this.themeColor
			this.edgeWidth()
		},
		methods:{

			updateIndex(){
				if(this.$children){
					let children = this.$children
					this.chilLength = children.length
					for(var i=0;i<children.length;i++){
						children[i].index = i
					}
				}
			},
			updateCurIndex(num){
				this.curIndex = num
				// this.$children[num].class
			},
			edgeWidth(){
				let index = this.curIndex
				this.$refs.edge.style.left = (index/this.chilLength)*100+'%';
				this.$refs.edge.style.right = (1-(index+1)/this.chilLength)*100+'%'
			}
		},
		watch:{
			makeCurIndex(n){
				this.curIndex = n
			},
			curIndex(n,o){
				if(n>o){
					this.$refs.edge.style.transition = 'right .3s cubic-bezier(.35,0,.25,1),left .3s cubic-bezier(0.68, -0.55, 0.27, 1.55) .2s'
				}else{
					this.$refs.edge.style.transition = 'right .3s cubic-bezier(0.68, -0.55, 0.27, 1.55) .2s,left .3s cubic-bezier(.35,0,.25,1)'

				}
				this.edgeWidth(n)
			}
		}
	}
</script>
<style scoped>
	.tab-box{
		display: flex;
		flex-direction: row;
		/*box-shadow: 0 0 4px gray;*/
		justify-content: center;
		align-items: center;
		text-align: center;
		/*line-height: 44px;*/
		position: relative;
	}
	.edge{
		/*width: 100%;*/
		background-color: orange;
		position: absolute;
		bottom: 0;
		/*box-shadow: 0 0 12px skyblue;*/
		
	}
</style>
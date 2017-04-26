<template>
	<div class="tab-item" @click='uploadIndex' :class="{active:isAvctive}" ref='tabItem'>
		<slot></slot>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				index:-1,
			}
		},
		computed:{
			isAvctive(){
				if(this.$parent.curIndex == this.index){
					return true
				}else{
					return false
				}
			}
		},
		mounted(){
			// this.$refs.tabItem.style.color=this.$parent.themeColor
			this.$parent.updateIndex()
		},
		methods:{
			uploadIndex(){
				this.$emit('itemClick')
				this.$parent.updateCurIndex(this.index)
			}
		}
	}
</script>
<style scoped>
	.tab-item{
		font-size: 14px;
		flex:1;
	}
	.active{
		color:orange;
		font-weight: bolder;
	}
</style>
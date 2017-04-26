<template>
	<div>
		<button @click='$router.go(-1)' class="hq-btn">Back</button>
		<router-view class='margin-top'></router-view>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		components:{
		}

	}
</script>
<style scoped>
	.margin-top{
		margin-top: .2rem;
	}
</style>
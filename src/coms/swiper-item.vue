<template>
	<div class="swiper-item" ref='swiperItem'>
		<slot></slot>
	</div>
</template>
<script>
	export default{
		data(){
			return{
			}
		},
		mounted(){
			this.$refs.swiperItem.style.width = this.$parent.$parent.$el.clientWidth+'px';
			// this.$parent.create()
		}
	}
</script>
<style>
	.swiper-item{
		position: relative;
		height:100%;
		/*display: inline-block;*/
		float: left;

	}
	img{
		height: auto;
		width: 100%;
	}
	.swiper-title{
		position: absolute;
	    background: -webkit-linear-gradient(transparent 30%, rgba(0,0,0,.3) 90%);
        background: linear-gradient(transparent 8%, rgba(0,0,0,0.4) 90%);
	    bottom: 0px;
	    color: white;
	    width: 100%;
	    text-align: left;
	    padding: 5px;
	}
	.swiper-title-content{
	    -webkit-line-clamp: 1;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    overflow: hidden;
	    height: 1.4em;
	    text-overflow: ellipsis;
	    /* height: 30px; */
	    width: 60%;
	}
</style>
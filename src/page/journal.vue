<template>
	<div class='jn-wrap'>
		<Tab :edgeHeight='5'>
			<TabItem v-for='(item,key) in items' :key='index' @itemClick='test(key)' style='font-size:.4rem;line-height:.7rem;'>
				{{item}}
			</TabItem>
		</Tab>
		<div class='jn-item' v-for='item in datalist' @click.stop.prevent='fetchDetail(item._id)'>
			<div class='banner'>
				<img :src="item.cover[0]" alt="">
			</div>
			<div class='ope cntr-p'>
				{{item.title}}
				<div class="like"></div>
				<div class="comment"></div>
			</div>
		</div>
	</div>
</template>
<script>
import TipBox from './tipbox.vue';
import Tab from '../coms/tab.vue';
import TabItem from '../coms/tab-item.vue';
import axios from 'axios'
export default {
	data() {
		return {
			items: ['日志', '吐槽'],
			datalist: [],
		}
	},
	created() {
		console.log('create')
	},
	mounted() {
		console.log('mounted')
		this.fechtNewList()
	},
	destroyed() {
		console.log('destroyed')
	},
	activated() {
		console.log('activated')
	},
	methods: {
		fechtNewList() {
			axios.get('/admin/news').then(response => {
				console.log(response)
				this.datalist = response.data
			})
		},
		test(key) {
			console.log(key)
		},
		fetchDetail(id) {
			// console.log(id)
			this.$router.push({ name: 'detail', params: { id } })
			// axios.get('/admin/detailnew').then(response=>{

			// })
		}
	},
	components: {
		Tab,
		TabItem,
		tipBox: TipBox
	}
}
</script>
<style scoped lang='postcss'>
	.jn-wrap{
		padding: .1rem;

		.jn-item{
			border-radius: 8px;
			overflow: hidden;
			height: 4rem;
			position: relative;
			box-shadow:  0 0 8px #dbdada;
			z-index: 10;
			.banner{
				img{
					width:100%;
					height: 100%;
				}
			}
			.ope{
			    background-color: rgba(44, 44, 46, 0.44);
			    position: absolute;
			    z-index: 9;
			    bottom: 0;
			    width: 100%;
			    display: flex;
			}
		}
	}
	
</style>
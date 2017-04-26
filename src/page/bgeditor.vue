<template>
	<div>
		<button class='hq-btn-success cntr-bm' @click='$router.push({name:"addnew"})'>Create</button>  
		<div v-for='(item, index) in datalist' class='item ct-underline cntr-flex justify-around aligni-center'>
			<span class='flex-auto'>Title：{{item.title}}</span>
			<button @click='handleEdit(item._id)' class='hq-btn-info  cntr-rm'>editor</button>
			<button @click='handleDel(index, item._id)' class='hq-btn-danger '>delete</button>
		</div>
    <!-- or -->
		<paginate
    :page-count="cptPageCount"
    :page-range="3"
    :margin-pages="2"
    :click-handler="clickCallback"
    :prev-text="'Prev'"
    :next-text="'Next'"
    :container-class="'pagination'"
    :page-class="'page-item'">
		</paginate>
	</div>
</template>
<script>
	/*eslint no-console: ['error', { allow: ['log', 'error'] }] */
	import Paginate from 'vuejs-paginate'
	export default{
		data(){
			return{
				p:1,
				listRows:5,
				count:0,
				datalist:[],
			}
		},
		mounted(){
			this.fechtNewList()
			const self = this
			document.getElementsByClassName('main-wrap')[0].addEventListener('scroll',function(e){
				// console.log(e.target.scrollHeight-e.target.scrollTop)
				if(e.target.scrollHeight-e.target.scrollTop<=window.innerHeight+.46){
					self.fechtNewList()
				}
			})
		},
		components:{
			paginate:Paginate
		},
		computed:{
			cptPageCount(){
				return this.count/this.listRows
			}
		},
		methods:{
			clickCallback(num){
				console.log(num)
				this.p = num
				this.fechtNewList()
			},
			handleEdit(id){
				this.$router.push({name:'addnew',query:{id}})
			},
			handleDel(index, id){
				this.$axios.delete(`${this.$root.apiRoot}/delete`,{data:{id:id}}).then(response=>{
					console.log(response)
					if(response.status==200){
						this.$toast(decodeURI(response.headers.info))
						this.datalist.splice(index, 1)
					}
				},error=>{
					console.log(error.response)
					if(error.response){
						this.$toast(decodeURI(error.response.headers.info))
					}
				})
			},
			fechtNewList(){
				this.$axios.get(`${this.$root.apiRoot}/admin/news?p=${this.p}&listRows=${this.listRows}`).then(response=>{
					let data = response.data
					// console.log(response)
					if(response.status == 200){
						data.forEach((item)=>{
							item['out_cover'] = `${this.$root.apiRoot}${item['cover']}`
						})
						this.count = response.headers.count
						this.datalist = response.data
					}
				})
			}
		}
}
</script> 
 
<style scpoed lang='postcss'>
	.item{
		border: 1px solid skyblue;
		padding: .1rem;
		background: gray;
	}
	.item:hover{
		/*opacity: .8;*/
		cursor: pointer;
	}
	.pagination{
		margin-top: .4rem;
		li{
			display:inline-block;
			background: #faf093;
			margin: 0 .04rem;
			padding: .1rem .2rem;
			border-radius: 5px;
			color: #8b8282;
		}
		.active{
			color: #faf093;
			background: #8b8282;
		}
	}
</style> 
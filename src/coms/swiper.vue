<template>
	<div class='swiper-box' ref='swiperBox'>
			<div class='swiper-gallery' ref='gallery'
				v-on:touchstart.stop.prevent='swiper'
				v-on:touchmove.stop.prevent='swiper'
				v-on:touchend.stop.prevent='swiper'
			>
				<slot></slot>
				
			</div>
			<!-- <button @click='preClick' class='button'>pre</button>

			<button @click='nextClick' class='button'>next</button> -->
			<div class='indicator' v-if='indicator&&infinite'>
				<div v-for='(item,key) in orglength' class="circle" :class="{'active':key==index}">
				</div>
			</div>
			<div class='indicator' v-else>
				<div v-for='(item,key) in orglength' class="circle1">
				</div>
				<div class="cirIndex" ref='cirIndex'></div>
			</div>
	</div>
</template>
<script>
	let x_velocity = 0;
	let X_velocity = 0;
	let pre_touch = {
		x:0,
		y:0,
		time:0
	}
	export default{
		data(){
			return {
				startX:0,
				detalX:0,
				threshold:0,
				index:0,
				orglength:0,
				interval:'',
				width:0,
				scrolling:false,
				checkLength:'',
			}
		},
		props:{
			indicator:{
				default:false,
				style:Boolean,
			},
			infinite:{
				default:false,
				style:Object,
			},
			auto:{
				default:false,
				style:Boolean,
			}

		},
		mounted(){
					this.checkLength = setInterval(()=>{
						this.initPage()
					},0)
		},
		methods:{
			initPage(){
					if(this.$children.length!=0){
						clearInterval(this.checkLength)
						this.width = this.$refs.swiperBox.clientWidth
						this.threshold = this.width*.3;
						this.orglength = this.$refs.gallery.childNodes.length;
						if(this.infinite){
							let lastItem = this.$refs.gallery.lastChild;
							let firstItem = this.$refs.gallery.firstChild;
							let clf = firstItem.cloneNode(true);
							let cll = lastItem.cloneNode(true);
							this.$refs.gallery.insertBefore(cll,firstItem)
							this.$refs.gallery.appendChild(clf)
							this.$refs.gallery.style.left = -this.width+"px"
						}else{
							this.$refs.cirIndex.style.right= ((this.orglength*2-1)*8+4)+'px'
						}
						this.$refs.swiperBox.style.height = (this.width*0.6)+'px';
						
						this.$refs.gallery.style.width = this.$refs.gallery.childNodes.length*this.width+'px';
						this.$refs.gallery.style.transform="translate3d("+(-this.width*this.index)+"px,0,0)";
						this.autoPlay()
					}
			},
			setVendor( property) {
				 let testEl = document.createElement('div');
				    var vendors = ['Webkit', 'Moz', 'ms'];
				    for(var vendor in vendors) {
				      if(testEl.style[ vendors[vendor] + property ] !== undefined) {
				        return vendors[vendor] + property;
				      }
				    }
				  console.log('null')
				  return property.toLowerCase();
			},
			nextClick(){
				if(this.scrolling){
					return
				}else{
					this.scrolling = true;
					if(!this.infinite){
						if(this.index == this.orglength-1){
							this.$refs.gallery.style.transition='all 400ms cubic-bezier(0.68, -0.55, 0, 1.56)'
							this.$refs.gallery.style.WebkitTransition='all 400ms cubic-bezier(0.68, -0.55, 0, 1.56)'
						}else{
							this.index+=1
							this.$refs.gallery.style.transition='all 400ms'
							this.$refs.gallery.style.WebkitTransition='all 400ms'
						}
					}else{
						this.index+=1
						this.$refs.gallery.style.transition='all 400ms'
						this.$refs.gallery.style.WebkitTransition='all 400ms'
					}
					this.$refs.gallery.style.transform="translate3d("+(-this.width*this.index)+"px,0,0)";
					this.$refs.gallery.style.WebkitTransform="translate3d("+(-this.width*this.index)+"px,0,0)";
					if(!this.infinite){
						this.$refs.cirIndex.style.transform="translate3d("+(16*this.index)+"px,-11px,0)";
						this.$refs.cirIndex.style.WebkitTransform="translate3d("+(16*this.index)+"px,-11px,0)";
						
					}

					this.$refs.gallery.addEventListener('transitionend',()=>{
						if(this.index==this.orglength){
							this.index = 0
							this.$refs.gallery.style.transition='none'
							this.$refs.gallery.style.transform="translate3d(0,0,0)";
						}
							this.scrolling = false;
					})
					//ios webkit
					this.$refs.gallery.addEventListener('webkitTransitionEnd',()=>{
						if(this.index==this.orglength){
							this.index = 0
							this.$refs.gallery.style.WebkitTransition='none'
							this.$refs.gallery.style.WebkitTransform="translate3d(0,0,0)";
						}
						this.scrolling = false;
					})
				}
			},
			preClick(){
				if(this.scrolling){
					return 
				}else{
					this.scrolling = true;
					if(!this.infinite){
						if(this.index == 0){
							this.$refs.gallery.style.transition='all 400ms cubic-bezier(0.68, -0.55, 0, 1.56)'
							this.$refs.gallery.style.WebkitTransition='all 400ms cubic-bezier(0.68, -0.55, 0, 1.56)'
						}else{
							this.index-=1
							this.$refs.gallery.style.transition='all 400ms ease'
							this.$refs.gallery.style.WebkitTransition='all 400ms ease'
						}
					}else{
						this.index-=1
						this.$refs.gallery.style.transition='all 400ms ease'
						this.$refs.gallery.style.WebkitTransition='all 400ms ease'
					}
					this.$refs.gallery.style.transform="translate3d("+(-this.width*this.index)+"px,0,0)";
					this.$refs.gallery.style.WebkitTransform="translate3d("+(-this.width*this.index)+"px,0,0)";
					// indicator
					if(!this.infinite){
						this.$refs.cirIndex.style.transition = 'all 400ms ease'
						this.$refs.cirIndex.style.WebkitTransition = 'all 400ms ease'
						this.$refs.cirIndex.style.transform="translate3d("+(16*this.index)+"px,-11px,0)";
						this.$refs.cirIndex.style.WebkitTransform="translate3d("+(16*this.index)+"px,-11px,0)";
					}
				
					if(this.infinite){
						this.$refs.gallery.addEventListener('transitionend',()=>{
						if(this.index==-1){
							this.index = this.orglength-1
							this.$refs.gallery.style.transition='none'

							this.$refs.gallery.style.transform="translate3d("+(-this.width*(this.orglength-1))+"px,0,0)";
							}
						})
						this.$refs.gallery.addEventListener('webTransitionEnd',()=>{
							if(this.index==-1){
								this.index = this.orglength-1
								this.$refs.gallery.style.WekitTransition='none'
								this.$refs.gallery.style.WebkitTransform="translate3d("+(-this.width*(this.orglength-1))+"px,0,0)";
							}

							})
					}
						this.scrolling = false;


				}
			},
			autoPlay(){
				if(this.auto){
					this.interval = setInterval(()=>{
					this.nextClick()
				},2000)
				}
			},
			swiper(e){
				switch(e.type){
					case 'touchstart':
						if(this.scrolling){
							return;
						}
						// console.log(this.$refs.gallery.getBoundingClientRect())
						this.detalX = 0;
						x_velocity = 0;
						X_velocity = 0;
						this.startX = e.changedTouches[0].clientX;
						this.$refs.gallery.style.transition = 'none'
						this.$refs.gallery.style.WebkitTransition = 'none'
						if(!this.infinite){
							this.$refs.cirIndex.style.transition = 'none'
							this.$refs.cirIndex.style.WebkitTransition = 'none'
						}

					break;
					case 'touchmove':
						if(this.scrolling){
							return;
						}
						clearInterval(this.interval)
						this.detalX = e.changedTouches[0].clientX-this.startX;
						this.$refs.gallery.style.WebkitTransform="translate3d("+(this.detalX+(-this.index*this.width))+"px,0,0)"
						this.$refs.gallery.style.transform="translate3d("+(this.detalX+(-this.index*this.width))+"px,0,0)"
						//indicator
						if(!this.infinite){
							if(this.index==0&&this.detalX>0){

							}else if(this.index==this.orglength-1&&this.detalX<0){

							}else{
								if(Math.abs(this.detalX)/20<=16){
									this.$refs.cirIndex.style.transform="translate3d("+(-((this.detalX)/20+(-this.index*16)))+"px,-11px,0)"
									this.$refs.cirIndex.style.WebkitTransform="translate3d("+(-((this.detalX)/20+(-this.index*16)))+"px,-11px,0)"
								}
							}
						}

						if(pre_touch.time!==0 && pre_touch.time!==e.timeStamp){
						x_velocity = Math.abs(e.changedTouches[0].clientX-pre_touch.x)/Math.floor(e.timeStamp-pre_touch.time);
						X_velocity = (e.changedTouches[0].clientX-pre_touch.x)/Math.floor(e.timeStamp-pre_touch.time);
						}
						pre_touch.time = e.timeStamp;
						pre_touch.x = e.changedTouches[0].clientX;
						pre_touch.y = e.changedTouches[0].clientY;
					break;
					case 'touchend':
						if(this.scrolling){
							return;
						}
						let gallery = this.$refs.gallery;
						this.$refs.gallery.style.transition = 'all 400ms ease';
						this.$refs.gallery.style.WebkitTransition='all 400ms ease'
						if(!this.infinite){
							this.$refs.cirIndex.style.transition = 'all 400ms ease'
							this.$refs.cirIndex.style.WebkitTransition = 'all 400ms ease'
						}

						const _this = this ;
						if(Math.abs(this.detalX)>this.threshold||x_velocity>.3){
							if(X_velocity>0){
								this.preClick()
							}else{
								this.nextClick()
							}
						}else{
							this.$refs.gallery.style.transform="translate3d("+(-this.width*this.index)+"px,0,0)"
							this.$refs.gallery.style.WebkitTransform="translate3d("+(-this.width*this.index)+"px,0,0)"
							//indicator
							if(!this.infinite){
								this.$refs.cirIndex.style.transform="translate3d("+(16*this.index)+"px,-11px,0)"
								this.$refs.cirIndex.style.WebkitTransform="translate3d("+(16*this.index)+"px,-11px,0)"
							}
						}
						this.autoPlay()
					break;
					default:
					console.log('fuck')
				}
			}
		}
	}
</script>
<style>
	.swiper-box{
		overflow: hidden;
		margin-left: auto;
		margin-right: auto;
		height: 169px;
		position: relative;
		/*overflow-x:scroll


		;*/
	}
	.swiper-gallery{
		height: 100%;
		position: relative;		
	}
	.indicator{
	    width: 100%;
	    position: absolute;
	    bottom: 0px;
	    padding: 8px 0;
	    /* height: 30px; */
	    /* line-height: 30px; */
	    text-align: right;
	    font-size: 10px;
	    right: 0px;
	    padding-right: 8px;
	}
	.circle1{
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: black;
		opacity: .3;
		margin:0 4px;
		display: inline-table;
	}
	.circle{
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: black;
		opacity: .3;
		margin:0 4px;
		display: inline-table;
	}
	.cirIndex{
		background-color: black;
	    width: 8px;
	    height: 8px;
	    position: absolute;
	    /*left: 0;*/
	    /*top: 11px;*/
		border-radius: 50%;
		transform: translateY(-11px);
	}
	.circle:last-child{
		margin-right: 8px;
	}
	.circle.active{
	    width: 10px;
	    height: 10px;
	    margin-bottom: -3px;
	    /*background-color: black;*/
	    opacity: 1;
	}
	.button{
		width:30px;
		height: 30px;
		background-color: gray;
		bottom: 50px;
		position: relative;
	}
</style>	

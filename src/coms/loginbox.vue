<template>
	<div v-if='show'>
		<div class='login-wrap sim-table' @click='handleClick'>
			<div class='sim-table-cell'>
				<div class='login-box'>
					<div class='self-start'>
						Login
					</div>
					<input type="text" ref='username' v-model='username' class='hq-input' tip='test' placeholder="UserName" :disabled='disabled'>
					<input type="text" ref='password' v-model='password' class='hq-input' tip='test' placeholder="Password" :disabled='disabled'>
					<div class='full-width cntr-flex justify-between alignc-end'>
						<span class='error'>{{message}}</span>
						<button @click='login' class='hq-btn' :disabled='disabled'>
							<span v-show='!disabled'>login</span>
							<span v-show='disabled'>Loding...</span>
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>	
export default {
	props: {
		show: {
			type: Boolean,
			default: false
		},
		logincb: {
			type: Function,
			default: () => { }
		},
		disMiss: {
			type: Function,
			default: () => { }
		},
		disabled: {
			type: Boolean,
			default: false
		},
		mes: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			message: '',
			username: '',
			password: '',
			display: false,
		}
	},
	watch: {
		mes(n) {
			this.message = n
		}
	},
	mounted() {
		window.addEventListener('keydown', (e) => {
			switch (e.keyCode) {
				case 13:
					this.login()
					break;
				case 27:
					this.disMiss()
					break;
				default:
				// console.log('foo')
			}
		})
	},
	methods: {
		handleClick(e) {
			if (e.target.className == 'sim-table-cell') {
				// console.log(e)
				this.disMiss()
				// this.show = false
			}
		},
		login() {
			if (this.username == '') {
				this.$refs.username.focus()
				this.message = '填写账号'
			} else if (this.password == '') {
				this.$refs.password.focus()
				this.message = '填写密码'
			} else {
				this.logincb({ username: this.username, password: this.password })
			}
		},
	}
}
</script>
<style lang='postcss' scoped>
	.login-wrap{
		position: fixed;
		left: 0;
		height: 100%;
		width: 100%;
		bottom: 0;
		background: rgba(175, 163, 145, 0.72);
		z-index: 999;
		display: table;
	}
	.login-box{
		display: inline-flex;
		vertical-align: center;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		padding: .3rem .5rem;
    background: #e68b8b;
    border: 5px;
    box-shadow: 1px 2px 18px 5px #b9b0b0;
	}
	.blur-wrap{
		background: gray;
		position: absolute;
		width: 100%;
		height: 100%;
		left:0;
		top:0;
		/*background: rgba(204, 176, 176, 0.67);*/
		filter:blur(12px);
	}
	.error{
		color:#616161;
	}
</style>
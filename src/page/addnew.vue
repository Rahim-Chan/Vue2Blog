<template>
	<div>
		<div class='cntr-row' style='padding:0 10%'>
			<input type='text' v-model='data.title' class='title ct_input cntr-bm full-width' placeholder='title'>
			<textarea type='text' v-model='data.content' class='content ct_textarea cntr-bm full-width' placeholder='markdown'></textarea>
			<a href='javascript:' class='file'>
	                  Cover
	                  <input type='file' accept='image/*' @change='fileChange'>
	              </a>
			<div class='img_pre' v-if='img_show'>
				<img :src='data.output_img_src' alt='preview' class='center-transform-cell full-width'>
			</div>
			<br/>
			<div class='btn-wrap'>
				<button type='submit' class='ct_btn hq-btn' @click='upLoad' v-if='isNew'>Upload</button>
				<button type='submit' class='ct_btn hq-btn' @click='upDate' v-else>Update</button>
	
				<button class='preview hq-btn' @click='preview'>Preview</button>
			</div>
			<div v-if='is_preview' class='pre-box'>
				<button class='hq-btn close' @click='close'>Close</button>
				<div v-html='markdown' class='markdown'></div>
			</div>
		</div>
	</div>
</template>
<script>
var hljs = require('highlight.js')
// full options list (defaults)
var md = require('markdown-it')({
	html: true,        // Enable HTML tags in source
	xhtmlOut: true,        // Use '/' to close single tags (<br />).
	// This is only for full CommonMark compatibility.
	breaks: false,        // Convert '\n' in paragraphs into <br>
	langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
	// useful for external highlighters.
	linkify: false,        // Autoconvert URL-like text to links

	// Enable some language-neutral replacement + quotes beautification
	typographer: false,

	// Double + single quotes replacement pairs, when typographer enabled,
	// and smartquotes on. Could be either a String or an Array.
	//
	// For example, you can use '«»„“' for Russian, '„“‚‘' for German,
	// and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
	quotes: '“”‘’',

	// Highlighter function. Should return escaped HTML,
	// or '' if the source string is not changed and should be escaped externaly.
	// If result starts with <pre... internal wrapper is skipped.
	highlight: function (str, lang) {
		if (lang && hljs.getLanguage(lang)) {
			try {
				return '<pre class="hljs"><code>' +
					hljs.highlight(lang, str, true).value +
					'</code></pre>'
			} catch (error) {
				/*eslint no-console: ['error', { allow: ['log', 'error'] }] */
				console.log(error)
			}
		} else if (lang == 'vue') {
			return '<pre class="hljs"><code>' + hljs.highlightAuto(str).value + '</code></pre>'
		} else {
			return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
		}

	}
})
export default {
	data() {
		return {
			title: '',
			content: '',
			markdown: '',
			is_preview: false,
			img_show: false,
			img_src: '',
			data: {
				title: '',
				content: '',
				output_img_src: ''
			}
		}
	},
	computed: {
		isNew() {
			return this.$route.query.id ? false : true
		}
	},
	mounted() {
		// console.log(this.$route.query)
		const _this = this
		window.onkeydown = function (e) {
			if (e.keyCode == 27) {
				_this.is_preview = false
			}
		}
		if (this.$route.query.id) {
			this.fetchData(this.$route.query.id)
		}
	},
	methods: {
		preview() {
			this.is_preview = true
			this.markdown = md.render(this.data.content)
		},
		close() {
			this.is_preview = false
		},
		fileChange(e) {
			let files = e.target.files || e.dataTransfer.files
			this.image = files[0]
			// this.img_src = URL.createObjectURL(files[0])
			this.$set(this.data, 'output_img_src', URL.createObjectURL(files[0]))
			// 将图片转化base64
			// const reader = new FileReader()
			// reader.onload = (e) => {
			//   this.pre_url = reader.result
			// }
			// reader.readAsDataURL(file)
			this.img_show = true
			/*eslint no-console: ['error', { allow: ['log', 'error'] }] */
			// console.log(this.image)
		},
		upLoad() {
			let oData = new FormData()
			//js 生成FormData容器
			oData.append('content', this.data.content)
			oData.append('title', this.data.title)
			oData.append('cover', this.image)
			this.$axios.post(`${this.$root.apiRoot}/upload`, oData).then(response => {
				// console.log(response)
				if(response.status == 200){
					this.$toast(decodeURI(response.headers.info))
				}
			},error => {
				if(error.response){
					this.$toast(decodeURI(error.response.headers.info))
				}
			})
		},
		upDate() {
			let oData = new FormData()
			//js 生成FormData容器
			oData.append('content', this.data.content)
			oData.append('title', this.data.title)
			// console.log(this.image)
			if (this.image) {
				oData.append('cover', this.image)
			} else {
				// console.log(this.data.cover)
				oData.append('cover', this.data.cover)
			}
			oData.append('id', this.$route.query.id)
			this.$axios.put(`${this.$root.apiRoot}/update`, oData).then(response => {
				// console.log(response)
				this.$toast(decodeURI(response.headers.info), 'top')
				if(response.status == 200){
					this.$toast(decodeURI(response.headers.info))
				}
			},error => {
				if(error.response){
					this.$toast(decodeURI(error.response.headers.info))
				}
			})
		},
		fetchData(id) {
			this.$axios.get(`${this.$root.apiRoot}/admin/detailnew`, { params: { id: id } }).then(response => {
				// console.log(response)
				// this.title = response.data.title
				// this.content = response.data.content
				response.data['output_img_src'] = `${this.$root.apiRoot}${response.data.cover}`
				this.data = response.data
				this.img_show = true
			})
		}
	}
}
</script> 
 
<style scpoed lang='postcss'>
  .btn-wrap{
    position: fixed;
    bottom: 2em;
    right: 2em;
    button{
      display: block;
      margin-bottom: .5rem;
    }
  }
  .content{
    height: 6rem;
  }
  .pre-box{
    z-index: 99;
    overflow-x: scroll;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgb(160, 154, 154);
  }
  .close{
    position: absolute;
    right: .2rem;
    top: .2rem;
  }
  .markdown{
    padding: .5rem 1rem;
  }
  .img_pre{
    background: rgba(89, 82, 82, 0.25);
    width: 3rem;
    height: 3rem;
    overflow: hidden;
  }
</style> 
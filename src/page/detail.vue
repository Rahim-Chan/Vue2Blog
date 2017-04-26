<template>
	<div :class='{"pad-rem":!$root.isMoblie}'>
		<h1 style="color:blackfont-size:.8remtext-align:center">{{detail.title}}</h1>
		<div v-html='markdown'></div>
	</div>
</template>
<script>
var hljs = require('highlight.js')

// full options list (defaults)
let options = {
	html: true,        // Enable HTML tags in source
	xhtmlOut: true,        // Use '/' to close single tags (<br />).
	// This is only for full CommonMark compatibility.
	breaks: false,        // Convert '\n' in paragraphs into <br>
	langPrefix: 'language-',  // CSS language prefix for fenced blocks. Can be
	// useful for external highlighters.
	linkify: false,        // Autoconvert URL-like text to links

	// Enable some language-neutral replacement + quotes beautification
	typographer: true,

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
}
var md = require('markdown-it')(options)

export default {
	data() {
		return {
			inner: '',
			markdown: '',
			detail: {
				title: ''
			}
		}
	},
	mounted() {
		this.fetchNew()
	},
	methods: {
		fetchNew() {
			this.$axios.get(`${this.$root.apiRoot}/detailnew`, { params: { id: this.$route.params.id } }).then(response => {
				this.detail.title = response.data.title
				this.markdown = md.render(response.data.content)
			})
		}
	}
}
</script>
<style scpoed>
.pad-rem {
	padding: 0 1rem 1rem !important
}

.pad-rem img {
	padding: 0 10vw
}
</style>
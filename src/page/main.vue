<template>
  <div>
    <div class='content-box'>
      <div class='log text-black' ref='item_wrap'>LOG</div>
      <div class="item-wrap" v-for='(item,index) in datalist' :key='item' @click.stop.prevent='fetchDetail(item._id)' v-if='$root.isMoblie'
        :style='cptHeight'>
        <div class="item">
          <div class="text">
            <img :src="item.out_cover" alt="" class="center-transform-cell">
          </div>
          <div class="tip two-clamp">
            <!-- 我的日志 -->
            {{item.title}}
          </div>
        </div>
      </div>
      <div v-else class='item-wrap-m' @click.stop.prevent='fetchDetail(item._id)'>
        <div class='cover'>
          <img :src="item.out_cover" alt="" class="center-transform-cell">
        </div>
        <div class='text'>
          {{item.title}}
        </div>
      </div>
      <paginate :page-count="cptPageCount" :page-range="3" :margin-pages="2" :click-handler="clickCallback" :prev-text="'Prev'"
        :next-text="'Next'" :container-class="'pagination'" :page-class="'page-item'">
      </paginate>
    </div>
  </div>
</template>
<script>
  import Paginate from 'vuejs-paginate'

  export default {
    data() {
      return {
        module: false,
        datalist: [],
        listRows: 3,
        p: 1,
        count: 0,
      }
    },
    mounted() {
      this.fechtNewList()
    },
    computed: {
      cptHeight() {
        return 'height:' + this.$refs.item_wrap.clientWidth / 2 + 'px'
      },
      cptPageCount() {
        return this.count / this.listRows
      }
    },
    methods: {
      clickCallback(num) {
        this.p = num
        this.fechtNewList()
      },
      fechtNewList() {
        this.$axios.get(`/news?p=${this.p}&listRows=${this.listRows}`).then(response => {
          let data = response.data
          data.forEach((item) => {
            item['out_cover'] = `${this.$root.apiRoot}${item['cover']}`
          })
          this.count = response.headers.count
          this.datalist = response.data
        })
      },
      fetchDetail(id) {
        // console.log(id)
        this.$router.push({
          name: 'detail',
          params: {
            id
          }
        })
        // axios.get('/admin/detailnew').then(response=>{

        // })
      },
    },
    components: {
      paginate: Paginate
    },
  }

</script>
<style scoped lang='postcss'>
  $gray:#dedede;
  .author {
    position: relative;
    padding: 0.15rem .15rem 0rem 3rem;
    overflow: visible;
    line-height: 1.5;
    min-height: 3rem;
  }

  .avatar {
    overflow: hidden;
    border-radius: 8px;
    position: absolute;
    top: 15px;
    left: 15px;
    width: 2.5rem;
    margin-right: 15px;
    border-radius: 3px;
    filter: blur(12px);
  }

  .log {
    padding-bottom: 8px;
    margin-bottom: 8px;
    border-bottom: 1px solid orange;
  }

  .content-box {
    padding: 8px;
    /*	display: flex;
		justify-content: space-around;
		flex-wrap: wrap;*/
  }

  .item-wrap {
    /*flex:auto;*/
    width: 50%;
    padding: 0.08rem;
    /*height: 3.5rem;*/
    display: inline-block;
  }

  .item {
    height: 100%;
    border-radius: 3px;
    /*padding: .2rem;*/
    /*background-color: #41cbf1;*/
    position: relative;
    font-size: .32rem;
    overflow: hidden;
    z-index: 10;
    .text {
      height: 100%;
      img {
        width: 100%;
        /*height: 100%;*/
        /*background: gray;*/
      }
    }
    .tip {
      position: absolute;
      text-align: left;
      bottom: 0;
      color: white;
      /*padding: .15rem;*/
      height: 100%;
      left: 0;
      width: 100%;
      font-size: 0.35rem;
      line-height: 1.4em;
      background: rgba(42, 42, 42, 0.64);
      padding-left: .2rem;
    }
  }

  .purple {
    background-color: #a286c0;
  }

  .rose {
    background-color: #E91E63;
  }

  .yellow {
    background-color: #FFEB3B;
  }

  .green {
    background-color: #7cc576;
  }

  .orange {
    background-color: #f78e57;
  }

  .sky {
    background-color: #b3e5fc;
  }

  .red {
    background-color: #f26d7e;
  }

  .title {
    line-height: 90px;
    text-align: center;
    color: #313131;
    font-size: .3rem;
  }

  .white {
    background-color: $gray;
  }

  .fullwidth {
    width: 100% !important;
  }

  .animation {
    animation: shake 300ms .1s ease-out both;
    /*-moz-animation:shake 300ms .1s ease-out both;*/
    transform-origin: center center;
  }

  @-webkit-keyframes shake {
    0%,
    100% {
      -webkit-transform: translateX(0) rotate(0deg);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translateX(-5px) rotate(-2deg);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translateX(5px) rotate(2deg);
    }
  }

  @-moz-keyframes shake {
    0%,
    100% {
      -moz-transform: translateX(0) rotate(0deg);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -moz-transform: translateX(-5px) rotate(-2deg);
    }
    20%,
    40%,
    60%,
    80% {
      -moz-transform: translateX(5px) rotate(2deg);
    }
  }

  .item-wrap-m {
    cursor: pointer;
    width: 100%;
    background: #d9d7d5;
    margin-bottom: 1em;
    /*height: 3rem;*/
    padding: 1em 1em 1em 1em;
    color: black;
    overflow: hidden;
    .text {
      /*-webkit-line-clamp: 5;*/
      /*text-overflow: ellipsis;*/
      -webkit-line-clamp: 4;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 6em;
      text-overflow: ellipsis;
    }
  }

  .item-wrap-m:hover {
    background-color: #dbdbdb;
  }

  .item-wrap-m:before,
  .item-wrap-m:after {
    display: table;
    content: "";
  }

  .item-wrap-m:after {
    clear: both;
  }

  .cover {
    float: left;
    margin-right: 1em;
    width: 3rem;
    height: 3rem;
    overflow: hidden;
    img {
      /*height:100%;*/
      width: 100%;
    }
  }

</style>
<style lang='postcss'>
  .pagination {
    margin-top: .2rem;
    li {
      display: inline-block;
      background: #faf093;
      margin: 0 .04rem;
      padding: .1rem .2rem;
      border-radius: 5px;
      color: #8b8282;
    }
    .active {
      color: #faf093;
      background: #8b8282;
    }
  }

</style>

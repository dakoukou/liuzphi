<template>
  <div class="hello">
    <h1>文章首页</h1>
    <a-button @click="goToEditArticle" type="link">写一篇文章</a-button>
  </div>
</template>
<script>
  import { useRouter } from 'vue-router'

  export default {
    name: 'ArticleIndex',
    props: {
      msg: String,
    },
    setup() {
      const { push } = useRouter()

      function goToEditArticle() {
        push('edit')
      }
      return {
        goToEditArticle,
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>

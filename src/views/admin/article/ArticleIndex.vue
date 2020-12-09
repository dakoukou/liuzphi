<template>
  <div>

    <a-button @click="goToEditArticle" type="link">写一篇文章</a-button>
     <a-table :columns="columns" :data-source="data">
       <template #name="{ text }">
         <a>{{ text }}</a>
       </template>
       <template #customTitle>
         <span><smile-outlined /> 标题</span>
       </template>
       <template #publishState="{ text, record }">
         <a-switch checked-children="取消发布" un-checked-children=发布 v-model:checked="record.publishState" />
       </template>
       <template #encryptionState="{ text, record }">
         <span v-if="record.encryptionState ===0"><smile-outlined /> 未加密</span>
         <a-input-password v-else v-model:value="record.encryption" placeholder="input password" />
       </template>
       <template #tags="{ text: tags }">
      <span>
        <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
       </template>
       <template #action="{ text, record }">
          <a-button type="primary" shape="circle">
    <template #icon><EditOutlined /> </template
          ></a-button>
        <a-divider type="vertical" />
            <a-button type="danger">
    <template #icon><DeleteOutlined /> </template
            ></a-button>
       </template>
     </a-table>
  </div>
</template>
<script>
  import { useRouter } from 'vue-router'
  import {ref} from 'vue'
  import { SmileOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';
  export default {
    name: 'ArticleIndex',
    props: {
      msg: String,
    },
    components:{DeleteOutlined, EditOutlined, SmileOutlined},
    setup() {
      const { push } = useRouter()
      const columns = [
        {
          dataIndex: 'title',
          key: 'title',
          ellipsis: true,
          slots: { title: 'customTitle', customRender: 'title' },
        },
        {
          title: '评论数',
          dataIndex: 'commentNums',
          key: 'commentNums',
          slots: { title: 'customCommentNums', customRender: 'commentNums' },
        },
        {
          title: '阅读数',
          dataIndex: 'readNums',
          key: 'readNums',
          slots: { title: 'customReadNums', customRender: 'readNums' },
        },
        {
          title: '点赞数',
          dataIndex: 'likeNums',
          key: 'likeNums',
          slots: { title: 'customLikeNums', customRender: 'likeNums' },
        },
        {
          title: '是否发布',
          dataIndex: 'publishState',
          key: 'publishState',
          slots: { title: 'customPublishState', customRender: 'publishState' },
        },
        {
          title: '是否加密',
          width: 150,
          dataIndex: 'encryptionState',
          key: 'encryptionState',
          slots: { title: 'customEncryptionState', customRender: 'encryptionState' },
        },
        {
          title: '分类',
          key: 'category',
          dataIndex: 'category',
          slots: { customRender: 'category' },
        },
        {
          title: '标签',
          key: 'tags',
          dataIndex: 'tags',
          slots: { customRender: 'tags' },
        },
        {
          title: '操作',
          key: 'action',
          slots: { customRender: 'action' },
        },
      ];
      const publishStateValidaFlag= ref(false);
      const data = ref([
        {
          key: '1',
          title: 'John Brown',
          readNums: 32,
          likeNums: 31,
          commentNums: 33,
          publishState:true,
          category:1,
          encryptionState:1,
          encryption:'111111',
          tags: ['nice', 'developer'],
        },
        {
          key: '2',
          title: 'Jim Green',
          readNums: 32,
          likeNums: 31,
          commentNums: 33,
          publishState:false,
          category:2,
          encryptionState:0,
          encryption:'',
          tags: ['loser'],
        },
        {
          key: '3',
          title: 'Joe Black',
          readNums: 32,
          likeNums: 31,
          commentNums: 33,
          publishState:true,
          category:3,
          encryptionState:1,
          encryption:'111111',
          tags: ['cool', 'teacher'],
        },
      ]);

      function goToEditArticle() {
        push({name:'Edit'})
      }
      return {
        goToEditArticle,
        publishStateValidaFlag,
        columns,
        data,
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

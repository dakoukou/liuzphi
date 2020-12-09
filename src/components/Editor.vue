<template>
<div class="editor">
  <a-row type="flex" justify="space-around" align="middle">
      <a-col :span ='18'>
        <a-input v-model:value="form.title" placeholder="请输入标题" />
        <div style="margin-top: 10px" id="vditor" name="description" />
      </a-col>
    <a-col :span ='5'>
      <a-card title="分类">
        <a-select
            v-model:value="form.category"
            style="width: 120px"
            @focus="focus"
            ref="select"
            @change="handleChange"
        >
          <a-select-option value="1">
            Jack
          </a-select-option>
          <a-select-option value="2">
            Lucy
          </a-select-option>
          <a-select-option value="3" disabled>
            Disabled
          </a-select-option>
          <a-select-option value="4">
            yiminghe
          </a-select-option>
        </a-select>
      </a-card>
        <a-card title="文章可见性">
          <a-radio-group  v-model:value="form.encryptionState" @change="onChange">
            <a-radio-button value="1">
              公开
            </a-radio-button>
            <a-radio-button value="2">
              加密
            </a-radio-button>
            <a-radio-button value="3">
              私密
            </a-radio-button>
          </a-radio-group>
          <a-input style="margin-top: 10px" v-if="form.encryptionState ==='2'" v-model:value="form.encryption" placeholder="输入加密密码" />
        </a-card>
        <a-card title="标签">
          <template v-for="(tag) in tags">
            <a-tooltip v-if="tag.length > 20" :title="tag">
              <a-tag color="cyan" :key="tag" closable @close="handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else color="cyan" closable @close="handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
              v-if="inputVisible"
              ref="input"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              v-model:value="inputValue"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
          />
          <a-tag v-else @click="showInput" style="background: #fff; borderStyle: dashed;">
            <plus-outlined /> New Tag
          </a-tag>
        </a-card>
        <a-card title="操作">
          <a-button @click="save" block>保存并发布</a-button>
          <a-button style="margin-top: 10px" block @click="save">仅保存</a-button>
        </a-card>
    </a-col>
  </a-row>
  </div>
</template>
<script>
  import Vditor from 'vditor'
  import 'vditor/dist/index.css'
  import { PlusOutlined } from '@ant-design/icons-vue';
  import { notification } from 'ant-design-vue'
  export default {
    name: 'EditorComponent',
    components:{PlusOutlined},
    data() {
      return {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
        form: {
          id: null,
          title: '',
          md: '',
          html: '',
          publishState: true,
          category:'',
          encryptionState: '1',
          encryption:'',
          tags:''
        },
        value:'',
        encryptionValue:'',
        tags: [],
        inputVisible: false,
        inputValue: '',
        contentEditor: '',
        lang: 'zh_CN',
        welcome: '# 🎉️ Welcome to use Markdown!',
      }
    },
    mounted() {
      this.contentEditor = new Vditor('vditor', {
        lang: this.lang,
        cache: {
          enable: true,
        },
        placeholder: this.welcome,
        minHeight: 600,
        width: 'auto',
        outline: false, // 大纲模式
        counter: {
          enable: 102400, // 计数，提示角标问题
        },
        toolbarConfig: {
          pin: true,
        },
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'inline-code',
          'insert-before',
          'insert-after',
          // "|",
          // "upload",
          // "record",
          'table',
          '|',
          'undo',
          'redo',
          '|',
          // "fullscreen",
          'edit-mode',
          {
            name: 'more',
            toolbar: [
              // "export",
              'outline',
              'preview',
              'both',
              'code-theme',
              'content-theme',
              'devtools',
              // "info",
              // "help",
              {
                name: 'about',
                icon: '关于',
                click() {
                  this.show_about()
                },
              },
            ],
          },
        ],
        preview: {
          delay: 200,
        },
      })
    },
    methods: {
      save() {
        console.log(this.contentEditor.getValue())
        console.log('---------------------------------')
        console.log(this.contentEditor.getHTML())
      },
      show_about() {
        notification.open({
          message: 'Notification Title',
          description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          onClick: () => {
            console.log('Notification Clicked!')
          },
        })
      },
      handleClose() {
        // const tags = this.tags.filter(tag => tag !== removedTag);
        // console.log(tags);
        // this.tags = tags;
      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      },
      handleInputConfirm() {
        const inputValue = this.inputValue;
        let tags = this.tags;
        if (inputValue && tags.indexOf(inputValue) === -1) {
          tags = [...tags, inputValue];
        }
        console.log(tags);
        Object.assign(this, {
          tags,
          inputVisible: false,
          inputValue: '',
        });
      },
      onChange(e) {
        console.log(`checked = ${e.target.value}`);
      },
      handleChange(value) {
        console.log(`selected ${value}`);
      },
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

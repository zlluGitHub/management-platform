<template>
  <Card>
    <p slot="title">添加图表</p>
    <!-- <span slot="extra"></span> -->
    <div class="in-bgc-box">
      <div class="input-box">
        <label>图表名称：</label>
        <Input v-model="title" placeholder="请输入标题..." clearable style="width: 300px" />
        <!-- <span class="kv-item-tip">标题字数限制在35个字符</span> -->
      </div>
      <div class="input-box">
        <label>编辑者：</label>
        <Input v-model="author" placeholder="请输入内容..." clearable style="width: 300px" />
        <span class="kv-item-tip"></span>
      </div>
      <div class="input-box">
        <label>分类选择：</label>
        <Select v-model="tags" style="width:300px">
          <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div class="input-box upload">
        <label class="clear-flex">参考地址：</label>
        <Input
          v-model="source_url"
          type="text"
          placeholder="例如：https://www.zhenglinglu.cn/.../stacked-area-chart.html"
          style="width: 300px"
        />
        <a :href="source_url" target="_blank" style="margin-left:10px;">
          <Button>{{source_url?'预览':'示例'}}</Button>
        </a>
      </div>
      <div class="input-box upload">
        <label>演示示例：</label>
        <Input
          v-model="show_url"
          placeholder="例如：https://www.zhenglinglu.cn/.../stacked-area-chart.html"
          clearable
          style="width: 300px"
        />
        <Upload :action="upFileUrl" :on-success="handleFileSuccess" :show-upload-list="false">
          <Button class="update-icon" icon="ios-cloud-upload-outline">本地上传</Button>
          <!-- <span class="kv-item-tip">直接输入地址或上传 demo 文件</span> -->
        </Upload>
      </div>
      <div class="input-box upload">
        <label>缩略图：</label>
        <Input class v-model="img_url" placeholder="请输入地址..." clearable style="width: 300px" />
        <Upload :action="upImgUrl" :on-success="handleImgSuccess" :show-upload-list="false">
          <Button class="update-icon" icon="ios-cloud-upload-outline">本地上传</Button>
        </Upload>
      </div>
      <div class="input-box">
        <label>是否发布：</label>
        <RadioGroup v-model="is_public" vertical>
          <Radio class="select" label="yes">
            <span>是</span>
          </Radio>
          <Radio class="select" label="no">
            <span>否</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="input-box text-content">
        <label class="clear-flex">API封装：</label>
        <!-- <MyEditor @on-content="onEditorChange" :value="content" /> -->
        <MyEditor @on-content="onApiCode" :value="api_code" :toolbar="toolbar" />
      </div>
      <div class="input-box text-content">
        <label class="clear-flex">关键代码：</label>
        <MyEditor @on-content="onImportantCode" :value="important_code" :toolbar="toolbar" />
      </div>
      <div class="input-box text-content">
        <label class="clear-flex">全部代码：</label>
        <MyEditor @on-content="onAllCode" :value="all_code" :toolbar="toolbar" />
      </div>
      <div class="input-box text-content">
        <label class="clear-flex">使用说明：</label>
        <MyEditor @on-content="onOther" :value="other" :menubar="true" />
      </div>
      <div class="submit">
        <Button type="info" @click="submit" class="but">提交/保存</Button>
        <Button @click="handleBack" class="but">返回列表</Button>
      </div>
    </div>
  </Card>
</template>
<script>
//  import Editor from './Editor' // 根据editor.vue组件位置引入
// import hljs from "highlight.js";

import config from "../../../config";
import { dateTime } from "../../../libs/util";
import { typeData } from "./data";
import MyEditor from "../../../components/code-editor/MyEditor";
export default {
  name: "adds",
  components: { MyEditor },
  data() {
    return {
      URL: config.url,
      upFileUrl: config.url + "/upload/file", // 文件对应的上传地址
      upImgUrl: config.url + "/upload/file", // 图片对应的上传地址

      tags: "默认", //分类
      title: "", //标题
      author: "", //作者
      img_url: "", //图片地址
      source_url: "", //源代码
      show_url: "", //展示地址
      api_code: "", //API对接接口
      is_public: "yes", //是否公布
      important_code: "", //关键代码
      all_code: "", //所有代码
      other: "", //其他说明

      typeList: [],
      toolbar:
        "undo redo restoredraft | searchreplace code codesample codeformat blockformats | visualchars visualblocks toc |preview fullscreen"
    };
  },
  computed: {},
  created() {
    this.uid = this.$route.query.uid;
    let data = {};
    // get 请求
    if (this.uid) {
      this.$axios
        .get("/api/component", { params: { uid: this.uid } })
        .then(res => {
          if (res.data.result) {
            data = res.data.data[0];
            this.tags = data.tags; //分类
            this.title = data.title; //标题
            this.author = data.author; //作者
            this.img_url = data.img_url; //图片地址
            this.source_url = data.source_url; //源代码
            this.show_url = data.show_url; //展示地址
            this.api_code = data.api_code; //API对接接口
            this.is_public = data.is_public; //是否公布
            this.important_code = data.important_code; //关键代码
            this.all_code = data.all_code; //所有代码
            this.other = data.other; //其他说明
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted() {
    this.typeList = typeData.map(item => {
      return {
        value: item,
        label: item
      };
    });
  },
  methods: {
    //提交数据
    submit() {
      let data = {
        tags: this.tags,
        author: this.author,
        title: this.title,
        img_url: this.img_url,
        source_url: this.source_url,
        show_url: this.show_url,
        api_code: this.api_code,
        is_public: this.is_public,
        important_code: this.important_code,
        all_code: this.all_code,
        other: this.other
      };
      let url = "/api/component";
      let message = "上传";
      if (this.uid) {
        url = "/api/update";
        message = "更新";
        data.uid = this.uid;
      }
      this.$axios
        .post(url, this.$qs.stringify(data))
        .then(res => {
          this.$Message.success(message + "成功！");
          // 添加日志
          this.$addJournal({
            author: this.author,
            img_url: this.img_url,
            content: this.title + "..." + message
          });
          this.handleReset();
        })
        .catch(err => {
          this.$Message.error(message + "失败！");
        });
    },
    //重置
    handleReset() {
      this.tags = "默认"; //分类
      this.title = ""; //标题
      this.author = ""; //作者
      this.img_url = ""; //图片地址
      this.source_url = ""; //源代码
      this.show_url = ""; //展示地址
      this.api_code = ""; //API对接接口
      this.is_public = "yes"; //是否公布
      this.important_code = ""; //关键代码
      this.all_code = ""; //所有代码
      this.other = ""; //其他说明
    },
    //文本内容
    onApiCode(e) {
      this.api_code = e.value;
    },
    onImportantCode(e) {
      this.important_code = e.value;
    },
    onAllCode(e) {
      this.all_code = e.value;
    },
    onOther(e) {
      this.other = e.value;
    },

    //图片上传
    handleImgSuccess(res, file) {
      this.$Message.success("图片上传成功！");
      this.img_url = res.url;
    },
    // 文件上传
    handleFileSuccess(res, file) {
      this.$Message.success("文件上传成功！");
      this.show_url = res.url;
    },
    handleBack() {
      this.$router.push({ path: "/components_api/echarts_table" });
    },
    // onEditorChange(e) {
    //   this.content = e.value;
    // },

    checkAllGroupChange(data) {
      var val = "";
      data.forEach(item => {
        val = val + item + "、";
      });
      this.keywords = val;

      // this.dataArrr.forEach(item => {
      //   if (item.name === val) {
      //     this.contentData = item.data;
      //   }
      // });
    }
  }
};
</script>
<style lang="less">
// .ivu-tabs-tab-active {
//   position: relative;
// }
// .ivu-tabs-tab-active::after {
//   content: "";
//   position: absolute;
//   left: 0;
//   right: 0;
//   background-color: red;
//   bottom: -2px;
//   height: 5px;
//   z-index: 1000000000;
// }

.ivu-upload-list {
  margin-top: 0px;
}
.submit {
  display: flex;
  // justify-content: flex-end;
  padding-bottom: 60px;
  padding-left: 100px;
  button {
    margin-left: 40px;
  }
}
.clear-flex {
  align-self: baseline;
}
.keywords {
  margin-bottom: 0px !important;
  padding-bottom: 10px !important;
}
.ivu-radio-group {
  display: flex;
}
.check-box {
  margin-left: 105px;
  margin-top: 10px;
}
.input-box {
  padding-bottom: 20px;
  display: flex;
  align-items: center;

  .kv-item-tip {
    margin-left: 20px;
    color: #a5a5a5;
    height: 30px;
    line-height: 30px;
  }
  margin-bottom: 10px;
  > label {
    margin: 0 12px;
    width: 80px;
    font-size: 14px;
    display: inline-block;
    text-align: right;
    .impInfo {
      color: red;
    }
  }
  .select {
    margin-right: 10px;
  }
}
.upload {
  .update-icon {
    margin-left: 10px;
  }
}
.text-content {
  display: flex;
}
.tinymce-editor {
  width: 970px;
}
// .ivu-input-wrapper {
//   width: 970px;
// }
</style>
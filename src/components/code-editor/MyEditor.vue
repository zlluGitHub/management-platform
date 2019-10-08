<template>
  <div class="tinymce-editor">
    <Editor v-model="myValue" :init="init" :disabled="disabled" @onChange="onChange" ref="editor"></Editor>
  </div>
</template>
<script>
import config from "../../config";
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver";
// 编辑器插件plugins
// 更多插件参考：https://www.tiny.cloud/docs/plugins/
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/media"; // 插入视频插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/link";
import "tinymce/plugins/code";
import "tinymce/plugins/codesample";
import "tinymce/plugins/toc";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/visualchars";
import "tinymce/plugins/autoresize";
import "tinymce/plugins/fullscreen"; //全屏
import "tinymce/plugins/preview"; //预览

import "tinymce/plugins/charmap"; // 特殊符号
// import 'tinymce/plugins/contextmenu' //格式刷
// import 'tinymce/plugins/colorpicker'
// import 'tinymce/plugins/contextmenu'
import "tinymce/plugins/advlist";
import "tinymce/plugins/lists";
import "tinymce/plugins/autosave";
import "tinymce/plugins/spellchecker";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/print";
import "tinymce/plugins/hr";
export default {
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: "请输入内容。。。"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // localhostUrl: {
    //   type: String,
    //   // default: "https://www.zhenglinglu.cn/"
    //   default: URL
    // },
    reqUrl: {
      type: String,
      default: "article/add.img.php"
    },

    menubar: {
      type: Boolean,
      default: false
    },
    // plugins: {
    //   type: [String, Array],
    //   // default: 'lists image media table wordcount'
    //   default:
    //     "advlist lists autoresize hr charmap searchreplace print toc image media table wordcount link code visualchars visualblocks codesample fullscreen preview spellchecker autosave"
    // },
    plugins: {
      type: [String, Array],
      // default: 'lists image media table wordcount'
      default:
        "advlist lists autoresize hr charmap searchreplace print toc image table link code visualchars visualblocks codesample fullscreen preview spellchecker autosave"
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo restoredraft | searchreplace print | fontsizeselect | formatselect | bold italic underline charmap  strikethrough removeformat formatpainter forecolor backcolor hr | code codesample codeformat blockformats | preview fullscreen | visualchars visualblocks toc | link unlink | bullist numlist outdent indent | image table | alignleft aligncenter alignright alignjustify"
    }
    //   toolbar: {
    //     type: [String, Array],
    //     default:
    //       "undo redo restoredraft | searchreplace print | fontsizeselect | formatselect | bold italic underline charmap  strikethrough removeformat formatpainter forecolor backcolor hr | code codesample codeformat blockformats | visualchars visualblocks toc | link unlink | bullist numlist outdent indent | image media table | alignleft aligncenter alignright alignjustify | spellchecker preview fullscreen wordcount"
    //   }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue;
    }
  },
  data() {
    return {
      init: {
        language_url: "/tinymce/zh_CN.js",
        language: "zh_CN",
        skin_url: "/tinymce/skins/ui/oxide",
        convert_urls: false, //这个参数加上去就可以了
        plugins: this.plugins,
        toolbar: this.toolbar,
        fontsize_formats:
          "8px 10px 12px 14px 16px 18px 20px 22px 24px 36px 48px",
        menubar: this.menubar,
        // 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
        // 如需ajax上传可参考https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_handler
        images_upload_handler: (blobInfo, success, failure) => {
          let form = new FormData(); // blobInfo.blob()为数据流 // blobInfo.filename()为文件名 //  根据自己的需求取值

          form.append("file", blobInfo.blob(), blobInfo.filename());
          let config = {
            headers: { "Content-Type": "multipart/form-data" }
          };
          //  form.append('file', file, file.name) // 通过append向form对象添加数据
          this.axios
            // .post(URL + "article/add.img.php", form, config)
            .post(config.url + this.reqUrl, form, config)
            .then(response => {
              success(config.url + response.data.url);
            });
        }
        // automatic_uploads:true,
        // images_upload_url: URL + "article/add.img.php",
        // images_reuse_filename: (blobInfo, success, failure) => {
        //   console.log(blobInfo, success, failure);

        // }
      },
      myValue: this.value
    };
  },
  // mounted() {
  //   // tinymce.init(this.init);
  // },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onChange(event) {
      // console.log(tinymce.activeEditor.getContent());
      // console.log(this.myValue);
      this.$emit("on-content", { value: event.level.content, event, tinymce });
    }
  }
};
</script>

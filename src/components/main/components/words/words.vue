<template>
  <div data-transfer="true" class="v-transfer-dom">
    <div class="ivu-modal-mask" style="z-index: 1199;"></div>
    <div class="ivu-modal-wrap" style="z-index: 1199;">
      <div class="ivu-modal" style="width: 416px;">
        <div class="ivu-modal-content">
          <div class="ivu-modal-body">
            <div class="ivu-modal-confirm">
              <div class="ivu-modal-confirm-body ivu-modal-confirm-body-render">
                <div class="ivu-input-wrapper ivu-input-wrapper-default ivu-input-type">
                  <h4>建议/反馈</h4>
                  <p>
                    <span>类型：</span>
                    <RadioGroup v-model="radioVal" type="button">
                      <Radio label="BUG"></Radio>
                      <Radio label="建议"></Radio>
                      <Radio label="反馈"></Radio>
                    </RadioGroup>
                  </p>
                  <p>
                    <span>标题：</span>
                    <Input v-model="title" placeholder="请输入标题..." style="width: 300px" />
                  </p>
                  <p>
                    <span>内容：</span>
                    <Input
                      v-model="content"
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容..."
                      style="width: 300px"
                    />
                  </p>
                </div>
              </div>
              <div class="ivu-modal-confirm-footer">
                <button
                  type="button"
                  @click="handleClose"
                  class="ivu-btn ivu-btn-text ivu-btn-large"
                >
                  <span>取消</span>
                </button>
                <button type="button" @click="submit" class="ivu-btn ivu-btn-primary ivu-btn-large">
                  <span>确定</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "icons_pages",
  components: {},
  data() {
    return {
      radioVal: "BUG",
      title: "",
      content: "",
      img_url: "",
      author: ""
    };
  },
  methods: {
    handleClose() {
      this.$emit("on-close", false);
    },
    //提交数据
    submit() {
      let data = {
        type: this.radioVal,
        author: this.author,
        title: this.title,
        img_url: this.img_url,
        content: this.content,
        state: "未解决"
      };
      let url = "/words";
      this.$axios
        .post(url, this.$qs.stringify(data))
        .then(res => {
          this.$emit("on-close", false);
          this.$Message.success("留言成功！");
          // 添加日志
          this.$addJournal({
            author: this.author,
            img_url: this.img_url,
            content: "新增留言"
          });
        })
        .catch(err => {
          this.$Message.error(message + "失败！");
        });
    }
  }
};
</script>

<style lang="less">
.ivu-input-type {
  h4 {
    font-size: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
    margin-bottom: 15px;
  }
  p {
    display: flex;
    align-items: center;
    margin: 15px 0px;
    span{
      margin-right: 5px;
    }
  }
}
</style>

<template>
  <div class="split-pane-page-wrapper">
    <!-- <div>
      建议
    </div>-->
    <split-pane v-model="offset" @on-moving="handleMoving">
      <div slot="left" class="pane left-pane">
        <h3>{{content.title}}</h3>
        <iframe frameborder="no" :src="URL +content.show_url"></iframe>
      </div>
      <div slot="right" class="pane right-pane">
        <split-pane v-model="offsetVertical" mode="vertical" @on-moving="handleMoving">
          <div slot="top" class="pane top-pane scrollbar">
            <Tabs size="small" :animated="false">
              <TabPane label="API封装">
                <div>
                  <div v-html="content.api_code"></div>
                </div>
              </TabPane>
              <TabPane label="关键代码">
                <div v-html="content.important_code"></div>
              </TabPane>
              <TabPane label="全部代码">
                <div v-html="content.all_code"></div>
              </TabPane>
            </Tabs>
          </div>
          <div slot="bottom" class="pane bottom-pane scrollbar">
            <Tabs size="small">
              <TabPane label="全部代码">
                <div v-html="content.other"></div>
              </TabPane>
            </Tabs>
          </div>
          <div slot="trigger" class="custom-trigger">
            <icons class="trigger-icon" :size="22" type="resize-vertical" color="#fff" />
          </div>
        </split-pane>
      </div>
    </split-pane>
  </div>
</template>

<script>
import SplitPane from "_c/split-pane";
import Icons from "_c/icons";
export default {
  name: "split_pane_page",
  components: {
    SplitPane,
    Icons
  },
  data() {
    return {
      offset: 0.6,
      offsetVertical: "250px",
      uid: "",
      content: {},
      URL: ''
    };
  },
  created() {
    this.uid = this.$route.query.uid;
    this.URL = this.$config.url;
    // get 请求
    this.$axios
      .get("/api/component", { params: { uid: this.uid } })
      .then(res => {
        if (res.data.result) {
          this.content = res.data.data[0];
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {
    var topPane = document.querySelector(".top-pane");
    var topPaneHight = topPane.clientHeight || topPane.offsetHeight;
  },
  methods: {
    handleMoving(e) {
      console.log(e.atMin, e.atMax);
    }
  }
};
</script>

<style lang="less">
.scrollbar {
  height: 100%;
  // height:calc(100% - 2px);
  overflow: hidden;
  overflow-y: auto;
}

.ivu-split-trigger-con {
  border: 1px solid #dcdee2;
}
iframe {
  width: 100%;
  height: 100%;
}
.center-middle {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.split-pane-page-wrapper {
  height: 100%;
  border: 1px solid #dcdee2;
  .pane {
    width: 100%;
    height: 100%;
    background-color: #fff;
    padding: 10px;
    // &.left-pane {
    //   border: 1px solid #dcdee2;
    // }
    // &.right-pane {
    //   border: 1px solid #dcdee2;
    // }
    // &.top-pane {
    //   border: 1px solid #dcdee2;
    // }
    // &.bottom-pane {
    //   border: 1px solid #dcdee2;
    // }
  }
  .custom-trigger {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #000000;
    position: absolute;
    .center-middle;
    box-shadow: 0 0 6px 0 rgba(28, 36, 56, 0.4);
    i.trigger-icon {
      .center-middle;
    }
  }
}
</style>

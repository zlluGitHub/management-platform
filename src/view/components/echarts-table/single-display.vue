<template>
  <div class="split-pane-page-wrapper">
    <!-- <div>
      建议
    </div> -->
    <split-pane v-model="offset" @on-moving="handleMoving">
      <div slot="left" class="pane left-pane">
          <h3>区域折线图</h3>
        <iframe frameborder="no" src="https://www.zhenglinglu.cn/zllstaticfile/echarts/line/stacked-area-chart.html"></iframe>
      </div>
      <div slot="right" class="pane right-pane">
        <split-pane v-model="offsetVertical" mode="vertical" @on-moving="handleMoving">
          <div slot="top" class="pane top-pane">
            <h3>关键代码</h3>
            <div>
              sdfcsdsd
            </div>
          </div>
          <div slot="bottom" class="pane bottom-pane">
            <h3>API封装格式</h3>
            <div></div>
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
      id:''
    };
  },
  created(){
    this.id = this.$route.query.userId;
    console.log(this.id);
    
  },
  methods: {
    handleMoving(e) {
      console.log(e.atMin, e.atMax);
    }
  }
};
</script>

<style lang="less">
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

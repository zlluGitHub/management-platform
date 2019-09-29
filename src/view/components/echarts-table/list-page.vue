<template>
  <div class="list-warp">
    <div class="query">
      <div>
        <span>图表筛选：</span>
        <div>
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >全选</Checkbox>
          <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
            <Checkbox v-for="(item,i) in typeData" :key="i+'we'" :label="item"></Checkbox>
          </CheckboxGroup>
        </div>
      </div>
    </div>
    <div class="content">
      <Card v-for="(item,i) in dataList" :key="i+'qa'">
        <p slot="title">饼状图</p>
        <span slot="extra">2019-12-11</span>
        <div class="img-warp">
          <img
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/xhmv-1o6XS.png?v=1550046647263"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleRouter('id')">API接口</a>
            <a href="javascript:void(0);" @click="handleRouter('id')">完整代码</a>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { dataList, typeData } from "./data";
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
      offset: 0.4,
      offsetVertical: "250px",
      dataList: [], //列表数据
      typeData: [], //分类数据
      indeterminate: true,
      checkAll: false,
      checkAllGroup: ["香蕉", "西瓜"]
    };
  },
  mounted() {
    this.dataList = dataList;
    this.typeData = typeData;
    console.log(this.typeData);
  },
  methods: {
    handleRouter(id) {
      this.$router.push({
        path: "/components_api/single/display",
        query: { userId: id }
      });
    },
    handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["香蕉", "苹果", "西瓜"];
      } else {
        this.checkAllGroup = [];
      }
    },
    checkAllGroupChange(data) {
      if (data.length === 3) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    handleMoving(e) {
      console.log(e.atMin, e.atMax);
    }
  }
};
</script>
<style lang="less">
.list-warp {
  .query {
    background-color: #fff;
    border: 1px solid #dcdee2;
    padding: 20px;
    margin-bottom: 20px;
    div {
      display: flex;
      label {
        margin: 0 10px;
      }
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    > div {
      margin: 8px;
    }
    .img-warp {
      position: relative;
      img {
        width: 250px;
        height: 185px;
        padding: 2px;
    border: 1px solid #dfdfdf;
      }
      .shade {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.3s ease;
        a {
          color: #fff;
          border: 1px solid #fff;
          border-radius: 5px;
          padding: 5px 12px;
          z-index: 10;
          transition: all 0.3s ease;
          transform: scale(0);
        }
        a:nth-child(1) {
          margin-right: 10px;  
           background: #2db7f5;
        }
        a:nth-child(2) {
          margin-right: 10px;  
           background: #19be6b;
        }
      }
      .shade:hover {
        background: rgba(253, 252, 252, 0.2);
        a {
           transform: scale(1);
        }
      }
    }
  }
}
</style>

<template>
  <div class="list-warp">
    <div class="query">
      <div>
        <span>图表筛选：</span>
        <RadioGroup v-model="radioValue" @on-change="handleRadioGroup">
          <Radio v-for="(item,i) in typeData" :key="i+'we'" :label="item"></Radio>
        </RadioGroup>
      </div>
      <router-link to="/components_api/add/editor">
        <Icon type="md-add" size="26" />
      </router-link>
    </div>
    <div class="content" v-if="dataList.length!==0">
      <Card v-for="(item,i) in dataList" :key="i+'qa'">
        <p slot="title">{{item.title}}</p>
        <span slot="extra">{{item.date}}</span>
        <div class="img-warp">
          <img v-if="item.img_url" :src="item.img_url" />
          <img
            v-else
            src="https://echarts.baidu.com/ecg-storage/ec_gallery_thumbnail/xhmv-1o6XS.png?v=1550046647263"
          />
          <div class="shade">
            <a href="javascript:void(0);" @click="handleRouter(item.uid)">API接口</a>
            <a v-if="item.source_url" :href="item.source_url" target="_blank">编辑代码</a>
          </div>
          <p class="edit">
            <router-link :to="{ path: '/components_api/add/editor', query: { uid:item.uid}}">编辑</router-link>
          </p>
        </div>
      </Card>
    </div>
    <p class="moren" v-else>暂无内容</p>
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
      radioValue: "默认",

      indeterminate: true,
      checkAll: false,
      checkAllGroup: []
    };
  },
  created() {
    // get 请求
    this.$axios
      .get("/api/component")
      .then(res => {
        if (res.data.result) {
         this.dataList = res.data.data.filter(item=>{
             return item.is_public==='yes';
            });
          this.$store.commit("setComponent", this.dataList);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  mounted() {
    this.dataList = dataList;
    this.typeData = typeData;
  },
  methods: {
    handleRadioGroup(val) {
      this.getTagsData(val);
    },
    getTagsData(tags) {
      // get 请求
      this.$axios
        .get("/api/component", { params: { tags: tags } })
        .then(res => {
          if (res.data.result) {
            this.dataList = res.data.data.filter(item=>{
             return item.is_public==='yes';
            });
            this.$store.commit("setComponent", this.dataList);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleRouter(id) {
      this.$router.push({
        path: "/components_api/single/display",
        query: { uid: id }
      });
    },

    // handleCheckAll() {
    //   console.log(this.checkAllGroup);

    //   if (this.indeterminate) {
    //     this.checkAll = false;
    //   } else {
    //     this.checkAll = !this.checkAll;
    //   }
    //   this.indeterminate = false;

    //   if (this.checkAll) {
    //     this.checkAllGroup = [];
    //   } else {
    //     this.checkAllGroup = [];
    //   }
    // },
    // checkAllGroupChange(data) {
    //   if (data.length === 3) {
    //     this.indeterminate = false;
    //     this.checkAll = true;
    //   } else if (data.length > 0) {
    //     this.indeterminate = true;
    //     this.checkAll = false;
    //   } else {
    //     this.indeterminate = false;
    //     this.checkAll = false;
    //   }
    // },
    handleMoving(e) {
      console.log(e.atMin, e.atMax);
    }
  }
};
</script>
<style lang="less">
@media (min-width: 200px) and (max-width: 1370px) {
  .list-warp .content .img-warp img {
    width: 212px !important;
    height: 148px !important;
  }
}
.moren {
  text-align: center;
  padding: 100px 0;
  background-color: #fff;
  border: 1px solid #dcdee2;
}
.list-warp {
  .query {
    background-color: #fff;
    border: 1px solid #dcdee2;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
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
      overflow: hidden;
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
      .edit {
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        padding: 10px;
        background: rgba(0, 0, 0, 0.4);
        transition: all 0.2s ease;
        transform: translate(0, 42px);
        a {
          display: block;
          width: 100%;
          color: #fff;
        }
      }
    }
    .img-warp:hover {
      .edit {
        transform: translate(0px);
      }
    }
  }
}
</style>

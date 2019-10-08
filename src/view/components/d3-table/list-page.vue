<template>
  <div class="split-pane-page-wrapper">

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
      offset: 0.4,
      offsetVertical: "250px"
    };
  },
  methods: {
    handleMoving(e) {
      console.log(e.atMin, e.atMax);
    }
  }
};
</script>

<style lang="less">
</style>

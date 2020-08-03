<template>
  <div id="app">
    <div id="top-wrap">
      <div id="top-title">人口推移グラフ</div>
      <div id="top-sub-title">都道府県別の人口推移グラフを生成します。</div>
    </div>
    <PrefSlctGroup />
  </div>
</template>

<script>
import PrefSlctGroup from "@/components/PrefSlctGroup.vue";

export default {
  name: "app",
  components: {
    PrefSlctGroup,
  },
};
</script>

<style lang="scss" scoped>
#app {
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: left;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  #top-wrap {
    height: clamping($top-wrap-h);
    background-color: $top-bg-color;
    #top-title {
      max-width: $max-w-multiplier * 100px;
      margin: auto;
      padding-top: clamping($top-title-top-p);
      padding-left: clamping($top-title-left-p);
      color: black;
      font-weight: bold;
      font-size: clamping($top-title-fs, 6);
      @include fade-in-bottom();
    }
    #top-sub-title {
      max-width: $max-w-multiplier * 100px;
      margin: auto;
      padding-top: clamping($top-sub-title-top-p);
      padding-left: clamping($top-title-left-p);
      color: black;
      font-weight: bold;
      font-size: clamping($top-sub-title-fs, 6);
      @include fade-in-bottom(0.6s);
    }
  }
}
</style>

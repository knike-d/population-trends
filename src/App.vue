<template>
<div id="app">
  <div id="top-wrap">
    <div id="top-title">人口推移グラフ</div>
    <div id="top-sub-title">都道府県別の人口推移グラフを生成します。</div>
  </div>
</div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  #top-wrap{
    height: clampVal($top-wrap-h);
    background-color: $top-bg-color;
    #top-title{
      max-width: $max-w-multiplier * 100px;
      font-size: clampVal($top-title-fs, 6);
      padding-top: clampVal($top-title-top-p);
      padding-left: clampVal($top-title-left-p);
      margin: auto;
      color: black;
      font-weight: bold;
      @include fade-in-bottom();
    }
    #top-sub-title{
      max-width: $max-w-multiplier * 100px;
      font-size: clampVal($top-sub-title-fs, 6);
      padding-top: clampVal($top-sub-title-top-p);
      padding-left: clampVal($top-title-left-p);
      margin: auto;
      color: black;
      font-weight: bold;
      @include fade-in-bottom(.6s);
    }
  }
}

</style>

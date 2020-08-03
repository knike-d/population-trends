<template>
  <div id="pref-slct-wrap">
    <div id="pref-slct-txt">
      都道府県を選択してください<br />
      現在の選択数：{{ prefCount.length }}
    </div>
    <PrefBtnGroup v-if="!prefSlctState" />
    <PrefBtnGroup v-if="prefSlctState" />
  </div>
</template>

<script>
import PrefBtnGroup from "./PrefBtnGroup.vue";

export default {
  components: {
    PrefBtnGroup,
  },
  data() {
    return {
      prefCount: [],
      prefSlctState: false,
    };
  },
};
</script>

<style lang="scss" scoped>
#pref-slct-wrap {
  width: clamping($pref-slct-wrap-w);
  margin: clamping($pref-slct-wrap-top-m) auto 0 auto;
  #pref-slct-txt {
    font-weight: bold;
    font-size: clamping($pref-slct-fs, $max-btn-multiplier);
    text-align: center;
  }
}
</style>

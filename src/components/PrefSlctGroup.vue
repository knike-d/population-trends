<template>
  <div id="pref-slct-wrap">
    <div id="pref-slct-txt">
      都道府県を選択してください<br />
      現在の選択数：{{ slctPrefList.length }}
    </div>
    <PrefBtnGroup
      v-if="!prefSlctState"
      :name-list="regionList"
      @emit-btn-name="goPrefList"
    />
    <PrefBtnGroup
      v-else-if="prefSlctState"
      :name-list="prefList"
      @emit-btn-name="emitPref"
    />
  </div>
</template>

<script>
import axios from "axios";
import { regionList, prefNumArray, prefArray } from "@/assets/js/const.js";
import PrefBtnGroup from "./PrefBtnGroup.vue";

export default {
  components: {
    PrefBtnGroup,
  },
  data() {
    return {
      slctPrefList: [],
      prefSlctState: false,
      regionList: regionList,
      slctRegion: "",
      allPrefList: [],
    };
  },
  computed: {
    prefList() {
      const foundList = this.allPrefList.find((obj) => obj.region === this.slctRegion);
      return foundList.prefList;
    },
  },
  created() {
    const prefUrl = "https://opendata.resas-portal.go.jp/api/v1/prefectures";
    axios
      .get(prefUrl, {
        headers: { "X-API-KEY": "" },
      })
      .then((response) => {
        for (const i in prefNumArray)
          prefArray[i].prefList = response.data.result
            .splice(0, prefNumArray[i])
            .map((obj) => obj.prefName);
        this.allPrefList = prefArray;
      });
  },
  methods: {
    goRegionList() {
      this.prefSlctState = false;
    },
    goPrefList(regionName) {
      this.slctRegion = regionName;
      this.prefSlctState = true;
    },
    emitPref(prefName) {
      const index = this.slctPrefList.indexOf(prefName);
      index === -1
        ? this.slctPrefList.push(prefName)
        : this.slctPrefList.splice(index, 1);
      this.$emit("emit-pref-list", this.slctPrefList);
    },
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

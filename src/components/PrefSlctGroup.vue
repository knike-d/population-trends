<template>
  <div id="pref-slct-wrap">
    <div id="pref-slct-nav">
      <button id="pref-slct-back" v-show="prefSlctState" @click="goRegionList">
        戻る
      </button>
      <div id="pref-slct-txt">
        都道府県を選択してください<br />
        現在の選択数：{{ slctPrefList.prefCodeList.length }}
      </div>
    </div>
    <PrefBtnGroup v-if="!prefSlctState" :name-list="regionList" @emit-btn-name="goPrefList" />
    <PrefBtnGroup
      v-else-if="prefSlctState"
      :name-list="prefNameList"
      :pref-code-list="prefCodeList"
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
      slctPrefList: {
        prefNameList: [],
        prefCodeList: [],
      },
      prefSlctState: false,
      regionList: regionList,
      slctRegion: "",
      allPrefList: [],
    };
  },
  computed: {
    prefNameList() {
      const foundList = this.allPrefList.find((obj) => obj.region === this.slctRegion);
      return foundList.prefList.map((obj) => obj.prefName);
    },
    prefCodeList() {
      const foundList = this.allPrefList.find((obj) => obj.region === this.slctRegion);
      return foundList.prefList.map((obj) => obj.prefCode);
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
          prefArray[i].prefList = response.data.result.splice(0, prefNumArray[i]);
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
    emitPref(prefName, prefCode) {
      const index = this.slctPrefList.prefCodeList.indexOf(prefCode);
      if (index === -1) {
        this.slctPrefList.prefNameList.push(prefName);
        this.slctPrefList.prefCodeList.push(prefCode);
      } else {
        this.slctPrefList.prefNameList.splice(index, 1);
        this.slctPrefList.prefCodeList.splice(index, 1);
      }
      this.$emit("emit-pref-list", this.slctPrefList);
    },
  },
};
</script>

<style lang="scss" scoped>
#pref-slct-wrap {
  width: clamping($pref-slct-wrap-w);
  margin: clamping($pref-slct-wrap-top-m) auto 0 auto;
  #pref-slct-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: clamping($pref-slct-nav-h, $max-btn-multiplier);
    #pref-slct-back {
      position: absolute;
      left: 0;
      padding: 4px 8px;
      font-weight: bold;
      font-size: clamping($pref-slct-fs, $max-btn-multiplier);
      background: white;
      border: solid rgb(177, 177, 177) 1px;
      @include click-effect();
      @include hover_active($hover-color);
    }
    #pref-slct-txt {
      position: absolute;
      font-weight: bold;
      font-size: clamping($pref-slct-fs, $max-btn-multiplier);
      text-align: center;
    }
  }
}
</style>

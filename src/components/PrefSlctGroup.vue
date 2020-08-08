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
    <div id="pref-btn-group-wrap">
      <transition name="region">
        <PrefBtnGroup v-if="!prefSlctState" :name-list="regionList" @click-region="goPrefList" />
      </transition>
      <transition name="pref">
        <PrefBtnGroup
          v-show="prefSlctState"
          :name-list="prefNameList"
          :pref-code-list="prefCodeList"
          @click-pref="emitPref"
        />
      </transition>
    </div>
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
      if (Object.keys(this.allPrefList).length && this.slctRegion) {
        const foundList = this.allPrefList.find((obj) => obj.region === this.slctRegion);
        return foundList.prefList.map((obj) => obj.prefName);
      } else {
        return [];
      }
    },
    prefCodeList() {
      if (Object.keys(this.allPrefList).length && this.slctRegion) {
        const foundList = this.allPrefList.find((obj) => obj.region === this.slctRegion);
        return foundList.prefList.map((obj) => obj.prefCode);
      } else {
        return [];
      }
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
  @include fade-in-bottom(1.2s);
  #pref-slct-nav {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: clamping($pref-slct-nav-h, $max-pref-btn-multiplier);
    #pref-slct-back {
      position: absolute;
      left: 0;
      padding: 4px 8px;
      font-weight: bold;
      font-size: clamping($pref-slct-fs, $max-pref-btn-multiplier);
      background: white;
      border: solid $btn-border-color 1px;
      @include click-effect();
      @include hover_active($hover-color);
    }
    #pref-slct-txt {
      position: absolute;
      font-weight: bold;
      font-size: clamping($pref-slct-fs, $max-pref-btn-multiplier);
      text-align: center;
    }
  }
  #pref-btn-group-wrap {
    height: clamping($pref-btn-group-wrap-h, 5);
    overflow: hidden;
  }
}

.region-enter-active,
.region-leave-active {
  height: 0;
  transition: transform 0.4s;
}
.region-enter,
.region-leave-to {
  height: 0;
  transform: translateX(-130%);
}
.pref-enter-active,
.pref-leave-active {
  height: 0;
  margin: 0;
  transition: transform 0.4s;
}
.pref-enter,
.pref-leave-to {
  height: 0;
  transform: translateX(130%);
}
</style>

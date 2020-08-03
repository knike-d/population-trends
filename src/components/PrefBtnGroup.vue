<template>
  <div class="pref-btn-wrap">
    <label class="pref-btn" v-for="item in regionList" :key="item">
      <input type="checkbox" class="pref-btn-input" />{{ item }}
    </label>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      regionList: ["北海道・東北地方", "2", "3", "4", "5", "6", "7"],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.pref-btn-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: clamping($pref-wrap-top-m);
  .pref-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47%;
    height: clamping($pref-btn-h, $max-btn-multiplier);
    margin-bottom: clamping($pref-btn-bottom-m, $max-btn-multiplier);
    font-weight: bold;
    font-size: clamping($pref-btn-fs, $max-btn-multiplier);
    background: white;
    border: solid rgb(177, 177, 177) 1px;
    border-radius: 20px;
    @include click-effect();
    @include hover_active($hover-color);
    .pref-btn-input {
      display: none;
    }
  }
}
</style>

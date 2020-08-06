<template>
  <div class="pref-btn-wrap">
    <label class="pref-btn" v-for="(name, index) in nameList" :key="name">
      <input type="checkbox" class="pref-btn-input" @click="clickBtn(name, index)" />
      {{ name }}
    </label>
  </div>
</template>

<script>
export default {
  props: {
    nameList: {
      type: Array,
      required: true,
    },
    prefCodeList: {
      type: Array,
      default: () => null,
    },
  },
  methods: {
    clickBtn(name, index) {
      this.prefCodeList === null
        ? this.$emit("emit-btn-name", name)
        : this.$emit("emit-btn-name", name, this.prefCodeList[index]);
    },
  },
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

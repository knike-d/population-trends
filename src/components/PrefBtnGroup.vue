<template>
  <div class="pref-btn-wrap">
    <template v-for="(name, index) in nameList">
      <input
        type="checkbox"
        :id="'btn_' + name"
        class="pref-btn-input"
        v-model="checkedBtnList"
        @click="clickBtn(name, index)"
        :value="name"
        :key="'input_' + name"
      />
      <label class="pref-btn" :for="'btn_' + name" :key="'label_' + name">
        {{ name }}
      </label>
    </template>
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
  data() {
    return {
      checkedBtnList: [],
    };
  },
  methods: {
    clickBtn(name, index) {
      this.prefCodeList === null
        ? this.$emit("click-region", name)
        : this.$emit("click-pref", name, this.prefCodeList[index]);
    },
    resetChecked() {
      this.checkedBtnList = [];
    },
  },
};
</script>

<style lang="scss" scoped>
.pref-btn-wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin-top: clamping($pref-wrap-top-m);
  .pref-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 47%;
    height: clamping($pref-btn-h, $max-pref-btn-multiplier);
    margin-bottom: clamping($pref-btn-bottom-m, $max-pref-btn-multiplier);
    font-weight: bold;
    font-size: clamping($pref-btn-fs, $max-pref-btn-multiplier);
    background: white;
    border: solid $btn-border-color 1px;
    border-radius: 20px;
    @include click-effect();
    @include hover_active($hover-color);
  }
  .pref-btn-input {
    display: none;
    &:checked + .pref-btn {
      background: $checked-color;
    }
  }
}
</style>

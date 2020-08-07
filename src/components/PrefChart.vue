<script>
import { Line, mixins } from "vue-chartjs";

export default {
  extends: Line,
  mixins: [mixins.reactiveData],
  props: {
    data: {
      type: Object,
    },
    options: {
      type: Object,
    },
  },
  mounted() {
    this.chartData = this.data;
    this.renderChart(this.chartData, this.options);
  },
  watch: {
    "data.datasets"() {
      this.chartData = this.data;
      this.renderChart(this.chartData, this.options);
    },
  },
};
</script>

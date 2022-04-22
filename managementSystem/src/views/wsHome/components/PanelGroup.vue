<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Users
          </div>
          <count-to :start-val="0" :end-val="statistics.user" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <!-- <svg-icon icon-class="message" class-name="card-panel-icon" /> -->
          <svg t="1650116748000" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3725" width="48" height="48">
          <path d="M507.073669 914.533082a379.199546 379.199546 0 1 0 0-758.399092 379.199546 379.199546 0 0 0 0 758.399092z m0 70.184225a449.383771 449.383771 0 1 1 0-898.767542 449.383771 449.383771 0 0 1 0 898.767542z m511.314792-757.503396a35.124102 35.124102 0 0 1-60.139628 36.33969 529.228724 529.228724 0 0 0-208.761282-195.901638 35.124102 35.124102 0 1 1 32.309055-62.250913 599.476927 599.476927 0 0 1 236.591855 221.87684z m-1013.096814 0A599.476927 599.476927 0 0 1 241.883502 5.40105a35.124102 35.124102 0 1 1 32.309055 62.314891A529.228724 529.228724 0 0 0 65.431275 263.553601a35.124102 35.124102 0 0 1-60.139628-36.275711z m536.906124 301.082009h217.654269a35.124102 35.124102 0 1 1 0 70.248203H507.073669a35.124102 35.124102 0 0 1-35.124102-35.18808V310.64165a35.124102 35.124102 0 1 1 70.248204 0v217.65427z m-340.748572 472.160056a35.124102 35.124102 0 0 1-62.890696-31.157446l30.773576-62.058977a35.124102 35.124102 0 0 1 62.954674 31.157445l-30.837554 62.058978z m613.872051 0l-30.709597-62.058978a35.124102 35.124102 0 0 1 62.890696-31.221424l30.709597 62.058978a35.124102 35.124102 0 0 1-62.890696 31.221424z" fill="#36a3f7" p-id="3726">
            </path>
          </svg>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Reserves
          </div>
          <count-to :start-val="0" :end-val="statistics.count" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg t="1650589686850" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2171" width="48" height="48"><path d="M678.6 379.7c7.4-25.7 22.6-80 45.3-162.2l0.4-1.6c9-52-25.8-101.6-77.8-110.8-19.5-3.4-28.8 5.3-37 12.9-4.8 4.6-10.3 9.6-20.5 15.6l-0.7 0.4c-2.5 1.6-4.2 2.5-5.1 2.8-0.5-0.4-1.1-0.9-1.6-1.4-12.9-11.3-29.4-19.3-62.5-2.5-2.8 1.4-4.4 1.8-5 1.9-0.7-0.5-2.3-1.6-3.4-2.5-12.7-9.9-29.2-18.9-63.3 1.2-2.7 1.6-4.1 1.9-4.6 2.1-1.9-1.2-5.5-6.2-7.6-9.4-6.5-9.2-17.3-24.8-36.8-21.4-52 9-86.9 58.7-77.8 110.8l0.2 1.1c23.4 98.7 34 142.8 39.1 162.8-113.6 53.3-186.3 167.2-186.3 293.2 0 160.3 118 252.3 323.8 252.3h43.3c205.8 0 323.8-92 323.8-252.3-0.1-126-72.6-239.7-185.9-293zM401.4 140.5c1.4 1.6 3.2 4.2 4.6 6.2 4.6 6.7 10.4 15 19.6 20.2 8.3 4.6 22.1 8 39.8-2.7 11.9-6.9 16.8-7.1 18-7.1 1.1 0.2 2.1 0.9 5.5 3.4 7.6 5.8 21.6 16.8 46.4 4.2 11.9-6 16.8-6 18-5.8 1.1 0.2 1.9 0.9 5 3.4 10.8 9.4 25.1 17 48.8 1.8 13.4-7.8 21.2-15.2 26.4-20 1.8-1.6 3.7-3.5 4.8-4.2 0.4 0 1.1 0 2.1 0.2 32.6 5.7 54.5 36.4 49.2 69-14.7 53.3-37 133.9-45.5 163.3-44.9 0.7-204 0.7-249.8 0-7.6-29.9-26.7-110.2-39.1-163.1-5.5-31.8 15-61.9 46.2-68.8z m139.2 748.9h-43.3c-107.7 0-288.4-28.1-288.4-216.9 0-114.3 67.2-217.3 171.6-263.6h277.2c104.4 46.4 171.6 149.3 171.6 263.6-0.3 188.8-180.9 216.9-288.7 216.9z" fill="#3B4552" p-id="2172"></path><path d="M462.025 199.24l35.347-1.909 7.164 132.7-35.347 1.909zM541.755 330.022l7.158-132.7 35.347 1.906-7.158 132.7z" fill="#3B4552" p-id="2173"></path><path d="M648.9 747c-22.5 50.6-40.9 70.8-64.8 70.8-17.2 0-37-10.1-63.3-27.2-23.7-15.4-35.7-21.6-50.2-21.6-18.4 0-22.5 3-57.7 33.1-9.7 8-16.8 11.5-21.9 11.5-5.3 0-8.8-3.5-8.8-6.5 0-6.2 23.4-30.4 60.7-44.4 12.4-20.7 19.3-46.2 24.6-87.2h-62.1v-20.2h64.2c10.6-92.4 15.9-112.2 39.1-131.6 21.6-18 40.9-26 58-26 27.8 0 54.5 22.5 54.5 46.2 0 16.8-13.6 24.6-23.7 24.6-11.9 0-18.4-11-18.4-17.7 0-8 6.2-16.8 13.3-19.3 5.3-2.1 7.4-3.5 7.4-5.3 0-2.7-12.4-17.7-34.3-17.7-16.8 0-34.3 8.8-46.7 24.2-11 13.6-18.9 41.4-18.9 80.5 0 15.4-0.5 29.5-1.8 41.8h70.4v20h-73.1c-5.7 29.9-17.2 53.6-37 81.9 8-1.8 23.4-5.7 31.7-5.7 14.5 0 32.2 7.4 83.7 35.6 5.3 3 11 4.8 16.3 4.8 15 0 30.4-12.4 44.4-51.5l14.4 6.9z" fill="#FF960B" p-id="2174"></path></svg>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Revenues
          </div>
          <count-to :start-val="0" :end-val="statistics.pay" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('shoppings')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <!-- <svg-icon icon-class="shopping" class-name="card-panel-icon" /> -->
          <svg icon-class="shopping" t="1650115980890" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2705" width="48" height="48"><path d="M244.053333 450.56s109.226667-52.906667 264.533334-49.493333c131.413333 1.706667 223.573333 63.146667 223.573333 63.146666s98.986667-30.72 151.893333-47.786666c37.546667-13.653333 107.52-51.2 107.52-51.2s-201.386667-105.813333-481.28-105.813334S29.013333 358.4 29.013333 358.4s37.546667 22.186667 73.386667 42.666667c49.493333 23.893333 141.653333 49.493333 141.653333 49.493333z m568.32-221.866667c17.066667-1.706667 71.68 5.12 92.16 0 20.48-5.12 56.32-34.133333 56.32-34.133333s-46.08-1.706667-75.093333-15.36c-29.013333-13.653333-46.08-18.773333-66.56-18.773333-20.48 0-35.84 10.24-35.84 10.24v80.213333s11.946667-20.48 29.013333-22.186667zM477.866667 189.44c20.48-1.706667 88.746667 6.826667 112.64 0 25.6-6.826667 69.973333-42.666667 69.973333-42.666667s-58.026667-1.706667-92.16-18.773333c-35.84-17.066667-58.026667-23.893333-81.92-23.893333-25.6 0-42.666667 11.946667-42.666667 11.946666v98.986667c-1.706667 0 13.653333-23.893333 34.133334-25.6zM136.533333 228.693333c17.066667-1.706667 71.68 5.12 90.453334 0 20.48-5.12 56.32-34.133333 56.32-34.133333s-46.08-1.706667-75.093334-15.36c-29.013333-13.653333-46.08-18.773333-66.56-18.773333-18.773333 0-34.133333 10.24-34.133333 10.24v80.213333S119.466667 230.4 136.533333 228.693333z m382.293334 274.773334C209.92 503.466667 10.24 373.76 10.24 373.76l87.04 465.92s155.306667 58.026667 303.786667 81.92V675.84h215.04v244.053333c141.653333-23.893333 276.48-81.92 276.48-81.92L1006.933333 375.466667s-211.626667 128-488.106666 128z m-312.32 324.266666l-66.56-27.306666-18.773334-104.106667 85.333334 13.653333v117.76z m0-192.853333l-95.573334-13.653333-20.48-117.76 116.053334 27.306666v104.106667z m131.413333 213.333333l-76.8-13.653333v-104.106667l76.8 13.653334v104.106666z m1.706667-174.08l-76.8-13.653333v-104.106667l76.8 13.653334v104.106666z m315.733333-109.226666l76.8-13.653334v104.106667l-76.8 13.653333v-104.106666zM733.866667 829.44l-76.8 13.653333v-104.106666l76.8-13.653334v104.106667z m121.173333-35.84l-66.56 27.306667v-117.76l85.333333-13.653334-18.773333 104.106667z m27.306667-177.493333l-95.573334 13.653333v-104.106667l116.053334-27.306666-20.48 117.76z" fill="#34bfa3" p-id="2706"></path></svg>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Venues
          </div>
          <count-to :start-val="0" :end-val="statistics.venueTotal" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props:{
    statistics: {
      type: Object,
      default: {},
    },
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
        svg path{fill:#fff;}
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
        svg path{fill:#fff;}
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>

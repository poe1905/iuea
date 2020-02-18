<template>
  <div class="list">
    <el-row :gutter='55'
            type="flex"
            justify="center">
      <el-col :span="3"
              v-for="(o) in carddata"
              :key="o.ttitle">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;"
               class="carddata">
            <span class="title">{{o.title}}</span>
            <span class="numbers">{{o.number }} </span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <!-- <el-card>
          <p>{{dictum.content}}---- <span>{{dictum.mrname}}</span></p>
          <br>
          <br>
          <div class="now">
            <div class="nowTime"><b> 当前剩余时间</b></div>
            <hr>
          </div>
          
          <div class="chart">
            <div class="schedule">
              <p>今日已经过去{{item.hour}}% </p>
              <el-progress :text-inside="true"
                           :stroke-width="26"
                           :percentage="item.hour"></el-progress>
              <p>本周已经过去{{item.day}}% </p>
              <el-progress :text-inside="true"
                           :stroke-width="24"
                           :percentage="item.day"
                           status="success"></el-progress>
              <p>本月已经过去{{item.month}}% </p>
              <el-progress :text-inside="true"
                           :stroke-width="22"
                           :percentage="item.month"
                           status="warning"></el-progress>
              <p>本年已经过去{{item.year}}% </p>
              <el-progress :text-inside="true"
                           :stroke-width="20"
                           :percentage="item.year"
                           status="exception"></el-progress>
            </div>
            <div>
              <el-progress type="circle"
                           :percentage="0"></el-progress>
              <el-progress type="circle"
                           :percentage="25"></el-progress>
              <el-progress type="circle"
                           :percentage="100"
                           status="success"></el-progress>
              <el-progress type="circle"
                           :percentage="70"
                           status="warning"></el-progress>
              <el-progress type="circle"
                           :percentage="50"
                           status="exception"></el-progress>
            </div>
          </div>
        </el-card> -->
        <div class="hodel">
          <span>{{dictum.content}}---- <span>{{dictum.mrname}}</span></span>
          <div class="now">
            <div class="nowTime"><b> 当前剩余时间</b></div>
            <hr>
          </div>
            <div  class="schedule">
            <p>今日已经过去{{item.hour}}% </p>
            <el-progress :text-inside="true"
                         :stroke-width="26"
                         :percentage="item.hour"></el-progress>
            <p>本周已经过去{{item.day}}% </p>
            <el-progress :text-inside="true"
                         :stroke-width="24"
                         :percentage="item.day"
                         status="success"></el-progress>
            <p>本月已经过去{{item.month}}%  </p>
            <el-progress :text-inside="true"
                         :stroke-width="22"
                         :percentage="item.month"
                         status="warning"></el-progress>
            <p>本年已经过去{{item.year}}% </p>
            <el-progress :text-inside="true"
                         :stroke-width="20"
                         :percentage="item.year"
                         status="exception"></el-progress>
          </div>
 
        </div>
      </el-col>

    </el-row>

    <el-row :gutter='20'
            type="flex"
            justify="center">
      <el-col :span="9">
        <el-card>
          <div class="grid-content bg-purple">
            <div id="myChart"
                 :style="{width: '100%', height: '300px'}"></div>
          </div>
        </el-card>

      </el-col>
      <el-col :span="9">
        <el-card>
          <div class="grid-content bg-purple-light">
            <div id="exhibition"
                 :style="{width: '100%', height: '300px'}"></div>
          </div>
        </el-card>
      </el-col>

    </el-row>

  </div>
</template>


<script>
import axios from '../../utils/request';
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      currentDate: new Date(),
      carddata: [
        {
          title: '总计项目',
          number: 0
        },
        {
          title: '最长项目',
          number: 22
        },
        {
          title: '近期壮举',
          number: 22
        },
        {
          title: '完成项目',
          number: 22
        },
      ],
      dictum: {},
    }
  },
  methods: {
    //请求名人名言
    async getdictum () {
      let { data } = await axios(
        {
          method: 'get',
          url: 'http://api.tianapi.com/txapi/dictum/index?key=498e7a7d418c34b904ab6f9eba394753&num=1',
          // params: {
          //   key: '498e7a7d418c34b904ab6f9eba394753',
          //   num: 1

          // }
        }
      )
      this.dictum = data.newslist[0]



    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        tooltip: {},
        xAxis: {
          data: ["项目1", "项目2", "天上人间", "项目4", "项目5", "项目6"]
        },
        yAxis: {},
        series: [{
          name: '进程',
          type: 'bar',
          data: [3, 5, 10, 11, 15, 33]
        }]
      });

      let exhibition = this.$echarts.init(document.getElementById('exhibition'))
      exhibition.setOption(
        {

          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210]
            },
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      )

    }
  },
  computed: {
    item () {
      var itme = new Date()
      var yearitem = itme.getFullYear()
      var hour = itme.getHours() * 3600000 / 86400000  //小时
      var day = (itme.getDay() / 7);//得到周几
      var month = itme.getDate() / new Date(yearitem, (itme.getMonth() + 1), 0).getDate();
      var Years = new Date(yearitem, 2, 0).getDate() == 29 ? 366 : 365;
      var year = (Date.now() - (+new Date(yearitem, 0, 1))) / 86400000 / Years
      console.log(hour);
      return {
        hour: hour * 100,
        day: Math.floor(day * 100),
        month: Math.floor(month * 100),
        year: Math.floor(year * 100)
      }
    }
  },
  watch: {},
  created () {
    this.getdictum() //初始化请求
  },
  mounted () {
    this.drawLine();
  },

}
</script>

<style lang='less' scoped>
// 卡片css
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
//rou
.el-row {
  margin-bottom: 20px;
  width: 1600px;
  overflow: hidden;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
}
//自定义
.list {
  overflow: hidden;
}

.carddata {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .numbers {
    margin: 10px;
  }
}
.hodel{

.now {
  position: relative;
  margin: 30px 0;
  .nowTime {
    position: absolute;
    bottom: -8px;
    left: 20px;
    background-color: #fff;
    padding: 0 5px;
  }
}

}


.chart {
  .schedule {
    p {
      padding: 20px 0;
    }
  }
  .progress{
    margin: 20px 0 ;
  }
}
</style>
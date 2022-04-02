<template>
	<view class="content">
		<view class="container">
			<!-- 日期列表 -->
			<scroll-view class="scroll-view_H b-t b-b" scroll-x>
				<block v-for="(item,index) in dateArr" :key="index">
					<div class="flex-box" @click="selectDateEvent(index,item)"
						:style="{'border-bottom':index==dateActive ? '2px solid  #FB4B5C' : ''}">
						<view class="date-box" :style="{color:index==dateActive?selectedTabColor:'#333'}">
							<text style="font-weight: bold;">{{item.week}}</text>
							<text>{{item.date}}</text>
						</view>
					</div>
				</block>
			</scroll-view>
			<!-- 时间选项 -->
			<view class="time-box">
				<block v-for="(item,_index) in timeArr" :key="_index">
					<view class="item">
						<view class="item-box" :class="{'disable':item.disable,'active':_index==timeActive}"
							:style="{color:_index==timeActive?selectedItemColor:'#333'}"
							@click="selectTimeEvent(_index,item)">
							<text>{{item.time}}</text>
							<text
								class="all">{{item.disable==1?disableText:(item.disable?staleDatedText:undisableText)}}</text>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="bottom">
			<view class="show_time">
				预约时间:{{ordertime}}
			</view>
			<button form-type="submit" type="default" size="mini" class="buybtn" @click="getTime">
				确认预约
			</button>

		</view>
	</view>
</template>

<script>
	import {
		dateData,
		timeData,
		timeStamp,
		currentTime
	} from '../utils/date.js'
	export default {
		name: 'times',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			staleDatedText: {
				type: String,
				default: "超时"
			},
			disableText: { //禁用显示的文本
				type: String,
				default: "已约满"
			},
			undisableText: { //未禁用显示的文本
				type: String,
				default: "可预约"
			},
			timeInterval: { // 时间间隔，小时为单位
				type: Number,
				default: 1
			},
			selectedTabColor: { // 日期栏选中的颜色
				type: String,
				default: "#FB4B5C"
			},
			selectedItemColor: { // 时间选中的颜色
				type: String,
				default: "#FB4B5C"
			},
			appoTime: { // 预约的时间
				type: Array,
				default () {
					return ['2021-04-12 17:00:00']
				}
			}
		},
		data() {
			return {
				ordertime: '暂无选择', // 选中时间
				dateArr: [], //日期数据
				timeArr: [], //时间数据
				nowdata: '', // 当前日期
				timeQuery: '', // 用于日期对比,选中的日期
				dateActive: 0, //选中的日期索引
				timeActive: 0, //选中的时间索引
				selectDate: '', //选择的日期
				selectTime: '', //选择的时间
				currentTime: '', //当前时分秒

			}
		},
		created(props) {
			this.nowdata = currentTime()
			this.timeQuery = currentTime()
			this.setOnload()
		},
		methods: {
			setOnload() {
				this.dateArr = dateData() // 日期栏初始化
				this.timeArr = timeData('09:00:00', '23:00:00', 1) //时间选项初始化
				this.selectDate = `${this.dateArr[this.dateActive]['date']}` //默认选中的日期
				this.currentTime = timeStamp(Date.now()).hour //当前时分秒
				let ifFullTime = true
				this.timeArr.forEach((item, index) => {
					if (this.timeQuery == this.nowdata) { //判断是当前这一天
						if (this.currentTime > item.time) { //选中时间小于当前时间则禁用
							item.disable = 2
						}
					}
					// 将预约的时间禁用
					this.appoTime.forEach(items => {
						
						if (items.split(' ')[0] == this.selectDate) {
							if (item.time == items.split(' ')[1]) {
								item.disable = 1
							}
						}

					})
					if (item.disable == 0) { // 判断是否当前日期时间都被预约
						ifFullTime = false
					}
				})
				if (ifFullTime) {
					this.ordertime = this.timeQuery
					this.timeActive = -1
				}

				// 选出默认值
				this.timeArr.some((item, index) => {
					this.selectTime = this.timeArr[index]['time'] //默认选中的时间  15:00
					this.ordertime = this.timeQuery + ' ' + this.selectTime
					this.timeActive = index //选中的时间索引
					return !item.disable
				})

			},
			selectDateEvent(index, item) {
				this.dateActive = index
				this.timeArr = []
				this.timeQuery = item.date
				this.selectDate = `${this.dateArr[index]['date']}`
				this.setOnload()
			},

			selectTimeEvent(index, item) {
				if (item.disable) return
				this.timeActive = index
				this.selectTime = this.timeArr[index]['time']
				this.ordertime = this.timeQuery + ' ' + item.time;
			},
			getTime() {
				let time = `${this.dateArr[this.dateActive]['date']}` + ' ' + this.selectTime //默认选中的日期
				this.$emit('change', time)
			}
		}
	}
</script>
<style lang="scss" scoped>
	@import './pretty-times.scss';

	page {
		height: 100%;
	}

	.content {
		text-align: center;
		height: 100%;
	}

	/* 两个按钮 */
	.bottom {
		display: flex;
		flex-direction: row;
		position: fixed;
		bottom: 0;
		top: auto;
		left: 0px;
		width: 100%;
		background-color: #fff;
	}

	.show_time {
		width: 70%;
		height: 47px;
		color: #505050;
		background-color: rgba(255, 255, 255, 1);
		font-size: 15px;
		line-height: 47px;
		text-align: center;
	}

	.buybtn {
		width: 25%;
		height: 40px;
		color: white;
		background-color: #CA89FF;
		font-size: 15px;
		line-height: 40px;
		text-align: center;
		margin: auto;
		padding: 0;
	}
</style>

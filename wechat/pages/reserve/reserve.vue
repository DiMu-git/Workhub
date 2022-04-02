<template>
	<view>
		<times @change="getTime" :appoTime="place.times" v-if="showTime"></times>
		<u-modal v-model="show" @cancel="cancel" @confirm="confirm" :content="content" :show-cancel-button="true"
			confirm-text="去支付">
		</u-modal>
	</view>
</template>

<script>
	import times from '@/components/pretty-times/pretty-times.vue'
	export default {
		components: {
			times
		},
		data() {
			return {
				show: false,
				showTime:false,
				content: '',
				time: {},
				place:{}
			};
		},
		onLoad(options) {
			this.placeInfo(options.placeId)
		},
		methods: {
			placeInfo(id) {
				this.$req({
					url: '/bigtian/place/info/' + id,
					method: "get"
				}).then(res => {
					this.place = res.data.place
					this.showTime=true
				})
			},
			getTime(e) {
				this.content = `您预定是【${this.place.name}】 时间:【${e}】 价格：【${this.place.price}】`
				this.data = {
					reserveTime: e,
					status: 0,
					placeId: this.place.id,
					price: this.place.price,
					placeName: this.place.name,
					images:this.place.images
				}
				this.show = true
			},
			confirm() {
				this.data.status = 1
				this.reserve("支付完成")
			},
			cancel() {
				// this.data.status = 2
				this.reserve("等待支付")
			},
			reserve(msg) {
				var than = this
				this.$req({
						url: "/bigtians/reserve/save",
						data: this.data
					})
					.then(res => {
						if (res.data.msg == "success") {
							uni.showToast({
								title: msg,
								icon: "success",
								success() {
									than.time = setInterval(function() {
										uni.navigateBack({

										})
									}, 2000)
								}
							})
						} else {
							uni.showToast({
								title: "支付失败",
								icon: "success",
							})
						}
					})
			}
		},
		onUnload() {
			clearInterval(this.time)
		}
	}
</script>

<style lang="scss">

</style>

<template>
	<view class="container d-flex flex-column">
		<view class="flex-fill form" v-if="show">
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">昵称</view>
					<view class="input flex-fill">
						<input type="text" placeholder="请填写昵称" placeholder-class="text-color-assist font-size-base"
							v-model="user.nickName">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">手机号码</view>
					<view class="input flex-fill">
						<input type="text" v-model="user.mobile">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">性别</view>
					<view class="input flex-fill">
						<view class="radio-group">
							<u-radio-group v-model="user.sex">
										<u-radio  name="0" >
											男
										</u-radio>	<u-radio  name="1" >
											女
										</u-radio>
									</u-radio-group>
						
						</view>
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">真实姓名</view>
					<view class="input flex-fill">
						<input type="text" v-model="user.realName">
					</view>
				</view>
			</list-cell>
			<list-cell :hover="false">
				<view class="form-input w-100 d-flex align-items-center">
					<view class="label">身份证号</view>
					<view class="input flex-fill">
						<input type="text" v-model="user.identityCard">
					</view>
				</view>
			</list-cell>

		</view>
		<view class="btn-box d-flex align-items-center just-content-center">
			<button type="primary" class="save-btn" @tap="save">保存</button>
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell'
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			listCell
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				show: false,
				user: {},
				date: currentDate
			}
		},
		computed: {},
		onLoad() {
			this.getUserInfos()
		},
		methods: {
			getUserInfos() {
				var than = this
				this.$req({
					url: "/sys/user/info/" + getApp().globalData.id,
					method: "get"
				}).then(res => {
					than.user = res.data.user;
					than.show = true
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			handleDateChange(e) {
				this.member.birthday = e.target.value
			},
			save() {
				this.$req({
					url: "/sys/user/update",
					data: this.user
				}).then(res => {
					if (res.data.msg == "success") {
						uni.showToast({
							title: "修改成功",
							icon: "success",
							success() {
								setTimeout(function() {
									uni.navigateBack({
										delta: 2
									})
								}, 2000)
							}
						})
					} else {
						uni.showToast({
							title: "修改失败",
							icon: "none",
						})
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		height: 100%;
	}

	.container {
		padding: 20rpx 30rpx;
	}

	.form {
		border-radius: 8rpx;
	}

	.form-input {
		.label {
			width: 160rpx;
			font-size: $font-size-base;
			color: $text-color-base;
		}

		.input {}

		.radio-group {
			display: flex;
			justify-content: flex-start;

			.radio {
				padding: 10rpx 30rpx;
				border-radius: 6rpx;
				border: 2rpx solid $text-color-assist;
				color: $text-color-assist;
				font-size: $font-size-base;

				&.checked {
					background-color: $color-primary;
					color: $text-color-white;
					border: 2rpx solid $color-primary;
				}
			}
		}
	}

	.btn-box {
		height: calc((100vh - 40rpx) / 2);
	}

	.save-btn {
		width: 90%;
		border-radius: 50rem !important;
		font-size: $font-size-lg;
	}
</style>

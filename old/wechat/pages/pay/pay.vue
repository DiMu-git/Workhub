<template>
	<view class="container position-relative">
		<view style="margin-bottom: 130rpx;">
			<view class="section-1">
				<template v-if="orderType == 'takein'">
					<list-cell class="location">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="store-name flex-fill">{{ shop.name }}</view>
							<image src="/static/images/navigator-1.png" class="arrow"></image>
						</view>
					</list-cell>
				</template>
				<template v-else>
					<list-cell @click="chooseAddress">
						<view class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center justify-content-between mb-10">
								<view class="font-size-extra-lg text-color-base">{{ address.street }}</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="d-flex text-color-assist font-size-sm align-items-center">
								<view class="mr-10">{{ address.accept_name }}</view>
								<view class="mr-10">{{ !address.sex ? '先生' : '女士' }}</view>
								<view>{{ address.mobile }}</view>
							</view>
						</view>
					</list-cell>
				</template>
				<template v-if="orderType == 'takein'">
					<list-cell arrow class="meal-time">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="title">取餐时间</view>
							<view class="time">立即用餐</view>
						</view>
					</list-cell>
					<list-cell class="contact" last :hover="false">
						<view class="flex-fill d-flex justify-content-between align-items-center">
							<view class="title flex-fill">联系电话</view>
							<view class="time">
								<input class="text-left" v-model="form.buyerPhone" placeholder="请输入手机号码" />
								<button class="bottom" size="mini" type="primary" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取手机号</button>
							</view>
						</view>
					</list-cell>
				</template>
				<template v-else>
					<list-cell>
						<view class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center font-size-base text-color-base">
								<view class="flex-fill">预计送达时间</view>
								<view class="mr-10">15:18</view>
								<image src="/static/images/navigator-1.png" class="arrow"></image>
							</view>
							<view class="font-size-base text-color-primary">特殊时期减少接触，请修改下方订单备注</view>
						</view>
					</list-cell>
				</template>
			</view>
			<!-- 购物车列表 begin -->
			<view class="section-2">
				<view class="cart d-flex flex-column">
					<list-cell last v-for="(item, index) in cart" :key="index">
						<view class="w-100 d-flex flex-column">
							<view class="d-flex align-items-center mb-10">
								<view class="name-and-props overflow-hidden">
									<view class="text-color-base font-size-lg">{{ item.productName }}</view>
								</view>
								<view class="d-flex flex-fill justify-content-between align-items-center text-color-base font-size-lg">
									<view>x{{ item.productQuantity }}</view>
									<view>￥{{ item.productPrice }}</view>
								</view>
							</view>
							<view class="text-truncate font-size-base text-color-assist">{{ item.productTaste == undefined ? '' : item.productTaste }}</view>
						</view>
					</list-cell>
					<template v-if="orderType == 'takeout'">
						<list-cell last v-if="store.packing_fee > 0">
							<view class="w-100 d-flex font-size-base align-items-center justify-content-between">
								<view>包装费</view>
								<view>￥{{ parseFloat(store.packing_fee) }}</view>
							</view>
						</list-cell>
						<list-cell last v-if="store.delivery_cost > 0">
							<view class="w-100 d-flex font-size-base align-items-center justify-content-between">
								<view>配送费</view>
								<view>￥{{ parseFloat(store.delivery_cost) }}</view>
							</view>
						</list-cell>
					</template>
				</view>

				<list-cell last>
					<view class="flex-fill d-flex justify-content-end align-items-center">
						<view>总计￥{{ total }},实付</view>
						<view class="font-size-extra-lg font-weight-bold">￥{{ amount }}</view>
					</view>
				</list-cell>
			</view>
			<!-- 购物车列表 end -->
			<view class="d-flex align-items-center justify-content-start font-size-sm text-color-warning" style="padding: 20rpx 0;">
				<view class="iconfont iconhelp line-height-100"></view>
				<view>优惠券不与满赠、满减活动共享</view>
			</view>
			<!-- 支付方式 begin -->
			<view class="payment">
				<list-cell last :hover="false"><text>支付方式</text></list-cell>
				<list-cell last>
					<view class="d-flex align-items-center justify-content-between w-100">
						<view class="iconfont iconwxpay line-height-100 payment-icon" style="color: #7EB73A;"></view>
						<view class="flex-fill">微信支付</view>
						<view class="iconfont iconradio-button-on line-height-100 checkbox checked"></view>
					</view>
				</list-cell>
			</view>
			<!-- 支付方式 end -->
			<!-- 备注 begin -->
			<list-cell>
				<view class="d-flex flex-fill align-items-center justify-content-between overflow-hidden">
					<view class="flex-shrink-0 mr-20">备注</view>
					<input class="text-right" v-model="form.remark" placeholder="请输入备注" maxlength="10" />
				</view>
			</list-cell>
			<!-- 备注 end -->
		</view>
		<!-- 付款栏 begin -->
		<view class="w-100 pay-box position-fixed fixed-bottom d-flex align-items-center justify-content-between bg-white">
			<view class="font-size-sm" style="margin-left: 20rpx;">合计：</view>
			<view class="font-size-lg flex-fill">￥{{ amount }}</view>
			<view class="bg-primary h-100 d-flex align-items-center just-content-center text-color-white font-size-base" style="padding: 0 60rpx;" @tap="submit">付款</view>
		</view>
		<!-- 付款栏 end -->
		<modal :show="ensureAddressModalVisible" custom :mask-closable="false" :radius="0" width="90%">
			<view class="modal-content">
				<view class="d-flex justify-content-end">
					<image src="/static/images/pay/close.png" style="width: 40rpx; height: 40rpx;" @tap="ensureAddressModalVisible = false"></image>
				</view>
				<view class="d-flex just-content-center align-items-center" style="margin-bottom: 40px;">
					<view class="font-size-extra-lg text-color-base">请再次确认下单地址</view>
				</view>
				<view class="d-flex font-size-base text-color-base font-weight-bold align-items-center justify-content-between mb-20">
					<view>{{ address.accept_name }} {{ address.sex ? '女士' : '先生' }}</view>
					<view>{{ address.mobile }}</view>
				</view>
				<view class="d-flex font-size-sm text-color-assist align-items-center justify-content-between mb-40">
					<view>{{ address.street + address.door_number }}</view>
					<button type="primary" size="mini" plain class="change-address-btn">修改地址</button>
				</view>
				<button type="primary" class="pay_btn" @tap="pay">确认并付款</button>
			</view>
		</modal>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import listCell from '@/components/list-cell/list-cell';
import modal from '@/components/modal/modal';
import orders from '@/api/orders';
import common from '@/apis/common.js';
import pay from '@/apis/api_pay.js';
export default {
	components: {
		listCell,
		modal
	},
	data() {
		return {
			cart: [],
			phoneInfo: {
				iv: '',
				data: '',
				key: ''
			},
			form: {
				remark: '',
				buyerPhone: '',
				goods: []
			},
			ensureAddressModalVisible: false,
			shop: {}
		};
	},
	computed: {
		...mapState(['orderType', 'address', 'store']),
		total() {
			return this.cart.reduce((acc, cur) => acc + cur.productQuantity * cur.productPrice, 0);
		},
		amount() {
			return this.cart.reduce((acc, cur) => acc + cur.productQuantity * cur.productPrice, 0);
		}
	},
	created() {},
	onLoad(option) {
		const { remark } = option;
		this.cart = uni.getStorageSync('cart');
		remark && this.$set(this.form, 'remark', remark);
		this.shop = getApp().globalData.shop;
	},
	methods: {
		...mapMutations(['SET_ORDER']),
		getPhoneNumber(e) {
			var than = this;
			console.log(e.detail);
			than.phoneInfo.iv = e.detail.iv;
			than.phoneInfo.data = e.detail.encryptedData;
			than.phoneInfo.key = getApp().globalData.sessionKey;
			common.getPhone(Object.assign(than.phoneInfo)).then(res => {
				than.form.buyerPhone = res.data.data;
			});
		},
		goToRemark() {
			uni.navigateTo({
				url: '/pages/remark/remark?remark=' + this.form.remark
			});
		},
		chooseAddress() {
			uni.navigateTo({
				url: '/pages/address/address?is_choose=true&scene=pay'
			});
		},
		goToPackages() {
			uni.navigateTo({
				url: '/pages/packages/index'
			});
		},
		submit() {
			if (this.orderType == 'takeout') {
				this.ensureAddressModalVisible = true;
			} else {
				this.pay();
			}
		},
		pay() {
			//测试订单
			let order = this.orderType == 'takein' ? orders[0] : orders[1];
			order = Object.assign(order, { status: 1 });
			this.SET_ORDER(order);
			var than = this;
			than.form.goods = than.cart;
			than.form.orderSeatnum = getApp().globalData.num;
			than.form.sellerId = getApp().globalData.shop.id;
			than.form.openId = getApp().globalData.openId;
			than.form.buyerName = getApp().globalData.nickname;
			than.form.orderStatus = 0;
			than.form.payStatus = 0;
			var money=0;
			this.form.goods.forEach(el=>{
				console.log(el.productPrice);
				money+=el.productPrice*el.productQuantity;
			})
			pay.save(Object.assign(than.form)).then(res => {
				this.payMoney(res.data.data,money*100)
			});
			// uni.removeStorageSync('cart')
			// uni.reLaunch({
			// 	url: '/pages/take-foods/take-foods'
			// })
			// uni.hideLoading()
		},
		payMoney(orderNo,money) {
			
			uni.getProvider({
				service: 'payment',
				success: res => {
					this.type = res.provider[0];
				}
			});
			var data = {
				orderNo: orderNo,
				productName:"扫码点餐",
				openId: getApp().globalData.openId,
				money: money
			};
			this.$req({
				url: '/weChat/pay',
				data,
				method: 'POST'
			}).then(res => {
				this.ajaxResult = res.data.mapInfo;
				uni.requestPayment({
					provider: this.type,
					package: 'prepay_id=' + this.ajaxResult.prepayId,
					nonceStr: this.ajaxResult.nonceStr,
					timeStamp: this.ajaxResult.time,
					signType: 'MD5',
					paySign: this.ajaxResult.sign,
					success(res) {
						uni.showToast({
							title: '支付成功',
							icon: 'success',
							duration: 2000
						});
					},
					fail(res) {
						uni.showToast({
							title: '取消支付',
							icon: 'none',
							duration: 2000
						});
					}
				});
			});
		
			//获取配置
		}
	}
};
</script>

<style lang="scss" scoped>
.container {
	padding: 30rpx;
}

.arrow {
	width: 50rpx;
	height: 50rpx;
	position: relative;
	margin-right: -10rpx;
}

.location {
	.store-name {
		font-size: $font-size-lg;
	}

	.iconfont {
		font-size: 50rpx;
		line-height: 100%;
		color: $color-primary;
	}
}

.section-1 {
	margin-bottom: 30rpx;
	.contact {
		.contact-tip {
			margin-left: 10rpx;
			border: 2rpx solid $color-primary;
			padding: 6rpx 10rpx;
			color: $color-primary;
		}
	}
}

.section-2 {
	.name-and-props {
		width: 65%;
	}
}

.payment {
	margin-bottom: 30rpx;

	.disabled {
		color: $text-color-grey;
	}

	.payment-icon {
		font-size: 44rpx;
		margin-right: 10rpx;
	}

	.checkbox {
		font-size: 36rpx;
		margin-left: 10rpx;
	}

	.checked {
		color: $color-primary;
	}
}

.pay-box {
	box-shadow: 0 0 20rpx rgba(0, 0, 0, 0.1);
	height: 100rpx;
}

.modal-content {
	.change-address-btn {
		line-height: 2;
		padding: 0 1em;
	}
	.pay_btn {
		width: 100%;
		border-radius: 50rem !important;
		line-height: 3;
	}
}
</style>

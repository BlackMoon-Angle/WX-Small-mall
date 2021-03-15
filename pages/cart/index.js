// pages/cart/index.js
import { getSetting, chooseAddress, openSetting, showModal, showToast } from '../../utils/asyncWX.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      address: {},
      cart: [],
      allChecked: false,
      totalPrice: 0,
      totalNum: 0
    }
  },
  onShow: function () {
    // 获取缓存中的收货地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    })
    this.setCart(cart)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 点击 收货地址
  async handleChooseAddress() {
    try {
      // 获取 权限状态
      const res = await getSetting()
      const scopeAddress = res.authSetting['scope.address']
      // 判断权限状态，若曾经拒绝过授予权限，则引导用户打开授权页面
      if (scopeAddress === false) {
        // 引导用户打开授权页面
        await openSetting()
      }
      // 调用获取收货地址 api
      let address = await chooseAddress()
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 将地址存入到缓存中
      wx.setStorageSync('address', address)
    } catch (err) {
      console.log(err)
    }
  },
  // 点击商品复选框事件
  handItemChange(e) {
    // 获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    // 获取购物车数组
    let { cart } = this.data
    // 找到被修改的商品对象
    let index = cart.findIndex(val => val.goods_id === goods_id)
    // 选中状态取反
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  // 设置购物车状态，计算全选，总价格，购买数量
  setCart(cart) {
    // 计算全选
    let allChecked = true
    // 总价格
    let totalPrice = 0
    // 总数量
    let totalNum = 0
    cart.forEach(val => {
      if (val.checked) {
        totalPrice += val.goods_price * val.num
        totalNum += val.num
      } else {
        allChecked = false
      }
    })
    // 判断数组是否为空
    allChecked = cart.length != 0 ? allChecked : false
    // 把购物车数据重新设置回 data 和 缓存 中
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync('cart', cart)
  },
  // 商品全选
  handleItemAllCheck() {
    // 获取 data 中的数据
    let { cart, allChecked } = this.data
    // 修改值
    allChecked = !allChecked
    // 循环修改 cart 数组中的 选中状态
    cart.forEach(val => val.checked = allChecked)
    // 修改后的值，重新返回 data，缓存 中
    this.setCart(cart)
  },
  // 商品数量的编辑
  async handleItemNumEdit(e) {
    // 获取传递过来的参数
    const { operation, id } = e.currentTarget.dataset
    // 获取购物车数组
    let { cart } = this.data
    // 找到需要修改的商品索引
    const index = cart.findIndex(val => val.goods_id === id)
    // 当商品数量为 1 时，如果继续点击 减少商品 操作，则变为删除，提供提示选择
    if (cart[index].num === 1 && operation === -1) {
      const res = await showModal('是否删除商品？')
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    } else {
      // 修改数量
      cart[index].num += operation
      // 修改后的值，重新返回 data，缓存 中
      this.setCart(cart)
    }
  },
  // 结算
  async handlePay() {
    // 判断收货地址是否已选
    const { address, totalNum } = this.data
    if(!address.userName) {
      await showToast('您还没有选择收货地址！')
      return
    }
    // 判断用户是否勾选商品
    if(totalNum === 0) {
      await showToast('您还没有选购商品！')
      return
    }
    // 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index',
    });
  }
})
// pages/QRCode/QRCode.js

var drawQrcode = require("../../utils/qrcode");

Page({
    /**
     * 页面的初始数据
     */
    data: {
        txtAreaVal: "",//input文本
        codeShow: true,//canvas展示
        ctx: ""
    },

    toUtf8(str) { //解决中文乱码的问题
        let out, i, len, c;
        out = "";
        len = str.length; //文本域值的长度
        for (i = 0; i < len; i++) {
            c = str.charCodeAt(i); //返回值是UTF-16的代码单元值 0-65535之间的整数 参数：大于等于0（如果小于0或者等于大于字符串的长度 则返回nan）
            // console.log('cc',c);
            if ((c >= 0x0001) && (c <= 0x007F)) {
                out += str.charAt(i); // 从一个字符串中返回指定的字符
                // console.log('out',out); //就是文本域的值
            } else if (c > 0x07FF) {
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
        }
        return out;
    },

    // 文本域的值发生改变 声明了bindinput事件
    handleTxtChange(e) {
        this.setData({
            qrCode_url: this.toUtf8(e.detail.value), // 调用中文乱码的方法
            // txtAreaVal: e.detail.value // 文本域的值
        })
    },

    // 生成二维码
    handleTap() {
        //文本域的值
        const txtVal = this.data.txtAreaVal
        // console.log('url', this.data.qrCode_url);
        // 第一步：
        if (!txtVal.length) {
            // 无文本域的值 显示弹框
            wx.showToast({
                title: '请输入字符串，可以是网址、文本等',
                icon: "none"
            })
        } else {
            // 有文本域的值 提示loading效果
            wx.showLoading({
                title: "生成中"
            })
            this.setData({
                codeShow: false //canvas画布不隐藏 默认是隐藏
            })
            // 获取可使用宽高度
            // 第二步：
            const ctx = this.data.ctx;
            // 调用创建画布的方法，传递参数
            // 第三步：
            this.drawCanvas(txtVal, this.data.ctx, ctx.canvas.width, ctx.canvas.height)
            wx.hideLoading()
        }
    },

    // 创建画布 接收传递过来的几个实参
    drawCanvas(e, n, t, i) {
        // e:代表文本域的值
        // n：canvasID
        // t：可使用窗口的宽度
        // i：可使用窗口的高度
        // this.data.bgcVal：背景颜色
        // this.data.QJbgcVal ：前景颜色
        //这里的  drawQrcode.api.draw 是引入封装好的js文件进来里面 的 draw方法
        drawQrcode.api.draw(e, n, t, i, "", "")
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const query = wx.createSelectorQuery()
        query.select('#myCanvas')
            .fields({ node: true, size: true })
            .exec((res) => {
                const canvas = res[0].node
                const ctx = canvas.getContext('2d')

                const dpr = wx.getSystemInfoSync().pixelRatio
                canvas.width = res[0].width * dpr
                canvas.height = res[0].height * dpr

                this.setData({
                    ctx
                })
            })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
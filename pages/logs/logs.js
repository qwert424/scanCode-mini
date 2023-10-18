// logs.js
import {formatTime} from "../../utils/util"
Page({
  data: {
    logsList: []
  },
  handleTap(e){
   wx.navigateTo({
     url: `/pages/details/details?result=${e.currentTarget.dataset.item.result}&scanCode=${e.currentTarget.dataset.item.scanCode}&index=${e.currentTarget.dataset.index}`,
   })
  },
  onShow() {
    const resp = wx.getStorageSync('QrcodeList')||[]
    const arr = []
    resp.forEach(item => {
      arr.push({
        ...item,
        date: formatTime(item.date)
      })
      })
      this.setData({
        logsList :arr
      })
  }
})

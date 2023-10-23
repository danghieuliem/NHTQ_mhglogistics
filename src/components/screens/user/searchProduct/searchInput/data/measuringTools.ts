const MeasuringTools = {
  Img: '/catalogueImages/hammer.png',
  Title: 'Dụng cụ đo',
  Children: [
    {
      Title: 'Dụng cụ quang học',
      Children: [
        { Title: 'kính hiển vi', Value: '显微镜' },
        { Title: 'kính viễn vọng', Value: '望远镜' },
        { Title: 'kính phóng đại', Value: '放大镜' }
      ]
    },
    {
      Title: 'Dụng cụ đo nhiệt độ và độ ẩm',
      Children: [
        { Title: 'nhiệt kế', Value: '温度计' },
        { Title: 'điện trở nóng', Value: '温度传感器' }
      ]
    },
    {
      Title: 'Dụng cụ đo lường',
      Children: [
        { Title: 'thước thép', Value: '钢尺' },
        { Title: 'bộ căn lá', Value: '卷尺' },
        { Title: 'thước cặp hiển thị số', Value: '数显卡尺' }
      ]
    }
  ]
}
export default MeasuringTools

const Lingerie = {
  Img: '/catalogueImages/underwear.png',
  Title: 'Đồ nội y',
  Children: [
    {
      Title: 'Đồ lót nam',
      Value: '男士内衣',
      Children: []
    },
    {
      Title: 'Đồ lót nữ',
      Value: '女士内衣',
      Children: []
    },
    {
      Title: 'Đồ ngủ',
      Children: [
        { Title: 'Đồ ngủ nam', Value: '男士睡衣' },
        { Title: 'Đồ ngủ nữ', Value: '女士睡衣' }
      ]
    },
    {
      Title: 'Tất',
      Value: '',
      Children: [
        { Title: 'Tất nam', Value: '男士袜子' },
        { Title: 'Tất nữ', Value: '女士袜子' }
      ]
    }
  ]
}
export default Lingerie

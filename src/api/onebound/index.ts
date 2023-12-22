import { objectToQueryString } from '~/utils/onebound'

export const defaultSearchOneboundParams = {
  q: '',
  key: 't3544562368',
  secret: '20230920',
  page: 1,
  ang: 'zh-CN',
  page_size: 50,
}

export const _1688API = {
  getList: async (
    params: TSearchEC,
  ): Promise<{ items: TResponseOnebound[]; totals: number }> => {
    return new Promise((resolve, reject) => {
      const queryString = objectToQueryString(params)

      const url = `https://api-gw.onebound.cn/1688/item_search/?${queryString}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const newData = {
            items: data.items.item?.map((i) => ({
              ...i,
              pic_url: i.pic_url?.replace('_60x60.jpg', '_320x320.jpg'),
            })),
            totals: data.items.total_results,
          }
          resolve(newData)
        })
        .catch(() => reject(false))
    })
  },

  getItem: async (params: TGetItemAPI) => {
    return new Promise((resolve, reject) => {
      const queryString = objectToQueryString(params)

      const url = `https://api-gw.onebound.cn/1688/item_get/?${queryString}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export const _pindoudouAPI = {
  // getList: async (params: TSearchEC) => {
  //   return new Promise((resolve, reject) => {
  //     const queryString = objectToQueryString(params)

  //     const url = `https://api-gw.onebound.cn/taobao/item_search/?${queryString}`
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         const newData = {
  //           items: data.items.item,
  //           totals: data.items.total_results,
  //         }
  //         resolve(newData)
  //       })
  //       .catch((error) => {
  //         reject(error)
  //       })
  //   })
  // },

  getItem: async (params: TGetItemAPI) => {
    return new Promise((resolve, reject) => {
      const queryString = objectToQueryString(params)

      const url = `https://api-gw.onebound.cn/pinduoduo/item_get/?${queryString}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export const _taobaoAPI = {
  getList: async (
    params: TSearchEC,
  ): Promise<{ items: TResponseOnebound[]; totals: number }> => {
    return new Promise((resolve, reject) => {
      const queryString = objectToQueryString(params)

      const url = `https://api-gw.onebound.cn/taobao/item_search/?${queryString}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const newData = {
            items: data.items.item?.map((i) => ({
              ...i,
              pic_url: i.pic_url?.replace('_60x60.jpg', '_320x320.jpg'),
            })),
            totals: data.items.total_results,
          }
          resolve(newData)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getItem: async (params: TGetItemAPI) => {
    return new Promise((resolve, reject) => {
      const queryString = objectToQueryString(params)

      const url = `https://api-gw.onebound.cn/taobao/item_get/?${queryString}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
}

export const translateAPI = {
  toChinese: async (value: string) => {
    return new Promise<string>((resolve, reject) => {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=zh-CN&dt=t&q=${value}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log('translateAPI.toChinese: ', data[0][0][0].toString());
          resolve(data[0][0][0].toString())
        })
        .catch(() => reject(false))
    })
  },

  toVietnamese: async (value: string) => {
    return new Promise<string>((resolve, reject) => {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=zh-CN&tl=vi&dt=t&q=${value}`
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // console.log('translateAPI.toVietnamese: ', data[0][0][0].toString());
          resolve(data[0][0][0].toString())
        })
        .catch(() => reject(false))
    })
  },
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { TConfigPidVid, useMapData } from './useMapData'
import { isEmpty } from 'lodash'

export type TSubAttribute = TAttribute & {
  price: number
  totalSelected: number
  configItem: TConfigItem
}

export type TMapMainWithSubAttributes = {
  mainAttribute: TAttribute
  subAttributes: TSubAttribute[]
  sumTotalSubAtt: number
}

const getKey = (att: TConfigPidVid): string => {
  return `${att.Pid}|${att.Vid}`
}

export const useViewDetail1688Product = (data) => {
  const {
    listAttributes,
    getPriceOfItem,
    getAttributeWithPidAndVid,
    getItemWithArrayPidAndVid,
    getPromoPriceOfItem,
    getPriceQuantityRanger,
  } = useMapData(data)

  const mainAttributes = useMemo<TAttribute[]>(() => {
    const mainList = listAttributes.find((att) => att?.[0]?.ImageUrl)

    return (isEmpty(mainList) ? listAttributes[0] : mainList) || []
  }, [listAttributes])

  const subAttributes = useMemo<TAttribute[]>(() => {
    const mainList = listAttributes.find((att) => att?.[0]?.ImageUrl)

    if (isEmpty(mainList))
      return (isEmpty(mainList) ? listAttributes[1] : mainList) || []

    return listAttributes.find((att) => !att?.[0]?.ImageUrl) || []
  }, [listAttributes])

  const [selectedKeyMainAtt, setSelectedKeyMainAtt] = useState<string>(null)

  const [mapMainAttWithSubAttribute, setMapMainAttWithSubAttribute] = useState<{
    [key: string]: TMapMainWithSubAttributes
  }>({})

  const selectedMainAtt = useMemo<TAttribute>(() => {
    return mapMainAttWithSubAttribute[selectedKeyMainAtt]?.mainAttribute
  }, [mapMainAttWithSubAttribute, selectedKeyMainAtt])

  const totalSelectedAll = useMemo<number>(() => {
    return Object.values(mapMainAttWithSubAttribute).reduce(
      (pre: number, cur: TMapMainWithSubAttributes) => {
        return pre + cur.sumTotalSubAtt
      },
      0,
    )
  }, [mapMainAttWithSubAttribute])

  const sumPriceCurrentSelect = useMemo<number>((): number => {
    return Object.values(mapMainAttWithSubAttribute).reduce(
      (pre: number, cur: TMapMainWithSubAttributes): number => {
        return (
          pre +
          cur.subAttributes.reduce((pre: number, cur: TSubAttribute) => {
            const quantityRanges = getPriceQuantityRanger(cur.configItem)

            if (quantityRanges?.length) {
              let getPrice: number = +quantityRanges[0].Price.OriginalPrice
              quantityRanges.forEach((el) => {
                getPrice =
                  totalSelectedAll >= el.MinQuantity
                    ? +el.Price.OriginalPrice
                    : getPrice
              })

              return pre + getPrice * cur.totalSelected
            }

            return pre + cur.price * cur.totalSelected
          }, 0)
        )
      },
      0,
    )
  }, [mapMainAttWithSubAttribute, totalSelectedAll])

  const setTotalSelectedSubAttribute = ({
    configItemId,
    value,
  }: {
    configItemId: string
    value: number
  }) => {
    const oldValue = mapMainAttWithSubAttribute[
      selectedKeyMainAtt
    ].subAttributes.find(
      (sub) => sub.configItem.Id === configItemId,
    ).totalSelected

    mapMainAttWithSubAttribute[selectedKeyMainAtt].subAttributes.find(
      (sub) => sub.configItem.Id === configItemId,
    ).totalSelected = value

    mapMainAttWithSubAttribute[selectedKeyMainAtt].sumTotalSubAtt +=
      value - oldValue

    setMapMainAttWithSubAttribute({ ...mapMainAttWithSubAttribute })
  }

  const handleSelectMainAttribute = (ids: TConfigPidVid) => {
    setSelectedKeyMainAtt(getKey(ids))
  }

  const curDataSelected = useMemo<TMapMainWithSubAttributes>(() => {
    return mapMainAttWithSubAttribute[selectedKeyMainAtt]
  }, [mapMainAttWithSubAttribute, selectedKeyMainAtt])

  const getImageOfItem = useCallback((item: TConfigItem): string => {
    let foundImg: string = null
    item?.Configurators.forEach((Config) => {
      const img = getAttributeWithPidAndVid({
        Vid: Config.Vid,
        Pid: Config.Pid,
      })?.ImageUrl
      img && (foundImg = img)
    })

    return foundImg
  }, [])

  const clear = () => {
    setSelectedKeyMainAtt(getKey(mainAttributes?.[0]))
    const map: { [key: string]: TMapMainWithSubAttributes } = {}
    mainAttributes.forEach((main) => {
      map[getKey(main)] = {
        mainAttribute: { ...main },
        subAttributes: subAttributes.map((sub): TSubAttribute => {
          const configItem = getItemWithArrayPidAndVid([main, sub])

          return {
            ...sub,
            price:
              getPromoPriceOfItem(configItem)?.OriginalPrice ||
              getPriceOfItem(configItem).OriginalPrice,
            configItem: configItem,
            totalSelected: 0,
          }
        }),
        sumTotalSubAtt: 0,
      }
    })
    setMapMainAttWithSubAttribute(map)
  }

  useEffect(() => {
    clear()
  }, [listAttributes])

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  return {
    totalSelectedAll,
    curDataSelected,
    mapMainAttWithSubAttribute,
    selectedMainAtt,
    sumPriceCurrentSelect,
    openModal,
    setOpenModal,
    isLoading,
    setIsLoading,
    getItemWithArrayPidAndVid,
    getPromoPriceOfItem,
    handleSelectMainAttribute,
    setTotalSelectedSubAttribute,
    getAttributeWithPidAndVid,
    clear,
    getImageOfItem,
    getPriceOfItem,
  }
}

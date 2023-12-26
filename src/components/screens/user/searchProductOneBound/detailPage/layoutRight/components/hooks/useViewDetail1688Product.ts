import { useCallback, useEffect, useMemo, useState } from 'react'
import { useMapData } from './useMapData'
import { isEmpty } from 'lodash'

export type TKeyPropertyWithTotalSelect = {
  [key: string]: number
}

export type TSelectedProp = { key: string; val: string }

export const useViewDetail1688Product = (data: TItemDetail) => {
  const { mapKeyPropertyValueSku, props_list, props_img, priceRange } =
    useMapData(data)

  const [openModal, setOpenModal] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [totalSelectedAll, setTotalSelectedAll] = useState<number>(0)

  const [mapSelectedForMain, setMapSelectedForMain] =
    useState<TKeyPropertyWithTotalSelect>({})

  const [mapKeyPropertyWithTotalSelected, setMapKeyPropertyWithTotalSelected] =
    useState<TKeyPropertyWithTotalSelect>({})

  const propListKeys = useMemo<string[]>(() => {
    return Object.keys(props_list || {})
  }, [props_list])

  const mainProps = useMemo<TPropsListItem>(() => {
    const newMap = {}
    propListKeys.forEach((key) => {
      const [Pid] = key.split(':')
      if (Pid === '0')
        // first prop
        newMap[key] = props_list[key]
    })
    return newMap
  }, [props_list])

  const subProps = useMemo<{ [key: string]: string }>(() => {
    const newMap = {}
    propListKeys.forEach((key) => {
      const [Pid] = key.split(':')
      if (Pid !== '0')
        // isn't first prop
        newMap[key] = props_list[key]
    })
    return newMap
  }, [props_list])

  useEffect(() => {
    const map: TKeyPropertyWithTotalSelect = {}
    Object.keys(mapKeyPropertyValueSku).forEach((key) => {
      map[key] = 0
    })

    setMapKeyPropertyWithTotalSelected(map)
  }, [mainProps])

  useEffect(() => {
    const mapMainSelect = {}
    Object.keys(mainProps).forEach((key) => {
      mapMainSelect[key] = 0
    })

    setMapSelectedForMain(mapMainSelect)
  }, [mainProps])

  const handelChangeTotalSelectedProduct = useCallback(
    ({ properties, value }: { properties: string; value: number }) => {
      const newData = { ...mapKeyPropertyWithTotalSelected }
      const oldValue = newData[properties]
      newData[properties] = value
      setMapKeyPropertyWithTotalSelected(newData)
      setTotalSelectedAll(totalSelectedAll + value - oldValue)

      const newMap = { ...mapSelectedForMain }
      const mainKey = properties.split(';')[0]
      newMap[mainKey] = newMap[mainKey] + value - oldValue
      setMapSelectedForMain(newMap)
    },
    [
      mapKeyPropertyWithTotalSelected,
      setMapKeyPropertyWithTotalSelected,
      setTotalSelectedAll,
    ],
  )

  const [selectedMainProp, setSelectedMainProp] = useState<TSelectedProp>()

  const handleSelectedMainProp = useCallback(
    (val: TSelectedProp) => {
      setSelectedMainProp({ ...val })
    },
    [setSelectedMainProp],
  )

  const sumPriceCurrentSelect = useMemo<number>((): number => {
    const getPrice = priceRange?.reduce(
      (pre: number, cur: [string, string]) => {
        return +cur[0] <= totalSelectedAll ? +cur[1] : pre
      },
      +priceRange[0][0],
    )

    return (getPrice || +data.price) * totalSelectedAll
  }, [mapKeyPropertyWithTotalSelected, totalSelectedAll, priceRange, data])

  return {
    props_img,
    mainProps,
    subProps,
    openModal,
    selectedMainProp,
    sumPriceCurrentSelect,
    setOpenModal,
    handleSelectedMainProp,
    isLoading,
    setIsLoading,
    mapSelectedForMain,
    totalSelectedAll,
    mapKeyPropertyValueSku,
    mapKeyPropertyWithTotalSelected,
    handelChangeTotalSelectedProduct,
  }
}

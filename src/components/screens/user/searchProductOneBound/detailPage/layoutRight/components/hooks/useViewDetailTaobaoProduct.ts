import { useCallback, useEffect, useMemo, useState } from 'react'
import { TSelectedProp, useMapData } from './useMapData'
import { isEmpty } from 'lodash'

export const useViewDetailProduct = (data) => {
  const [openModal, setOpenModal] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { mapKeyPropertyValueSku, props_img, props_list, priceRange } =
    useMapData(data)

  const [selectedProps, setSelectedMainProp] = useState<string>('')

  useEffect(() => {
    setSelectedMainProp(Object.keys(mapKeyPropertyValueSku)[0])
  }, [mapKeyPropertyValueSku])

  const selectedSku = useMemo<TSku>(() => {
    const newSelected = { ...mapKeyPropertyValueSku[selectedProps] }
    const keysNewSelect = newSelected?.properties?.split(';')

    const foundPropHaveKey = keysNewSelect?.find((key) => {
      return !isEmpty(props_img[key])
    })
    newSelected.image = props_img[foundPropHaveKey]?.replace(
      '//img.alicdn.com',
      'http://g.search1.alicdn.com',
    )

    return newSelected
  }, [mapKeyPropertyValueSku, selectedProps, props_img])

  /**
   * prop: '23:32'
   */
  const handleSelected = useCallback(
    (prop: string) => {
      const [Pid] = prop.split(':')
      const listId = selectedProps.split(';')
      const foundIndex = listId.findIndex((key) => {
        const [p] = key.split(':')
        return p === Pid
      })

      listId[foundIndex] = prop
      setSelectedMainProp(listId.join(';'))
    },
    [selectedProps],
  )

  const listPropType = useMemo<TSelectedProp[][]>(() => {
    const listType: { [key: string]: TSelectedProp[] } = {}
    const productListKey = Object.keys(props_list)

    productListKey.forEach((key) => {
      const [Pid] = key.split(':')
      if (isEmpty(listType[Pid]))
        return (listType[Pid] = [{ key, val: props_list[key] }])
      return listType[Pid].push({ key, val: props_list[key] })
    })
    return Object.values(listType)
  }, [props_list])

  const totalPrice = useMemo(() => {}, [])

  return {
    props_img,
    listPropType,
    props_list,
    mapKeyPropertyValueSku,
    selectedSku,
    totalPrice,
    handleSelected,
    openModal,
    setOpenModal,
  }
}

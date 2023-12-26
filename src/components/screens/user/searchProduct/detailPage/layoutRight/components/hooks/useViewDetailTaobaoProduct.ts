import { useCallback, useEffect, useMemo, useState } from 'react'
import { TConfigPidVid, useMapData } from './useMapData'
import { isEmpty } from 'lodash'

export const useViewDetailProduct = (data) => {
  const {
    getPriceOfItem,
    getAttributeWithPidAndVid,
    getItemWithArrayPidAndVid,
    getPromoPriceOfItem,
    listAttributes,
  } = useMapData(data)

  const [selectedAttributes, setSelectedAttributes] = useState<{
    [Pid: string]: TConfigPidVid
  }>({})

  useEffect(() => {
    const newSelectedAttribute: {
      [Pid: string]: TConfigPidVid
    } = {}

    listAttributes.forEach((listAtt) => {
      newSelectedAttribute[listAtt[0].Pid] = listAtt[0]
    })

    setSelectedAttributes(newSelectedAttribute)
  }, [listAttributes])

  const selectedItem = useMemo<TConfigItem>((): TConfigItem => {
    return getItemWithArrayPidAndVid(Object.values(selectedAttributes))
  }, [selectedAttributes])

  const HandleSelectedAttribute = useCallback(
    (ids: TConfigPidVid) => {
      const newSelected = { ...selectedAttributes }
      newSelected[ids.Pid] = ids
      setSelectedAttributes(newSelected)
    },
    [selectedAttributes, setSelectedAttributes],
  )

  // * Handle for UI
  const [openModal, setOpenModal] = useState<boolean>(false)

  const totalPrice = useMemo<string>(() => {
    if (isEmpty(selectedItem)) return
    const promoPrice = getPromoPriceOfItem(selectedItem)

    if (!isEmpty(promoPrice)) return promoPrice.OriginalPrice.toFixed(2)

    return getPriceOfItem(selectedItem).OriginalPrice.toFixed(2)
  }, [selectedItem])

  const imageSelectItem = useMemo<string>(() => {
    let foundImg: string = null
    selectedItem?.Configurators.forEach((Config) => {
      const img = getAttributeWithPidAndVid({
        Vid: Config.Vid,
        Pid: Config.Pid,
      })?.ImageUrl
      img && (foundImg = img)
    })

    return foundImg
  }, [{ ...selectedItem }])

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

  return {
    listAttributes,
    selectedItem,
    openModal,
    totalPrice,
    imageSelectItem,
    HandleSelectedAttribute,
    setOpenModal,
    getAttributeWithPidAndVid,
    getPriceOfItem,
    getPromoPriceOfItem,
    getImageOfItem,
  }
}

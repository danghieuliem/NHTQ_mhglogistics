import { isEmpty } from 'lodash'
import { useMemo } from 'react'
export type TSelectedProp = { key: string; val: string }

export const useMapData = (data: TItemDetail) => {
  const { props_list, props_img, skus, priceRange } = data
  const { sku } = skus

  const mapKeyPropertyValueSku = useMemo<{
    [key: TSku['properties']]: TSku
  }>(() => {
    if (isEmpty(sku)) return {}
    const newData = {}
    sku.map((sk) => {
      newData[sk.properties] = sk
    })

    return newData
  }, [sku])

  return { mapKeyPropertyValueSku, props_img, props_list, priceRange }
}

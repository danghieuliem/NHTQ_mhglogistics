import styles from '../../common/_index.module.scss'
import { CustomInputNumber } from '../../common/customInputNumber'
import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'
import {
  TKeyPropertyWithTotalSelect,
  TSelectedProp,
} from '../../hooks/useViewDetail1688Product'

const ItemElement = ({
  propItem,
  setTotalSelected,
  mapKeyPropertyValueSku,
  mapKeyPropertyWithTotalSelected,
  selectedMainProp,
}: {
  propItem: { key: string; value: string }
  setTotalSelected: (param: { properties: string; value: number }) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  selectedMainProp: TSelectedProp
}) => {
  const sku = useMemo<TSku>(() => {
    return mapKeyPropertyValueSku?.[`${selectedMainProp?.key};${propItem.key}`]
  }, [propItem, selectedMainProp])

  return sku ? (
    <div className={styles['prop-content']} key={`config-item-${propItem.key}`}>
      <div className={styles['sku-item-wrapper']}>
        <div className={styles['sku-item-name']}>
          {propItem.value.split(':')[1]}
        </div>
        <div className={styles['sku-item-left']}>
          <div className={styles['sku-item-price']}>{sku?.price}元 </div>
          <div className={styles['sku-sale-num']}>{sku?.quantity} có sẵn</div>
          <div className={styles['sku-item-picker-inline']}>
            <CustomInputNumber
              data={sku}
              setTotal={(val) => {
                setTotalSelected({
                  properties: sku.properties,
                  value: val,
                })
              }}
              total={mapKeyPropertyWithTotalSelected?.[sku.properties]}
            />
            <div className={styles['sku-number-picker-message']}></div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}

export const SubAttributeItems = ({
  propList,
  setTotalSelected,
  mapKeyPropertyValueSku,
  mapKeyPropertyWithTotalSelected,
  selectedMainProp,
}: {
  propList: TPropsListItem
  setTotalSelected: (param: { properties: string; value: number }) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  selectedMainProp: TSelectedProp
}) => {
  return (
    <div className={styles['prop-contain']}>
      {!isEmpty(propList)
        ? Object.keys(propList).map((key: string) => (
            <React.Fragment key={key}>
              <ItemElement
                mapKeyPropertyValueSku={mapKeyPropertyValueSku}
                propItem={{ key, value: propList[key] }}
                setTotalSelected={setTotalSelected}
                mapKeyPropertyWithTotalSelected={
                  mapKeyPropertyWithTotalSelected
                }
                selectedMainProp={selectedMainProp}
              />
            </React.Fragment>
          ))
        : null}
    </div>
  )
}

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
  props_img,
  handleSelectProp,
  onChangePreview,
}: {
  propItem: { key: string; value: string }
  setTotalSelected: (param: { properties: string; value: number }) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  selectedMainProp: TSelectedProp
  props_img?: TPropsListItem
  handleSelectProp?: (val: TSelectedProp) => void
  onChangePreview?: (val: string) => void
}) => {
  const key = useMemo<string>(() => {
    return isEmpty(selectedMainProp)
      ? propItem.key
      : `${selectedMainProp?.key};${propItem.key}`
  }, [selectedMainProp, propItem])

  const sku = useMemo<TSku>(() => {
    return mapKeyPropertyValueSku?.[key]
  }, [propItem, selectedMainProp, key])

  return sku ? (
    <div className={styles['prop-content']} key={`config-item-${propItem.key}`}>
      <div className={styles['sku-item-wrapper']}>
        {!isEmpty(props_img?.[key]) && (
          <div
            className='cursor-pointer'
            style={{
              background: `url(${props_img[key]}) center center / contain no-repeat`,
              width: props_img[key] && '36px',
              height: '36px',
              // marginRight: '2px'
            }}
            onClick={() => {
              handleSelectProp &&
                handleSelectProp({
                  key,
                  val: propItem.value,
                })
              onChangePreview(props_img[key] || '')
            }}
          ></div>
        )}
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
  props_img,
  handleSelectProp,
  onChangePreview,
}: {
  propList: TPropsListItem
  setTotalSelected: (param: { properties: string; value: number }) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  selectedMainProp: TSelectedProp
  props_img?: TPropsListItem
  handleSelectProp?: (val: TSelectedProp) => void
  onChangePreview?: (val: string) => void
}) => {
  return (
    <div className={styles['prop-contain']}>
      {!isEmpty(propList)
        ? Object.keys(propList).map((key: string) => (
            <React.Fragment key={key}>
              <ItemElement
                props_img={props_img}
                mapKeyPropertyValueSku={mapKeyPropertyValueSku}
                propItem={{ key, value: propList[key] }}
                setTotalSelected={setTotalSelected}
                mapKeyPropertyWithTotalSelected={
                  mapKeyPropertyWithTotalSelected
                }
                selectedMainProp={selectedMainProp}
                handleSelectProp={handleSelectProp}
                onChangePreview={onChangePreview}
              />
            </React.Fragment>
          ))
        : null}
    </div>
  )
}

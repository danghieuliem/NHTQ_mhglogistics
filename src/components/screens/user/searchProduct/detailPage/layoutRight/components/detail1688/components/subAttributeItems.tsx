import styles from '../../common/_index.module.scss'
import { CustomInputNumber } from '../../common/customInputNumber'
import { useState } from 'react'
import React from 'react'
import {
  TMapMainWithSubAttributes,
  TSubAttribute,
} from '../../hooks/useViewDetail1688Product'
import { isEmpty } from 'lodash'

const ItemElement = ({
  attribute,
  setTotalSelected,
}: {
  attribute: TSubAttribute
  setTotalSelected: (param: { configItemId: string; value: number }) => void
}) => {
  return (
    <div
      className={styles['prop-content']}
      key={`config-item-${attribute?.Pid}-${attribute?.Vid}`}
    >
      <div className={styles['sku-item-wrapper']}>
        <div className={styles['sku-item-name']}>{attribute?.Value}</div>
        <div className={styles['sku-item-left']}>
          <div className={styles['sku-item-price']}>{attribute?.price}元 </div>
          <div className={styles['sku-sale-num']}>
            {attribute?.configItem.Quantity} có sẵn
          </div>
          <div className={styles['sku-item-picker-inline']}>
            <CustomInputNumber
              data={attribute.configItem}
              setTotal={(val) => {
                setTotalSelected({
                  configItemId: attribute.configItem.Id,
                  value: val,
                })
              }}
              total={attribute.totalSelected}
            />
            <div className={styles['sku-number-picker-message']}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const SubAttributeItems = ({
  attributes,
  setTotalSelected,
}: {
  attributes: TMapMainWithSubAttributes
  setTotalSelected: (param: { configItemId: string; value: number }) => void
}) => {
  return (
    <div className={styles['prop-contain']}>
      {!isEmpty(attributes)
        ? attributes?.subAttributes.map((sub: TSubAttribute) => (
            <React.Fragment key={sub.Vid}>
              <ItemElement
                attribute={sub}
                setTotalSelected={setTotalSelected}
              />
            </React.Fragment>
          ))
        : null}
    </div>
  )
}

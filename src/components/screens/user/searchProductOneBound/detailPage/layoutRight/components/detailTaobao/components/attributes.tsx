import { useState, useEffect, useMemo } from 'react'
import styles from '../../common/_index.module.scss'
import { AttributeItems } from './attributeItems'
import { isEmpty, isUndefined } from 'lodash'
import { TSelectedProp } from '../../hooks/useMapData'
import { TranslateToVN } from '../../common/transplateToVN'

export const Attributes = ({
  props_img,
  selectedSku,
  listPropType,
  handleSelectProp,
  onChangePreview,
  mapKeyPropertyValueSku,
}: {
  props_img: { [key: string]: string }
  selectedSku: TSku
  listPropType: TSelectedProp[][]
  handleSelectProp: (prop: string) => void
  onChangePreview: (img: string) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
}) => {
  useEffect(() => {
    onChangePreview(selectedSku?.image || '')
  }, [selectedSku])

  const handleSelected = (prop: string) => {
    handleSelectProp(prop)
  }

  const listKeySelected = useMemo(() => {
    return selectedSku?.properties?.split(';')
  }, [selectedSku])

  return (
    <>
      {!isEmpty(listPropType) && (
        <div className={styles['attributes-contain']}>
          {listPropType?.map((props: TSelectedProp[], idx: number) => (
            <div
              className={
                styles['attributes-content'] +
                `${
                  !isEmpty(props_img[props[0].key])
                    ? ' have-image order-first'
                    : ''
                }`
              }
              key={`fmAttributes-${idx}`}
            >
              <div className={styles['attributes-header']}>
                <span className={styles['attributes-name']}>
                  <TranslateToVN text={props[0].val.split(':')[0]} />
                </span>
              </div>
              <div className={styles['attributes-wrapper']}>
                <AttributeItems
                  props_img={props_img}
                  selectedSku={selectedSku}
                  data={props}
                  onSelected={handleSelected}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

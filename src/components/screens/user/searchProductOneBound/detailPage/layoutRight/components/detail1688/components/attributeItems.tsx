import clsx from 'clsx'
import styles from '../../common/_index.module.scss'
import { Badge } from 'antd'
import {
  TKeyPropertyWithTotalSelect,
  TSelectedProp,
} from '../../hooks/useViewDetail1688Product'
import { useEffect, useMemo, useState } from 'react'
import { translateAPI } from '~/api/onebound'
import { TranslateToVN } from '../../common/transplateToVN'

export const AttributeItems = ({
  onChangePreview,
  propList,
  propSelected,
  handleSelectProp,
  mapKeyPropertyWithTotalSelected,
  props_img,
  mapSelectedForMain,
}: {
  props_img: TPropsListItem
  onChangePreview
  propList: TPropsListItem
  propSelected: TSelectedProp
  handleSelectProp: (val: TSelectedProp) => void
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  mapSelectedForMain: TKeyPropertyWithTotalSelect
}) => {
  const propListKeys = useMemo(() => {
    return Object.keys(propList)
  }, [propList])

  const propListValues = useMemo(() => {
    return Object.values(propList)
  }, [propList])

  return (
    <div className={styles['attributes-wrapper']}>
      {propListKeys.length
        ? propListKeys.map((key: string, index: number) => {
            return (
              <div
                className={clsx(styles['attributes-item'])}
                key={`item-0-${index}`}
              >
                <Badge count={mapSelectedForMain[key]}>
                  <div
                    className={clsx(
                      styles['attributes-item-inner'],
                      key === propSelected?.key &&
                        styles['attributes-item-inner-active'],
                    )}
                    onClick={() => {
                      handleSelectProp({
                        key,
                        val: propList[key],
                      })
                      onChangePreview(props_img[key] || '')
                    }}
                  >
                    <div
                      style={{
                        background: `url(${props_img[key]}) center center / contain no-repeat`,
                        width: props_img[key] && '36px',
                        height: '36px',
                        // marginRight: '2px'
                      }}
                    ></div>
                    <TranslateToVN text={propList[key].split(':')[1]} />
                  </div>
                </Badge>
              </div>
            )
          })
        : null}
    </div>
  )
}

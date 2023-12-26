import clsx from 'clsx'
import styles from '../../common/_index.module.scss'
import { isEmpty } from 'lodash'
import { useMemo } from 'react'
import { TranslateToVN } from '../../common/transplateToVN'
import { TSelectedProp } from '../../hooks/useMapData'

export const AttributeItems = ({
  data,
  onSelected,
  selectedSku,
  props_img,
}: {
  data: TSelectedProp[]
  onSelected: (prop: string) => void
  selectedSku: TSku
  props_img: { [key: string]: string }
}) => {
  return (
    <>
      {!isEmpty(data) &&
        data.map(({ key, val }, idx: number) => {
          const isSelected = selectedSku?.properties?.includes(key)
          return (
            <div
              className={clsx(styles['attributes-item'])}
              key={`item-0-${idx}`}
            >
              <div
                className={clsx(
                  styles['attributes-item-inner'],
                  isSelected && styles['attributes-item-inner-active'],
                )}
                onClick={isSelected ? null : () => onSelected(key)}
              >
                {props_img?.[key] && (
                  <div
                    style={{
                      background: `url(${props_img?.[key]}) center center / contain no-repeat`,
                      width: '36px',
                      height: '36px',
                    }}
                  ></div>
                )}
                <div className={styles['attributes-item-inner-value']}>
                  <TranslateToVN text={val.split(':')[1]} />
                </div>
              </div>
            </div>
          )
        })}
    </>
  )
}

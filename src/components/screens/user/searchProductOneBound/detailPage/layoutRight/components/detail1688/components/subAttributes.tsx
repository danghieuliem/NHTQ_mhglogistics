import clsx from 'clsx'
import styles from '../../common/_index.module.scss'
import { SubAttributeItems } from './subAttributeItems'
import { useEffect, useMemo } from 'react'
import { isEmpty } from 'lodash'
import {
  TKeyPropertyWithTotalSelect,
  TSelectedProp,
} from '../../hooks/useViewDetail1688Product'
import { TranslateToVN } from '../../common/transplateToVN'

export const SubAttributes = ({
  props_img,
  propList,
  setTotalSelected,
  mapKeyPropertyValueSku,
  mapKeyPropertyWithTotalSelected,
  selectedMainProp,
}: {
  props_img?: TPropsListItem
  propList: TPropsListItem
  setTotalSelected: (param: { properties: string; value: number }) => void
  mapKeyPropertyValueSku: {
    [key: string]: TSku
  }
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  selectedMainProp: TSelectedProp
}) => {
  const propName = useMemo(() => {
    return propList[Object.keys(propList)[0]]?.split(':')[0]
  }, [propList])

  return (
    <div className={styles['prop-section']}>
      <div className={clsx(styles['prop-header'], '')}>
        <div>
          <TranslateToVN
            text={!isEmpty(propName) ? propName : 'Số lượng mua'}
          />
        </div>
      </div>
      <SubAttributeItems
        props_img={props_img}
        propList={propList}
        setTotalSelected={setTotalSelected}
        mapKeyPropertyValueSku={mapKeyPropertyValueSku}
        mapKeyPropertyWithTotalSelected={mapKeyPropertyWithTotalSelected}
        selectedMainProp={selectedMainProp}
      />
    </div>
  )
}

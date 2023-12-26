import { useEffect, useMemo } from 'react'
import styles from '../../common/_index.module.scss'
import { AttributeItems } from './attributeItems'
import { isEmpty } from 'lodash'
import {
  TKeyPropertyWithTotalSelect,
  TSelectedProp,
} from '../../hooks/useViewDetail1688Product'
import { translateAPI } from '~/api/onebound'
import { TranslateToVN } from '../../common/transplateToVN'

export const Attributes = ({
  props_img,
  propList,
  propSelected,
  handleSelectProp,
  onChangePreview,
  mapKeyPropertyWithTotalSelected,
  mapSelectedForMain,
}: {
  props_img: TPropsListItem
  propList: TPropsListItem
  propSelected: TSelectedProp
  handleSelectProp: (val: TSelectedProp) => void
  onChangePreview: (img) => void
  mapKeyPropertyWithTotalSelected: TKeyPropertyWithTotalSelect
  mapSelectedForMain: TKeyPropertyWithTotalSelect
}) => {
  const propName = useMemo<string>(() => {
    if (isEmpty(propList)) return ''
    return propList[Object.keys(propList)[0]].split(':')[1]
  }, [propList])

  useEffect(() => {
    handleSelectProp({
      key: Object.keys(propList)[0],
      val: propList[Object.keys(propList)[0]],
    })
  }, [propList])

  return Object.keys(propList).length ? (
    <div className={styles['attributes-contain']}>
      <div className={styles['attributes-content']} key={`fmAttributes-hehe`}>
        <div className={styles['attributes-header']}>
          <span className={styles['attributes-name']}>
            <TranslateToVN text={propName} />
          </span>
        </div>
        <AttributeItems
          props_img={props_img}
          propList={propList}
          propSelected={propSelected}
          handleSelectProp={handleSelectProp}
          onChangePreview={onChangePreview}
          mapKeyPropertyWithTotalSelected={mapKeyPropertyWithTotalSelected}
          mapSelectedForMain={mapSelectedForMain}
        />
      </div>
    </div>
  ) : null
}

import clsx from 'clsx'
import styles from '../../common/_index.module.scss'
import { SubAttributeItems } from './subAttributeItems'
import { TMapMainWithSubAttributes } from '../../hooks/useViewDetail1688Product'
import { useEffect } from 'react'
import { isEmpty } from 'lodash'

export const SubAttributes = ({
  attributes,
  setTotalSelected,
}: {
  attributes: TMapMainWithSubAttributes
  setTotalSelected: (param: { configItemId: string; value: number }) => void
}) => {
  return (
    <div className={styles['prop-section']}>
      <div className={clsx(styles['prop-header'], '')}>
        <div>
          {!isEmpty(attributes)
            ? attributes?.mainAttribute?.PropertyName
            : 'Số lượng mua'}
        </div>
      </div>
      <SubAttributeItems
        attributes={attributes}
        setTotalSelected={setTotalSelected}
      />
    </div>
  )
}

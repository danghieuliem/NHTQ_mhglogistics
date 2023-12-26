import styles from '../../common/_index.module.scss'
import { TConfigPidVid } from '../../hooks/useMapData'
import { TMapMainWithSubAttributes } from '../../hooks/useViewDetail1688Product'
import { AttributeItems } from './attributeItems'

export const Attributes = ({
  attriButes,
  attributeSelected,
  handleSelectAttribute,
  onChangePreview,
}: {
  attriButes: TMapMainWithSubAttributes[]
  attributeSelected: TAttribute
  handleSelectAttribute: (ids: TConfigPidVid) => void
  onChangePreview: (img) => void
}) => {
  return !!attriButes.length ? (
    <div className={styles['attributes-contain']}>
      <div className={styles['attributes-content']} key={`fmAttributes-hehe`}>
        <div className={styles['attributes-header']}>
          <span className={styles['attributes-name']}>
            {attriButes[0].mainAttribute.PropertyName}
          </span>
        </div>
        <AttributeItems
          attriButes={attriButes}
          attributeSelected={attributeSelected}
          handleSelectAttribute={handleSelectAttribute}
          onChangePreview={onChangePreview}
        />
      </div>
    </div>
  ) : null
}

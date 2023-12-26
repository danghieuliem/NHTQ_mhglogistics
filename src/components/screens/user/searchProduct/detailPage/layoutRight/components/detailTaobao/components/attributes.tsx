import { useState, useEffect } from 'react'
import styles from '../../common/_index.module.scss'
import { TConfigPidVid } from '../../hooks/useMapData'
import { AttributeItems } from './attributeItems'
import { isUndefined } from 'lodash'

export const Attributes = ({
  listAttributes,
  handleSelectAttribute,
  onChangePreview,
}: {
  listAttributes: TAttribute[][]
  handleSelectAttribute: (val: TConfigPidVid) => void
  onChangePreview: (img: string) => void
}) => {
  const [selected, setSelected] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const newSelected: { [key: string]: string } = {}
    listAttributes.forEach((att, idx) => {
      newSelected[idx] = att[0].Vid
    })
    setSelected(newSelected)
  }, [])

  const handleSelected = (param: {
    attributeItem: TAttribute
    indexOfAttributes: number
    indexOfAttributeItems: number
  }) => {
    handleSelectAttribute(param.attributeItem)
    onChangePreview(param.attributeItem?.ImageUrl || '')

    const newSelected: { [key: string]: string } = { ...selected }
    newSelected[param.indexOfAttributes] = param.attributeItem.Vid
    setSelected(newSelected)
  }

  return (
    <>
      {listAttributes?.length !== 0 && (
        <div className={styles['attributes-contain']}>
          {listAttributes?.map((attributes: TAttribute[], idx: number) => (
            <div
              className={
                styles['attributes-content'] +
                `${
                  !isUndefined(attributes?.[0].ImageUrl) ? ' order-first' : ''
                }`
              }
              key={`fmAttributes-${idx}`}
            >
              <div className={styles['attributes-header']}>
                <span className={styles['attributes-name']}>
                  {
                    attributes[0].PropertyName
                    // *** attributes[0] hard code [0] because all items in an attributes has the same PropertyName
                  }
                </span>
              </div>
              <div className={styles['attributes-wrapper']}>
                <AttributeItems
                  selectedVid={selected[idx]}
                  data={attributes}
                  onSelected={(attributeItem: TAttribute, index: number) =>
                    handleSelected({
                      attributeItem,
                      indexOfAttributes: idx,
                      indexOfAttributeItems: index,
                    })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

import clsx from 'clsx'
import styles from '../../common/_index.module.scss'
import { Badge } from 'antd'
import { TMapMainWithSubAttributes } from '../../hooks/useViewDetail1688Product'

export const AttributeItems = ({
  attriButes,
  attributeSelected,
  handleSelectAttribute,
  onChangePreview,
}: {
  attriButes: TMapMainWithSubAttributes[]
  attributeSelected
  handleSelectAttribute
  onChangePreview
}) => {
  return (
    <div className={styles['attributes-wrapper']}>
      {attriButes.length
        ? attriButes.map(
            (
              { mainAttribute, sumTotalSubAtt }: TMapMainWithSubAttributes,
              index: number,
            ) => {
              return (
                <div
                  className={clsx(styles['attributes-item'])}
                  key={`item-0-${index}`}
                >
                  <Badge count={sumTotalSubAtt}>
                    <div
                      className={clsx(
                        styles['attributes-item-inner'],
                        mainAttribute.Vid == attributeSelected?.Vid &&
                          styles['attributes-item-inner-active'],
                      )}
                      onClick={() => {
                        handleSelectAttribute({
                          Pid: mainAttribute.Pid,
                          Vid: mainAttribute.Vid,
                        })
                        onChangePreview(mainAttribute?.ImageUrl || '')
                      }}
                    >
                      <div
                        style={{
                          background: `url(${mainAttribute.MiniImageUrl}) center center / contain no-repeat`,
                          width: mainAttribute.MiniImageUrl && '36px',
                          height: '36px',
                          // marginRight: '2px'
                        }}
                      ></div>
                      <div>{mainAttribute.Value}</div>
                    </div>
                  </Badge>
                </div>
              )
            },
          )
        : null}
    </div>
  )
}

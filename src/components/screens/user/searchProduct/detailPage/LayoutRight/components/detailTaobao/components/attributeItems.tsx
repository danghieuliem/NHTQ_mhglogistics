import clsx from 'clsx'
import styles from '../../common/_index.module.scss'

export const AttributeItems = ({ data, onSelected, selectedVid }) => {
  return (
    <>
      {data?.map((att: TAttribute, idx: number) => {
        const isSelected = att?.Vid === selectedVid
        return (
          <div
            className={clsx(styles['attributes-item'])}
            key={`item-0-${idx}`}>
            <div
              className={clsx(
                styles['attributes-item-inner'],
                isSelected && styles['attributes-item-inner-active']
              )}
              onClick={isSelected ? null : () => onSelected(att, idx)}>
              {att.MiniImageUrl && (
                <div
                  style={{
                    background: `url(${att.MiniImageUrl}) center center / contain no-repeat`,
                    width: '36px',
                    height: '36px'
                  }}></div>
              )}
              <div className={styles['attributes-item-inner-value']}>
                {att.Value}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

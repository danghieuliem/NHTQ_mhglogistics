import clsx from 'clsx'
import styles from './_index.module.scss'
import { InputNumber } from 'antd'
import { useMemo } from 'react'

export const CustomInputNumber = (prop: { setTotal; total; data: TSku }) => {
  const { setTotal, total, data } = prop

  const quantity = useMemo(() => {
    return +data?.quantity
  }, [data?.quantity])

  const CustomButton = ({ onClick, icon }) => {
    return (
      <div
        className={styles['next-input-group-addon next-after']}
        style={{
          margin: '0 -11px',
        }}
      >
        <button
          disabled={!quantity}
          type='button'
          className={clsx(styles['next-btn'], 'h-7 w-8')}
          onClick={onClick}
        >
          <i className={icon}></i>
        </button>
      </div>
    )
  }

  return (
    <span className={styles['next-input']}>
      <InputNumber
        addonBefore={
          <CustomButton
            onClick={() => {
              if (total - 1 < 0) return
              setTotal(total - 1)
            }}
            icon='fal fa-minus'
          />
        }
        addonAfter={
          <CustomButton
            onClick={() => {
              if (total + 1 > quantity) return
              setTotal(total + 1)
            }}
            icon='fal fa-plus'
          />
        }
        onBlur={(e) => {
          const newVal = +e.currentTarget.value
          if (Number.isNaN(newVal) || newVal < 0 || newVal > quantity) return
          setTotal(newVal)
        }}
        value={total}
        defaultValue={0}
        disabled={!quantity}
        min={0}
        max={quantity || 0}
        style={{ textAlign: 'center' }}
        controls={false}
        size='small'
      />
    </span>
  )
}

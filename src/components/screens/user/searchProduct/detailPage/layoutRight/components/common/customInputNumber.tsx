import clsx from 'clsx'
import styles from './_index.module.scss'
import { InputNumber } from 'antd'

export const CustomInputNumber = (prop: {
  setTotal
  total
  data: TConfigItem
}) => {
  const { setTotal, total, data } = prop

  const CustomButton = ({ onClick, icon }) => {
    return (
      <div
        className={styles['next-input-group-addon next-after']}
        style={{
          margin: '0 -11px',
        }}
      >
        <button
          disabled={!data?.Quantity}
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
              if (total + 1 > data?.Quantity) return
              setTotal(total + 1)
            }}
            icon='fal fa-plus'
          />
        }
        onBlur={(e) => {
          const newVal = +e.currentTarget.value
          if (Number.isNaN(newVal) || newVal < 0 || newVal > data?.Quantity)
            return
          setTotal(newVal)
        }}
        value={total}
        defaultValue={0}
        disabled={!data?.Quantity}
        min={0}
        max={data?.Quantity || 0}
        style={{ textAlign: 'center' }}
        controls={false}
        size='small'
      />
    </span>
  )
}

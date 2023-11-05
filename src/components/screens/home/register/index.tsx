import styles from './index.module.css'

import 'antd/dist/antd.css'
import { useEffect, useRef, useState } from 'react'

const StepRegister = ({ item, handleWithActiveStep, activeSteps }) => {
  const isActive = activeSteps.indexOf(item?.Code) !== -1

  return (
    <div className={styles.stepWrapper}>
      <img src={item.IMG} className={isActive ? styles.activeImg : null} />
      <span
        onClick={(e) => handleWithActiveStep(e, item)}
        className={`${styles.stepDot} ${isActive ? styles.activeDot : null} ${
          item?.Current === 0 ? 'firstDot' : ''
        }`}
      >
        {isActive && (
          <img
            src='/default/register_check.png'
            alt=''
            className={styles.checkImg}
          />
        )}
      </span>
      <h3 className={isActive ? styles.active : null}>{item?.Name}</h3>
    </div>
  )
}

export const HomeRegister = ({ data }) => {
  const [steps, setSteps] = useState([])
  const [activeSteps, setActiveSteps] = useState([])
  const [activeLine, setActiveLine] = useState(0)
  const defaultSteps = useRef([])

  useEffect(() => {
    const newSteps = []

    data?.map((item, index) => {
      defaultSteps.current = [...defaultSteps.current, item?.Code]
      newSteps.push({
        Code: item?.Code,
        Created: item?.Created,
        Name: item?.Name,
        Description: item?.Description,
        IMG: item?.IMG,
        Link: item?.Link,
        Current: index,
      })
    })

    setSteps(newSteps.sort((a, b) => a?.Position - b?.Position))
    setActiveSteps([newSteps[0]?.Code])
  }, [data])

  useEffect(() => {
    const firstLine = (document.querySelector('.firstDot') as HTMLElement)
      ?.offsetLeft
    if (firstLine) {
      setActiveLine(firstLine)
    }
  }, [steps])

  const handleWithActiveStep = (e, item) => {
    const indexOf = defaultSteps.current.indexOf(item?.Code)
    const newSteps = [...defaultSteps.current]

    if (indexOf === newSteps.length - 1) {
      setActiveLine(5000)
    } else {
      setActiveLine(e?.pageX)
    }

    setActiveSteps(newSteps.splice(0, indexOf + 1))
  }

  return (
    <div className={`${styles.regisWrap} register`}>
      <div className='container'>
        <div className={styles.inner}>
          <div className={styles.left}>
            <h4 className='small_title'>Đăng ký</h4>
            <h1 className='title'>
              Hướng dẫn <span style={{ color: '#F5851E' }}>đăng ký</span>
            </h1>
          </div>
          <div className={styles.right}>
            <div className='z-10 flex w-full flex-wrap items-center justify-between lg:flex-nowrap lg:items-baseline'>
              {steps?.map((s) => (
                <StepRegister
                  key={s.Code}
                  item={s}
                  handleWithActiveStep={handleWithActiveStep}
                  activeSteps={activeSteps}
                />
              ))}
            </div>
            <div className='z-1'>
              <div className={styles.lineInactive}></div>
              <div
                className={styles.lineActive}
                style={{ width: activeLine }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

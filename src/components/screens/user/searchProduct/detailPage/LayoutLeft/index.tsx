import clsx from 'clsx'
import { FC, useCallback, useEffect, useState } from 'react'
import styles from './_index.module.scss'

type LayoutLeftProps = {
  item: IDetailRapidProductItem
  attributeImage: string
}
type TPreviewItem = {
  type: 'image' | 'video'
  data: TPictureProduct | TVideoProduct
}
export const LayoutLeft: FC<LayoutLeftProps> = ({ item, attributeImage }) => {
  const [leftTime, setLeftTime] = useState<number>(0)
  const [previewList, setPreviewList] = useState<TPreviewItem[]>([])
  const [previewSelected, setPreviewSelected] = useState<TPreviewItem>({
    type: 'image',
    data: item.Pictures[0]
  })
  const handleScroll = useCallback((number: number) => {
    setLeftTime(number)
  }, [])
  useEffect(() => {
    if (!attributeImage.length) return
    setPreviewSelected({
      type: 'image',
      data: {
        IsMain: false,
        Url: attributeImage,
        Large: {
          Url: attributeImage,
          Height: 496,
          Width: 496
        },
        Medium: {
          Url: attributeImage,
          Height: 496,
          Width: 496
        },
        Small: {
          Url: attributeImage,
          Height: 496,
          Width: 496
        }
      }
    })
  }, [attributeImage])
  useEffect(() => {
    if (!item) return
    if (!!item.Videos?.length) {
      const fmVideos: TPreviewItem[] = [...item.Videos].map(vl => {
        return {
          type: 'video',
          data: vl
        }
      })
      const fmPictures: TPreviewItem[] = [...item.Pictures].map(el => {
        return {
          type: 'image',
          data: el
        }
      })
      const rs: TPreviewItem[] = fmVideos.concat(fmPictures)
      setPreviewList(rs)
    } else {
      const fmPictures: TPreviewItem[] = [...item.Pictures].map(el => {
        return {
          type: 'image',
          data: el
        }
      })
      setPreviewList(fmPictures)
    }
  }, [item])

  return (
    <div className={styles['layout-left']}>
      <div className={styles['detail-gallery-wrapper']}>
        <div className={styles['detail-gallery-preview']}>
          {previewSelected.type === 'image' ? (
            <img
              className={styles['preview-image']}
              src={previewSelected.data.Url}
            />
          ) : (
            <video className={styles['preview-video']} controls muted>
              <source
                src={(previewSelected.data as TVideoProduct).Url}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className={styles['detail-gallery-turn']}>
          <div
            className={styles['left-button']}
            onClick={() => {
              if (!leftTime) return
              handleScroll(leftTime - 1)
            }}>
            <img src="https://img.alicdn.com/imgextra/i3/O1CN011Awjsy1QH90HZCSqZ_!!6000000001950-2-tps-22-38.png" />
          </div>
          <div className={styles['detail-gallery-turn-outter-wrapper']}>
            <div
              className={styles['img-list-wrapper']}
              style={{
                left: `-${leftTime * 66}px`,
                width: `${
                  previewList.length * 60 + (previewList.length - 1) * 6
                }px`
              }}>
              {previewList.map((vl, idx) => {
                return (
                  <div
                    className={clsx(
                      styles['detail-gallery-turn-item'],
                      'relative'
                    )}
                    key={`${vl.type}-${idx}`}
                    onMouseEnter={() => {
                      setPreviewSelected(vl)
                    }}>
                    <img
                      src={
                        vl.type == 'image'
                          ? (vl.data as TPictureProduct).Small.Url
                          : (vl.data as TVideoProduct).PreviewUrl
                      }
                      style={{
                        opacity: vl.type == 'image' ? 1 : 0.8
                      }}
                      alt="gallery-item"
                    />

                    <i
                      className={clsx(
                        'absolute left-[50%] translate-x-[-50%] text-white text-[20px] far fa-play-circle',
                        vl.type == 'image' ? 'hidden' : 'block'
                      )}></i>
                  </div>
                )
              })}
            </div>
          </div>
          <div
            className={styles['right-button']}
            onClick={() => {
              if (leftTime >= previewList.length - 7) return
              handleScroll(leftTime + 1)
            }}>
            <img src="https://img.alicdn.com/imgextra/i1/O1CN01q4AL5P1SSiErG6lB2_!!6000000002246-2-tps-20-36.png" />
          </div>
        </div>
      </div>
    </div>
  )
}
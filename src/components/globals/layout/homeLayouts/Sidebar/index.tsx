import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { Page } from '~/api'
import { _format } from '~/utils'
import styles from './index.module.css'

const NewsItem = ({ item }) => {
  const router = useRouter()

  return (
    <a
      onClick={() => {
        localStorage.setItem('PageTypeId', item?.PageTypeId)
        router.push(`/chuyen-muc/detail/?code=${item?.Code}`)
      }}
    >
      <div className={styles.NewsItemBox}>
        <div
          className={styles.img}
          style={{
            background: item?.IMG
              ? `url(${
                  item?.IMG?.includes(' ')
                    ? item?.IMG.replaceAll(' ', '%20')
                    : item?.IMG
                })`
              : 'url(/default/pro-empty.jpg)',
          }}
        />
        <div className={styles.datetime}>
          <h3>{item?.Title}</h3>
          <span>{_format.getShortVNDate(item?.Created)}</span>
        </div>
      </div>
    </a>
  )
}

export const HomeSidebar = () => {
  const { data: news } = useQuery<any>({
    queryKey: ['menuHome'],
    queryFn: () =>
      Page.getList({
        Active: true,
        PageSize: 5,
        PageIndex: 1,
      })
        .then((res) => {
          return res?.Data?.Items
        })
        .catch((error) => {}),
    staleTime: 5000,
  })

  return (
    <>
      <div className={styles.newAticle}>
        <span className={styles.head}>
          <img src='/icon/docs.png' alt='' />
          <h3>Bài viết gần đây</h3>
        </span>
        <div className={styles.itemsBox}>
          {news?.map((item) => <NewsItem item={item} key={item?.Id} />)}
        </div>
      </div>
      {/* <div className={styles.chuyenMuc}>
        <span className={styles.head}>
          <img src="/icon/chuyenMuc.png" alt="" />
          <h3>Chuyên mục</h3>
        </span>
        <div className="chuyenMucBox ml-[-0.75rem]">
          {chuyeMucData?.map((cm) => (
            <Link href={`/chuyen-muc/${cm?.Link}`} key={cm?.Link}>
              <a target={"_blank"}>
                <Tag
                  color="blue"
                  className="!mx-3 !my-2 shadow-lg hover:!shadow-none"
                  key={cm?.Id}
                >
                  {cm?.Name}
                </Tag>
              </a>
            </Link>
          ))}
        </div>
      </div> */}
    </>
  )
}

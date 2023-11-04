import Link from 'next/link'
import router from 'next/router'
import styles from './index.module.css'
import { RootState } from '~/store'
import { useSelector } from 'react-redux'

const blogList = [
  {
    id: 1,
    title: 'Nhập hàng Trung Quốc',
    code: 'nhap-hang-trung-quoc-ve-viet-nam',
  },
  {
    id: 2,
    title: 'Đặt hàng 1688',
    code: '',
  },
  {
    id: 3,
    title: 'Đặt hàng Tmall',
    code: '',
  },
  {
    id: 4,
    title: 'Đặt hàng Taobao',
    code: 'dat-hang-taobao',
  },
]

const Footer = ({ dataMenu }) => {
  const dataGlobal: TConfig = useSelector(
    (state: RootState) => state.dataGlobal,
  )

  return (
    <footer className=''>
      <div className={styles.footerTop}>
        <div className='container'>
          <div className={styles.logo}>
            <Link href='/'>
              <a className=''>
                <img src={'/default/logo_footer.png'} alt='' height={'auto'} />
              </a>
            </Link>
          </div>
          <div className={styles.inner}>
            <div className=' col-span-1'>
              <div className={styles.title}>
                <p className='!mb-4 text-lg font-bold uppercase'> Menu </p>
              </div>
              <div className={styles.contentFoot}>
                {dataMenu?.map((item) => (
                  <div key={item.Name} className={styles.menuItem}>
                    <a
                      className={styles.colorD}
                      onClick={() =>
                        router.push({
                          pathname: '/chuyen-muc',
                          query: { code: item?.Code },
                        })
                      }
                    >
                      {item?.Name}
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-1'>
              <div className={styles.title}>
                <p className='mb-5 text-lg font-bold uppercase'>Blog</p>
              </div>
              {blogList.map((blog) => (
                <div className={styles.menuItem} key={blog?.id}>
                  <Link href={`/chuyen-muc/detail/?code=${blog.code}`}>
                    <a target={'_blank'} className={styles.colorD}>
                      {blog?.title}
                    </a>
                  </Link>
                </div>
              ))}
              {/* {articalList?.map((art) => {
                return (
                  <div className={styles.menuItem} key={art?.Code}>
                    <a
                      onClick={() =>
                        router.push({
                          pathname: "/chuyen-muc/detail",
                          query: { code: art?.Code },
                        })
                      }
                      className={styles.colorD}
                    >
                      {art?.Title}
                    </a>
                  </div>
                );
              })} */}
            </div>
            <div className='col-span-1'>
              <div className={styles.title}>
                <p className='!mb-4 text-lg font-bold uppercase'> Liên hệ </p>
              </div>
              <div className={styles.contentFoot}>
                <div className={styles.contactBox}>
                  Hotline:
                  <a
                    href={`tel:${dataGlobal?.Hotline}`}
                    className={`${styles.contactLink}`}
                  >
                    <span className={styles.colorD}>{dataGlobal?.Hotline}</span>
                  </a>
                </div>
                <div className={styles.contactBox}>
                  Email:
                  <a
                    href={`mailto:${dataGlobal?.EmailContact}`}
                    className={`${styles.contactLink}`}
                  >
                    <span className={styles.colorD}>
                      {dataGlobal?.EmailContact}
                    </span>
                  </a>
                </div>
                <div className={styles.contactBox}>
                  Địa chỉ:
                  <span
                    className={styles.colorD}
                    // dangerouslySetInnerHTML={{ __html: dataGlobal?.Address }}
                  >
                    {dataGlobal?.Address}
                  </span>
                </div>
              </div>
            </div>
            {/* {dataGlobal?.FacebookFanpage && (
              <div className="col-span-1">
                <div className="mt-4">
                  <iframe
                    src={dataGlobal?.FacebookFanpage}
                    width="100%"
                    height="300"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p className={styles.cRight}>MONAMEDIA LOGISTICS</p>
      </div>
    </footer>
  )
}

export default Footer

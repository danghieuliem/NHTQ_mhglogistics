import { FC, useMemo } from 'react'
import { _format } from '~/utils'
import { DetailTaobao } from './components/detailTaobao'
import { ShopName } from '~/configs'
import { Detail1688 } from './components/detail1688'

type TProps = {
  item: IDetailRapidProductItem
  onChangePreview: (img: string) => void
  ecsite: ShopName
}

export const LayoutRight: FC<TProps> = ({ item, onChangePreview, ecsite }) => {
  const UIDetail = useMemo(() => {
    switch (ecsite) {
      case ShopName.Shop1688:
        return Detail1688
      case ShopName.TaoBao:
      case ShopName.Tmall:
        return DetailTaobao
    }
  }, [ecsite])

  return <UIDetail item={item} onChangePreview={onChangePreview} />
}

import { isEmpty } from 'lodash'
import { useCallback, useMemo } from 'react'

export type TConfigPidVid = {
  Pid: string
  Vid: string
}

export type TMapAttribute = {
  [key: string]: TAttribute
}

const onSortConfigurators = (a: string, b: string) => {
  if (a >= b) return 1
  if (a <= b) return -1
  return 0
}

export const useMapData = (data) => {
  const { Attributes, ConfiguredItems, Promotions } = data

  const mapAttributesPidAndVid = useMemo<TMapAttribute>((): TMapAttribute => {
    const map: TMapAttribute | {} = {}
    Attributes.forEach((att) => {
      if (!att.IsConfigurator) return
      map[att.Pid] = map[att.Pid] || {}
      map[att.Pid][att.Vid] = att
    })
    return map
  }, [Attributes])

  const mapConfigurator = useMemo<{ [key: string]: TConfigItem }>(() => {
    const map = {}
    ConfiguredItems.forEach((config) => {
      const { Configurators = [] } = config
      const key = Configurators.sort((a, b) =>
        onSortConfigurators(a.Pid, b.Pid),
      )
        .reduce((pre, cur) => {
          return `${pre}|${cur.Pid}_${cur.Vid}`
        }, '')
        .substring(1)
      map[key] = config
    })
    return map
  }, [ConfiguredItems])

  const listAttributes = useMemo((): TAttribute[][] => {
    const data = Object.keys(mapAttributesPidAndVid)
      .sort(onSortConfigurators)
      .map((Pid): TAttribute[] => {
        return Object.values<any>(mapAttributesPidAndVid[Pid])
      })
    return data
  }, [mapAttributesPidAndVid])

  const getPriceOfItem = useCallback(
    (item: TConfigItem): TConfigItem['Price'] => {
      if (isEmpty(item)) return undefined
      const key: string = item?.Configurators?.reduce<any>(
        (pre: string, cur: TConfigPidVid): string => {
          return `${pre}|${cur.Pid}_${cur.Vid}`
        },
        '',
      ).substring(1)

      return mapConfigurator[key].Price
    },
    [mapConfigurator],
  )

  const getPromoPriceOfItem = useCallback(
    (item: TConfigItem): TConfigItem['Price'] => {
      if (isEmpty(Promotions) || isEmpty(item)) return undefined

      const key: string = item?.Configurators?.reduce<any>(
        (pre: string, cur: TConfigPidVid): string => {
          return `${pre}|${cur.Pid}_${cur.Vid}`
        },
        '',
      ).substring(1)

      const promo = Promotions[0]?.ConfiguredItems?.find(
        (config) => config.Id === item.Id,
      )
      return promo?.Price
    },
    [mapConfigurator, Promotions],
  )

  const getAttributeWithPidAndVid = useCallback(
    (ids: TConfigPidVid): TAttribute | undefined => {
      return mapAttributesPidAndVid[ids.Pid]?.[ids.Vid]
    },
    [mapAttributesPidAndVid],
  )

  const getItemWithArrayPidAndVid = useCallback(
    (data: TConfigPidVid[]): TConfigItem => {
      const key: string = data
        .reduce<any>((pre: string, cur: TConfigPidVid): string => {
          return `${pre}|${cur.Pid}_${cur.Vid}`
        }, '')
        .substring(1)
      return mapConfigurator[key]
    },
    [mapConfigurator],
  )

  return {
    listAttributes,
    mapConfigurator,
    ConfiguredItems,
    getPriceOfItem,
    getAttributeWithPidAndVid,
    getItemWithArrayPidAndVid,
    getPromoPriceOfItem,
  }
}

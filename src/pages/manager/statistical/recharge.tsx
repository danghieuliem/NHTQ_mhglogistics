import { TablePaginationConfig } from 'antd'
import router from 'next/router'
import { useCallback, useState } from 'react'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { reportAdminSendUserWallet, reportWithdraw } from '~/api'
import {
  Layout,
  StatisticalRechargeChart,
  StatisticalRechargeFilter,
  StatisticalRechargeTable,
  StatisticalWithdrawTable,
} from '~/components'
import { breadcrumb, defaultPagination } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import { TNextPageWithLayout } from '~/types/layout'

const Index: TNextPageWithLayout = () => {
  const [username, setUsername] = useState<string>(null)
  const [bankId, setBankId] = useState<number>(null)
  const [fromDate, setFromDate] = useState<string>(null)
  const [toDate, setToDate] = useState<string>(null)
  const [totalRecharge, setTotalRecharge] = useState<number>(null)
  const [totalWithdraw, setTotalWithdraw] = useState<number>(null)

  const handleFilter = (
    username: string,
    bankId: number,
    fromDate: string,
    toDate: string,
  ) => {
    setUsername(username)
    setBankId(bankId)
    setFromDate(fromDate)
    setToDate(toDate)
  }
  const [rechargePagination, setRechargePagination] =
    useState<TablePaginationConfig>(defaultPagination)
  const [withdrawPagination, setWithdrawPagination] =
    useState<TablePaginationConfig>(defaultPagination)

  const { data: usertRechargeReportData, isFetching: isFetchingRecharge } =
    useQuery(
      [
        'clientRechargeReportData',
        {
          Current: rechargePagination.current,
          PageSize: rechargePagination.pageSize,
          username,
          bankId,
          fromDate,
          toDate,
        },
      ],
      () =>
        reportAdminSendUserWallet
          .getList({
            PageIndex: rechargePagination.current,
            PageSize: rechargePagination.pageSize,
            OrderBy: 'Id desc',
            FromDate: fromDate,
            ToDate: toDate,
            SearchContent: username,
            BankId: bankId,
          })
          .then((res) => res.Data),
      {
        onSuccess: (data) => {
          setRechargePagination({
            ...rechargePagination,
            total: data?.TotalItem,
          })
          setTotalRecharge(data?.Items[0]?.TotalAmount)
        },
        onError: (error) =>
          toast.error((error as any)?.response?.data?.ResultMessage),
      },
    )

  const { data: userWithDrawReportData, isFetching: isFetchingWithdraw } =
    useQuery(
      [
        'clientWithDrawReportData',
        {
          Current: withdrawPagination.current,
          PageSize: withdrawPagination.pageSize,
          fromDate,
          toDate,
        },
      ],
      () =>
        reportWithdraw
          .getList({
            PageIndex: withdrawPagination.current,
            PageSize: withdrawPagination.pageSize,
            OrderBy: 'Id desc',
            FromDate: fromDate,
            ToDate: toDate,
            SearchContent: username,
          })
          .then((res) => res.Data),
      {
        onSuccess: (data) => {
          setWithdrawPagination({
            ...withdrawPagination,
            total: data?.TotalItem,
          })
          setTotalWithdraw(data?.Items[0]?.TotalAmount)
        },
        onError: (error) =>
          toast.error((error as any)?.response?.data?.ResultMessage),
      },
    )

  const handleExportExcelRecharge = useCallback(async () => {
    const id = toast.loading('Đang xử lý ...')
    let newFilter = {
      PageIndex: rechargePagination.current,
      PageSize: 20,
      FromDate: fromDate,
      ToDate: toDate,
      SearchContent: username,
      BankId: bankId,
    }

    if (fromDate || toDate || username || bankId) {
      newFilter = {
        ...newFilter,
        PageSize: 9999,
      }
    }

    try {
      const res = await reportAdminSendUserWallet.exportExcel(newFilter)
      router.push(`${res.Data}`)
    } catch (error) {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'error',
        render: (error as any)?.response?.data?.ResultMessage,
      })
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'default',
      })
    }
  }, [fromDate, toDate, username, bankId])

  const handleExportExcelWithDraw = useCallback(async () => {
    const id = toast.loading('Đang xử lý ...')
    let newFilter = {
      PageIndex: rechargePagination.current,
      PageSize: 20,
      FromDate: fromDate,
      ToDate: toDate,
      SearchContent: username,
      BankId: bankId,
    }

    if (fromDate || toDate || username || bankId) {
      newFilter = {
        ...newFilter,
        PageSize: 9999,
      }
    }

    try {
      const res = await reportWithdraw.exportExcel(newFilter)
      router.push(`${res.Data}`)
    } catch (error) {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'error',
        render: (error as any)?.response?.data?.ResultMessage,
      })
    } finally {
      toast.update(id, {
        isLoading: false,
        autoClose: 1,
        type: 'default',
      })
    }
  }, [fromDate, toDate, username, bankId])

  return (
    <div className=''>
      <div className='mb-4 grid grid-cols-1 gap-4 md:grid-cols-12'>
        <div className='tableBox h-fit md:col-span-3'>
          <StatisticalRechargeFilter handleFilter={handleFilter} />
        </div>
        <div className='tableBox hidden md:col-span-9 md:block'>
          <StatisticalRechargeChart
            dataChart={{ totalRecharge, totalWithdraw }}
          />
        </div>
      </div>
      <div className='mb-4'>
        <StatisticalRechargeTable
          data={usertRechargeReportData?.Items}
          loading={isFetchingRecharge}
          pagination={rechargePagination}
          handlePagination={setRechargePagination}
          handleExportExcelRecharge={handleExportExcelRecharge}
        />
      </div>

      <div className='mb-4'>
        <StatisticalWithdrawTable
          data={userWithDrawReportData?.Items}
          loading={isFetchingWithdraw}
          pagination={withdrawPagination}
          handlePagination={setWithdrawPagination}
          handleExportExcelWithDraw={handleExportExcelWithDraw}
        />
      </div>
    </div>
  )
}

Index.displayName = SEOConfigs.statistical.depositMoney
Index.breadcrumb = breadcrumb.statistical.recharge
Index.Layout = Layout

export default Index

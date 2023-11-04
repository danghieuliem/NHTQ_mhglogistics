import { Modal, Space, Tabs } from 'antd'
import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { shipping, warehouseFrom, warehouseTo } from '~/api'
import {
  ActionButton,
  Button,
  DataTable,
  FormCard,
  FormInput,
  FormSelect,
  FormSwitch,
  IconButton,
  Layout,
} from '~/components'
import TagStatus from '~/components/screens/status/TagStatus'
import { breadcrumb } from '~/configs'
import { SEOConfigs } from '~/configs/SEOConfigs'
import type { TNextPageWithLayout } from '~/types/layout'
import { TColumnsType } from '~/types/table'
import { _format } from '~/utils'

type TCreateMethods = {
  Name: string
}

const AddNewWareHouseForm = ({ onCancel, visible, refetchFrom, refetchTo }) => {
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset } = useForm<TCreateWareHouse>({
    defaultValues: {
      Name: '',
      Address: '',
      IsChina: 1,
    },
  })

  useEffect(() => {
    reset({
      Name: '',
      Address: '',
      IsChina: 1,
    })
  }, [visible])

  const _onAddNew = async (data: TCreateWareHouse) => {
    const newData = { ...data, IsChina: Boolean(data.IsChina) }
    const id = toast.loading('Đang xử lý ...')
    if (data.IsChina) {
      warehouseFrom
        .create(newData)
        .then(() => {
          queryClient.invalidateQueries(['warehouseTQCatalogue'])
          toast.update(id, {
            render: 'Thêm kho thành công!',
            type: 'success',
            isLoading: false,
            autoClose: 500,
          })
          refetchFrom()
        })
        .catch((error) => {
          toast.update(id, {
            render: (error as any)?.response?.data?.ResultMessage,
            type: 'error',
            isLoading: false,
            autoClose: 1000,
          })
        })
      onCancel()
    } else {
      warehouseTo
        .create(newData)
        .then(() => {
          queryClient.invalidateQueries(['warehouseVNCatalogue'])
          toast.update(id, {
            render: 'Thêm kho thành công!',
            type: 'success',
            isLoading: false,
            autoClose: 500,
          })
          refetchTo()
        })
        .catch((error) => {
          toast.update(id, {
            render: (error as any)?.response?.data?.ResultMessage,
            type: 'error',
            isLoading: false,
            autoClose: 1000,
          })
        })
      onCancel()
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      closable={false}
      footer={false}
    >
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thêm kho</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <FormInput
            label='Tên kho'
            control={control}
            name={'Name'}
            placeholder={'Nhập tên kho'}
            inputContainerClassName='mb-2'
            rules={{ required: 'Vui lòng nhập tên kho!' }}
          />
          <FormInput
            label='Địa chỉ kho'
            control={control}
            name={'Address'}
            placeholder={'Nhập địa chỉ kho'}
            inputContainerClassName='mb-2'
            rules={{ required: 'Vui lòng nhập đia chỉ kho!' }}
          />
          <FormSelect
            label='Kho ở đâu?'
            data={[
              { Name: 'Trung Quốc', Id: 1 },
              { Name: 'Việt Nam', Id: 0 },
            ]}
            select={{ label: 'Name', value: 'Id' }}
            control={control}
            name={'IsChina'}
            placeholder={'Chọn nơi đặt kho!'}
            rules={{ required: 'Vui lòng chọn nơi đặt kho!' }}
          />
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Thêm mới'
            btnClass='!bg-main mr-2'
            onClick={handleSubmit(_onAddNew)}
          />
          <Button
            title='Hủy'
            btnClass='!bg-red'
            onClick={() => {
              onCancel()
            }}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

const AddNewMethod = ({ onCancel, visible, refetchMethod }) => {
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset } = useForm<TCreateMethods>({
    defaultValues: {
      Name: '',
    },
  })

  const _onAddNew = async (data: TCreateMethods) => {
    onCancel()
    const id = toast.loading('Đang xử lý ...')
    try {
      shipping.create(data).then(() => {
        queryClient.invalidateQueries(['shippingTypeToWarehouseCatalogue'])

        toast.update(id, {
          render: 'Thêm phương thức thành công!',
          type: 'success',
          isLoading: false,
          autoClose: 500,
        })
        refetchMethod()
        reset()
      })
    } catch (error) {
      toast.update(id, {
        render: 'Thêm phương thức thất bại!',
        type: 'error',
        isLoading: false,
        autoClose: 1000,
      })
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      closable={false}
      footer={false}
    >
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thêm phương thức vận chuyển</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <FormInput
            label='Tên phương thức vận chuyển'
            control={control}
            name={'Name'}
            placeholder={'Tên phương thức vận chuyển'}
            rules={{ required: 'Vui lòng nhập tên phương thức vận chuyển!' }}
          />
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Thêm'
            btnClass='!bg-main mr-2'
            onClick={handleSubmit(_onAddNew)}
          />
          <Button
            title='Hủy'
            btnClass='!bg-red'
            onClick={() => {
              onCancel()
            }}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

const EditComponent = ({
  onCancel,
  visible,
  defaultValues,
  refetchFrom,
  refetchTo,
  refetchMethod,
}) => {
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset } = useForm<TCreateWareHouse>({
    mode: 'onBlur',
    defaultValues: defaultValues,
  })

  const _onSubmit = (data) => {
    const id = toast.loading('Đang xử lý ...')
    if (!defaultValues?.IsWareHouse) {
      delete data.IsWareHouse
      shipping
        .update(data)
        .then(() => {
          queryClient.invalidateQueries(['shippingTypeToWarehouseCatalogue'])

          refetchMethod()
          toast.update(id, {
            render: 'Cập nhật thành công!',
            type: 'success',
            isLoading: false,
            autoClose: 500,
          })
        })
        .catch((error) =>
          toast.update(id, {
            render: 'Cập nhật thất bại!',
            type: 'error',
            isLoading: false,
            autoClose: 1000,
          }),
        )
      onCancel()
      return
    }
    delete data.IsWareHouse

    if (defaultValues?.IsChina) {
      warehouseFrom
        .update(data)
        .then(() => {
          refetchFrom()
          queryClient.invalidateQueries(['warehouseTQCatalogue'])
          toast.update(id, {
            render: 'Cập nhật thành công!',
            type: 'success',
            isLoading: false,
            autoClose: 500,
          })
        })
        .catch((error) => {
          queryClient.invalidateQueries(['warehouseVNCatalogue'])

          toast.update(id, {
            render: 'Cập nhật thất bại!',
            type: 'error',
            isLoading: false,
            autoClose: 1000,
          })
        })
      onCancel()
      return
    }

    if (!defaultValues?.IsChina) {
      warehouseTo
        .update(data)
        .then(() => {
          refetchTo()
          toast.update(id, {
            render: 'Cập nhật thành công!',
            type: 'success',
            isLoading: false,
            autoClose: 500,
          })
        })
        .catch((error) =>
          toast.update(id, {
            render: 'Cập nhật thất bại!',
            type: 'error',
            isLoading: false,
            autoClose: 1000,
          }),
        )
      onCancel()
      return
    }
  }

  return (
    <Modal
      onCancel={onCancel}
      visible={visible}
      closable={false}
      footer={false}
    >
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Cập nhật</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          {defaultValues?.IsWareHouse ? (
            <>
              <FormInput
                label='Tên kho'
                control={control}
                name={'Name'}
                placeholder={'Nhập tên kho'}
                inputContainerClassName='mb-2'
                rules={{ required: 'Vui lòng nhập tên kho!' }}
              />
              <FormInput
                label='Địa chỉ kho'
                control={control}
                name={'Address'}
                placeholder={'Nhập địa chỉ kho'}
                inputContainerClassName='mb-2'
                rules={{ required: 'Vui lòng nhập đia chỉ kho!' }}
              />
              <FormSwitch control={control} name='Active' label='Active' />
            </>
          ) : (
            <>
              <FormInput
                label='Tên phương thức vận chuyển'
                control={control}
                name={'Name'}
                placeholder={'Tên phương thức vận chuyển'}
                rules={{
                  required: 'Vui lòng nhập tên phương thức vận chuyển!',
                }}
              />
              <FormSwitch control={control} name='Active' label='Active' />
            </>
          )}
        </FormCard.Body>
        <FormCard.Footer>
          <Button
            title='Cập nhật'
            btnClass='!bg-main mr-2'
            onClick={handleSubmit(_onSubmit)}
          />
          <Button
            title='Hủy'
            btnClass='!bg-red'
            onClick={() => {
              onCancel()
            }}
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

const AddNewWareHouseFormMemo = React.memo(AddNewWareHouseForm)
const AddNewMethodMemo = React.memo(AddNewMethod)
const EditComponentMemo = React.memo(EditComponent)

const Index: TNextPageWithLayout = () => {
  const [modalWarehouse, setModalWarehouse] = useState(false)
  const [modalMethod, setModalMethod] = useState(false)
  const [modalEdit, setModalEdit] = useState(false)
  const item = useRef(null)

  const { refetch: refetchFrom, data: warehouseFromData } = useQuery(
    ['warehouseFromData'],
    () => warehouseFrom.getList().then((res) => res.Data.Items),
  )

  const { refetch: refetchTo, data: warehouseToData } = useQuery(
    ['warehouseToData'],
    () => warehouseTo.getList().then((res) => res.Data.Items),
  )

  const { refetch: refetchMethod, data: shippingType } = useQuery(
    ['shippingType'],
    () =>
      shipping
        .getList({
          PageSize: 20,
          PageIndex: 1,
        })
        .then((res) => res.Data.Items),
    {
      retry: false,
    },
  )

  const columnsWarehouse: TColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'Id',
      responsive: ['lg'],
      align: 'right',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'Created',
      responsive: ['lg'],
      render: (date) => _format.getVNDate(date, 'DD/MM/YYYY - HH:mm:A'),
    },
    {
      title: 'Tên kho',
      dataIndex: 'Name',
    },
    {
      dataIndex: 'Address',
      title: 'Địa chỉ',
      responsive: ['sm'],
    },
    {
      dataIndex: 'Active',
      title: 'Trạng thái',
      render(value, record, index) {
        return (
          <TagStatus
            color={value ? 'blue' : 'red'}
            statusName={value ? 'Hiện' : 'Ẩn'}
          />
        )
      },
    },
    {
      title: () => <>Nhân viên cập nhật</>,
      dataIndex: 'UpdatedBy',
      responsive: ['sm'],
    },
    {
      title: 'Cập nhật mới nhất',
      dataIndex: 'Updated',
      responsive: ['lg'],
      render: (date) => {
        return date ? _format.getVNDate(date, 'DD/MM/YYYY - HH:mm:A') : '---'
      },
    },
    {
      align: 'right',
      title: 'Thao tác',
      dataIndex: 'action',
      responsive: ['sm'],
      render: (_, record) => {
        return (
          <Space>
            {/* <ActionButton
              onClick={() =>
                Modal.confirm({
                  title: "Xác nhận ẩn kho này?",
                  content: <div>Ẩn kho sẽ không sử dụng được kho này nữa.</div>,
                  onOk: () => {
                    if (record?.IsChina) {
                      warehouseFrom.update({...record, Active: false}).then(() => {
                        toast.success("Ẩn kho thành công");
                        refetchFrom();
                      });
                    } else {
                      warehouseTo.update({...record, Active: false}).then(() => {
                        toast.success("Ẩn kho thành công");
                        refetchTo();
                      });
                    }
                  },
                })
              }
              icon="fas fa-eye-slash"
              title="Ẩn kho"
            /> */}
            <ActionButton
              onClick={() => {
                item.current = { ...record, IsWareHouse: true }
                setModalEdit(true)
              }}
              title='Cập nhật kho'
              icon='fas fa-edit'
            />
          </Space>
        )
      },
    },
  ]

  const columnsMethod: TColumnsType<any> = [
    {
      title: 'ID',
      dataIndex: 'Id',
      responsive: ['md'],
      align: 'right',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'Created',
      render: (date) => _format.getVNDate(date, 'DD/MM/YYYY - HH:mm:A'),
    },
    {
      title: 'Phương thức vận chuyển',
      dataIndex: 'Name',
    },
    {
      dataIndex: 'Active',
      title: 'Trạng thái',
      render(value, record, index) {
        return (
          <TagStatus
            color={value ? 'blue' : 'red'}
            statusName={value ? 'Hiện' : 'Ẩn'}
          />
        )
      },
    },
    {
      title: 'Cập nhật mới nhất',
      dataIndex: 'Updated',
      render: (date) => {
        return date ? _format.getVNDate(date, 'DD/MM/YYYY - HH:mm:A') : '---'
      },
    },
    {
      title: () => <>Nhân viên cập nhật</>,
      dataIndex: 'UpdatedBy',
    },
    {
      align: 'right',
      title: 'Thao tác',
      dataIndex: 'action',
      render: (_, record) => {
        return (
          <Space>
            {/* <ActionButton
              onClick={() =>
                Modal.confirm({
                  title: "Xác nhận phương thức này?",
                  onOk: () => {
                    shipping.delete(record.Id).then(() => {
                      refetchMethod();
                      toast.success("Xóa phương thức thành công!");
                    });
                  },
                })
              }
              icon="fas fa-trash"
              title="Xóa"
            /> */}
            <ActionButton
              onClick={() => {
                item.current = { ...record, IsWareHouse: false }
                setModalEdit(true)
              }}
              title='Cập nhật phương thức'
              icon='fas fa-edit'
            />
          </Space>
        )
      },
    },
  ]

  return (
    <>
      <Tabs
        tabBarExtraContent={
          <div className=''>
            <IconButton
              onClick={() => setModalWarehouse(!modalWarehouse)}
              title='Thêm kho'
              icon='fas fa-plus-circle'
              showLoading
              btnClass='!mr-4'
              toolip='Thêm Kho'
              green
            />
            <IconButton
              onClick={() => setModalMethod(!modalMethod)}
              title='Thêm phương thức'
              icon='fas fa-plus-circle'
              showLoading
              toolip='Thêm Kho'
              green
            />
          </div>
        }
      >
        <Tabs.TabPane key='1' tab={'Kho Trung Quốc'}>
          <DataTable
            rowKey={'Id'}
            key={'1'}
            columns={columnsWarehouse as any}
            data={warehouseFromData}
            pagination={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key='2' tab={'Kho Việt Nam'}>
          <DataTable
            rowKey={'Id'}
            key={'2'}
            columns={columnsWarehouse as any}
            data={warehouseToData}
            pagination={false}
          />
        </Tabs.TabPane>
        <Tabs.TabPane key='3' tab={'Phương thức vận chuyển'}>
          <DataTable
            rowKey={'Id'}
            key={'3'}
            columns={columnsMethod as any}
            data={shippingType}
            pagination={false}
          />
        </Tabs.TabPane>
      </Tabs>
      {modalWarehouse && (
        <AddNewWareHouseFormMemo
          onCancel={() => setModalWarehouse(false)}
          visible={modalWarehouse}
          refetchFrom={refetchFrom}
          refetchTo={refetchTo}
        />
      )}
      {modalMethod && (
        <AddNewMethodMemo
          onCancel={() => setModalMethod(false)}
          visible={modalMethod}
          refetchMethod={refetchMethod}
        />
      )}
      {item.current && (
        <EditComponentMemo
          onCancel={() => {
            item.current = null
            setModalEdit(false)
          }}
          visible={modalEdit}
          defaultValues={item.current}
          refetchFrom={refetchFrom}
          refetchTo={refetchTo}
          refetchMethod={refetchMethod}
        />
      )}
    </>
  )
}
Index.displayName = SEOConfigs?.settings.wareHouse
Index.breadcrumb = breadcrumb.settings.wareHouse
Index.Layout = Layout

export default Index

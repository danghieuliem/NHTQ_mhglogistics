import React, { Children, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useQuery, useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { Page, menu } from '~/api'
import {
  FormCard,
  FormInput,
  FormInputNumber,
  FormSelect,
  FormSwitch,
  Modal,
} from '~/components'
import { IconButton } from '~/components/globals/button/IconButton'

const templates = [
  { name: 'Trong hệ thống', id: 1 },
  { name: 'Khác', id: 0 },
]

const ArticalListComp = ({ control, watch, setValue, categogyList }) => {
  const { data, isFetching } = useQuery(
    [
      'Page',
      {
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: 'PageTypeId',
        PageTypeId: watch().PageTypeId,
      },
    ],
    () =>
      Page.getList({
        PageIndex: 1,
        PageSize: 99999,
        OrderBy: 'PageTypeId',
        PageTypeId: watch().PageTypeId,
      }).then((res) => res?.Data),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        return data?.Items
      },
      onError: (error) => {
        toast.error((error as any)?.response?.data?.ResultMessage)
      },
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  )
  return (
    <>
      <div className='col-span-1'>
        <FormSelect
          control={control}
          label='Danh sách bài viết'
          placeholder='Chọn bài viết'
          name='PageId'
          data={data?.Items}
          select={{ label: 'Title', value: 'Id' }}
          required={false}
          isClearable
          disabled={!watch().IsEdit}
          callback={() => {
            if (watch().PageId) {
              setValue(
                'Link',
                data?.Items.find((x) => x.Id === watch().PageId)?.Code,
              )
            } else {
              setValue(
                'Link',
                categogyList.find((x) => x.Id === watch().PageTypeId)?.Code,
              )
            }
          }}
          defaultValue={
            watch().PageId && {
              Title: data?.Items.find((x) => x.Id === watch().PageId)?.Title,
              Id: watch().PageId,
            }
          }
        />
      </div>
      <div className='col-span-1'>
        <FormInput
          control={control}
          name='Link'
          placeholder=''
          label='Link bài viết'
          disabled={!!watch().IsEdit}
        />
      </div>
    </>
  )
}

const CategoryListComp = ({ control, watch, categogyList, setValue }) => {
  // console.log(dataMenuList, watch().PageTypeId);

  return (
    <>
      <div className='col-span-1'>
        <FormSelect
          control={control}
          label='Chuyên mục'
          placeholder='Chọn chuyên mục'
          name='PageTypeId'
          data={categogyList}
          select={{ label: 'Name', value: 'Id' }}
          disabled={!watch().IsEdit}
          rules={{
            required: watch().IsEdit ? 'This field is required' : false,
          }}
          defaultValue={
            watch().PageTypeId && {
              Name: categogyList.find((x) => x.Id === watch().PageTypeId)?.Name,
              Id: watch().PageTypeId,
            }
          }
          callback={() => {
            setValue(
              'Link',
              categogyList.find((x) => x.Id === watch().PageTypeId)?.Code,
            )
          }}
        />
      </div>
      <ArticalListComp
        control={control}
        watch={watch}
        setValue={setValue}
        categogyList={categogyList}
      />
    </>
  )
}

const AddChildContentForm: React.FC<any> = ({
  child,
  onCancel,
  categogyList,
}) => {
  // const [data, setData] = useState<any>();

  const { control, handleSubmit, setValue, reset, watch } = useForm<{
    Name: string
    Link: string
    Active: boolean
    Position: number
    PageTypeId?: number
    PageId?: number
    IsEdit?: number
    Parent: number
  }>({
    mode: 'onBlur',
    defaultValues: {
      ...child,
      IsEdit: child?.PageTypeId ? 1 : 0,
    },
  })

  const queryClient = useQueryClient()

  useEffect(() => {
    reset({
      ...child,
      IsEdit: child?.PageTypeId ? 1 : 0,
    })
  }, [child?.Id])

  useEffect(() => {
    reset({
      Parent: child,
      Name: watch().Name,
      Link: watch().Link,
      Active: watch().Active,
      Position: watch().Position,
      PageTypeId: watch().PageTypeId,
      PageId: null,
      IsEdit: watch().IsEdit,
    })
  }, [watch().PageTypeId])

  const _onPress = (newData: {
    Name: string
    Link: string
    Active: boolean
    Position: number
    PageTypeId?: number
    PageId?: number
    IsEdit?: number
    Parent: number
  }) => {
    const sendData = { ...newData }

    if (!sendData?.IsEdit) {
      delete sendData?.PageId
      delete sendData?.PageTypeId
    }
    delete sendData?.IsEdit

    onCancel()
    const id = toast.loading('Đang xử lý ...')
    menu
      .create(sendData)
      .then(() => {
        queryClient.invalidateQueries('menuData')
        toast.update(id, {
          render: 'Tạo menu mới thành công',
          type: 'success',
          isLoading: false,
          autoClose: 500,
        })
      })
      .catch((error) => {
        toast.update(id, {
          render: (error as any)?.response?.data?.ResultMessage,
          type: 'error',
          isLoading: false,
          autoClose: 1000,
        })
      })
  }

  return (
    <Modal visible={!!child} width={1000}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className='w-full'>
            <p>Thêm menu con</p>
          </div>
        </FormCard.Header>
        <FormCard.Body>
          <div className={`grid gap-4 md:grid-cols-2`}>
            <div className='grid h-fit gap-4'>
              <FormInput
                control={control}
                name='Name'
                label='Tên menu con'
                placeholder={''}
                rules={{ required: 'Vui lòng điền thông tin' }}
              />
              <FormInputNumber
                control={control}
                name='Position'
                label='Vị trí menu con'
                placeholder=''
                rules={{ required: 'Vui lòng điền vị trí hiển thị' }}
              />
              <div className='grid gap-4 xs:grid-cols-3'>
                <div className='xs:col-span-2'>
                  <FormSelect
                    name='IsEdit'
                    control={control}
                    label='Bài viết trong hệ thống?'
                    data={templates}
                    select={{ label: 'name', value: 'id' }}
                    placeholder={''}
                    required={false}
                    defaultValue={{
                      name: templates?.find((x) => x.id === watch().IsEdit)
                        ?.name,
                      id: watch().IsEdit,
                    }}
                  />
                </div>
                <div className='xs:col-span-1'>
                  <FormSwitch
                    control={control}
                    name='Active'
                    label='Trạng thái'
                    required={false}
                  />
                </div>
              </div>
            </div>

            <div className='col-span-1 grid h-fit grid-cols-1 gap-3'>
              <CategoryListComp
                control={control}
                watch={watch}
                categogyList={categogyList}
                setValue={setValue}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <IconButton
            onClick={handleSubmit(_onPress)}
            icon='fas fa-edit'
            btnIconClass='!mr-2'
            title='Thêm mới'
            showLoading
            toolip=''
          />
        </FormCard.Footer>
      </FormCard>
    </Modal>
  )
}

export const AddChildContentFormMemo = React.memo(AddChildContentForm)

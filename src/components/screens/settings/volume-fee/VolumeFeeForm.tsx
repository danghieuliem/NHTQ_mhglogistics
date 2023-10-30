import React, { FC, useRef } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { feeVolume } from "~/api";
import {
  Button,
  FormCard,
  FormInputNumber,
  FormSelect,
  Modal,
} from "~/components";
import { toast } from "~/components/toast";
import { categoryData } from "~/configs/appConfigs";
import { useCatalogue } from "~/hooks";
import { TForm } from "~/types/table";
import { _format } from "~/utils";

const AddNew = ({ wareHouseFrom, wareHouse, shippingType, onCancel }) => {
  const { handleSubmit, reset, control } = useForm<TVolumeFee>({
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(feeVolume.create, {
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries("feeVolumeData");
      onCancel();
      toast.success("Tạo thành công");
    },
    onError: toast.error,
  });

  const _onPress = (data: TVolumeFee) => {
    toast.info("Đang tạo, đợi tý ...");
    mutationUpdate.mutateAsync(data);
  };

  return (
    <>
      <FormCard.Body>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
          <div className="col-span-3">
            <FormSelect
              data={wareHouseFrom}
              control={control}
              name="WarehouseFromId"
              placeholder="Chọn kho Trung Quốc"
              label="Kho Trung Quốc"
              select={{ label: "Name", value: "Id" }}
              rules={{ required: "Vui lòng chọn kho TQ!" }}
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              data={wareHouse}
              control={control}
              name="WarehouseId"
              placeholder="Chọn kho Việt Nam"
              label="Kho Việt Nam"
              select={{ label: "Name", value: "Id" }}
              rules={{ required: "Vui lòng chọn kho VN!" }}
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              control={control}
              name="ShippingTypeToWareHouseId"
              data={shippingType}
              select={{ label: "Name", value: "Id" }}
              label="Hình thức vận chuyển"
              placeholder="Chọn hình thức vận chuyển"
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              control={control}
              name="IsHelpMoving"
              data={categoryData}
              select={{ label: "Name", value: "Id" }}
              label="Loại đơn hàng"
              placeholder="Chọn loại đơn hàng"
              rules={{
                validate: (val) =>
                  typeof val === "boolean" || "This is required field",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="VolumeFrom"
              label="Thể tích từ"
              placeholder="Thể tích từ"
              rules={{
                required: "Không bỏ trống thể tích từ",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="VolumeTo"
              label="Thể tích đến"
              placeholder="Thể tích đến"
              rules={{
                required: "Không bỏ trống thể tích đến",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="Price"
              label="Phí"
              placeholder="Phí"
              suffix=" VNĐ"
              rules={{
                required: "Không bỏ trống phí",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
        </div>
      </FormCard.Body>
      <FormCard.Footer>
        <Button
          title="Cập nhật"
          btnClass="!bg-main mr-2"
          onClick={handleSubmit(_onPress)}
        />
        <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
      </FormCard.Footer>
    </>
  );
};

const Update = ({
  wareHouseFrom,
  wareHouse,
  shippingType,
  idTarget,
  data,
  onCancel,
}) => {
  const defaultValue = data.find((item) => item.Id === idTarget);

  const changeName = useRef({
    nameWareHouseTo: null,
    nameWareHouseFrom: null,
    nameShippingTypeToWareHouseName: null,
    nameHelpMovingName: null,
  });

  const { handleSubmit, reset, control } = useForm<TVolumeFee>({
    defaultValues: defaultValue,
    mode: "onBlur",
  });

  const queryClient = useQueryClient();
  const mutationUpdate = useMutation(feeVolume.update, {
    onSuccess: async (_, variables) => {
      queryClient.invalidateQueries("feeVolumeData");
      onCancel();
      toast.success("Cập nhật thành công");
    },
    onError: toast.error,
  });

  const _onPress = (data: TVolumeFee) => {
    const newData = {
      ...data,
      WareHouseFromName: changeName.current.nameWareHouseFrom,
      WareHouseToName: changeName.current.nameWareHouseTo,
      HelpMovingName: changeName.current.nameHelpMovingName,
      ShippingTypeToWareHouseName:
        changeName.current.nameShippingTypeToWareHouseName,
    };
    toast.info("Đang cập nhật, đợi tý ...");
    mutationUpdate.mutateAsync(newData);
  };

  return (
    <>
      <FormCard.Body>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          <div className="col-span-3">
            <FormSelect
              data={wareHouseFrom}
              control={control}
              name="WarehouseFromId"
              placeholder="Chọn kho Trung Quốc"
              label="Kho Trung Quốc"
              select={{ label: "Name", value: "Id" }}
              defaultValue={{
                Name: defaultValue?.WareHouseFromName,
                Id: defaultValue?.WarehouseFromId,
              }}
              callback={(val) => {
                changeName.current.nameWareHouseFrom = wareHouseFrom.find(
                  (item) => item.Id === val
                )?.Name;
              }}
              rules={{ required: "Vui lòng chọn kho TQ!" }}
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              data={wareHouse}
              control={control}
              name="WarehouseId"
              placeholder="Chọn kho Việt Nam"
              label="Kho Việt Nam"
              defaultValue={{
                Name: defaultValue?.WareHouseToName,
                Id: defaultValue?.WarehouseId,
              }}
              callback={(val) => {
                changeName.current.nameWareHouseTo = wareHouse.find(
                  (item) => item.Id === val
                )?.Name;
              }}
              select={{ label: "Name", value: "Id" }}
              rules={{ required: "Vui lòng chọn kho VN!" }}
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              control={control}
              name="ShippingTypeToWareHouseId"
              data={shippingType}
              select={{ label: "Name", value: "Id" }}
              label="Hình thức vận chuyển"
              defaultValue={{
                Name: defaultValue?.ShippingTypeToWareHouseName,
                Id: defaultValue?.ShippingTypeToWareHouseId,
              }}
              callback={(val) => {
                changeName.current.nameShippingTypeToWareHouseName =
                  shippingType.find((item) => item.Id === val)?.Name;
              }}
              placeholder="Chọn hình thức vận chuyển"
            />
          </div>
          <div className="col-span-3">
            <FormSelect
              control={control}
              name="IsHelpMoving"
              data={categoryData}
              select={{ label: "Name", value: "Id" }}
              label="Loại đơn hàng"
              defaultValue={{
                Name: defaultValue.HelpMovingName,
                Id: defaultValue.IsHelpMoving,
              }}
              callback={(val) => {
                changeName.current.nameHelpMovingName = categoryData.find(
                  (item) => item.Id === !!val
                )?.Name;
              }}
              placeholder="Chọn loại đơn hàng"
              rules={{
                validate: (val) =>
                  typeof val === "boolean" || "This is required field",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="VolumeFrom"
              label="Thể tích từ"
              placeholder="Thể tích từ"
              rules={{
                required: "Không bỏ trống Thể tích từ",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="VolumeTo"
              label="Thể tích đến"
              placeholder="Thể tích đến"
              rules={{
                required: "Không bỏ trống Thể tích đến",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
          <div className="col-span-full sm:col-span-2">
            <FormInputNumber
              control={control}
              name="Price"
              label="Phí"
              placeholder="Phí"
              suffix=" VNĐ"
              rules={{
                required: "Không bỏ trống phí",
                validate: (val: number) =>
                  _format.isNumber(val.toString()) || "Không đúng định dạng số",
              }}
            />
          </div>
        </div>
      </FormCard.Body>
      <FormCard.Footer>
        <Button
          title="Cập nhật"
          btnClass="!bg-main mr-2"
          onClick={handleSubmit(_onPress)}
        />
        <Button title="Hủy" btnClass="!bg-red" onClick={onCancel} />
      </FormCard.Footer>
    </>
  );
};

const AddNewMemo = React.memo(AddNew);
const UpdateMemo = React.memo(Update);

const VolumeFeeForm: FC<
  TForm<TVolumeFee> & {
    refetch: () => void;
    type: string;
    idTarget?: number;
    defaultValues?: any;
  }
> = ({ onCancel, defaultValues, visible, refetch, type, title, idTarget }) => {
  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse } = useCatalogue({
    warehouseTQEnabled: true,
    warehouseVNEnabled: true,
    shippingTypeToVNEnabled: true,
  });

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <div className="w-full">
            <p>{title}</p>
          </div>
        </FormCard.Header>
        {type === "addNew" ? (
          <AddNewMemo
            wareHouse={warehouseVN}
            wareHouseFrom={warehouseTQ}
            shippingType={shippingTypeToWarehouse}
            onCancel={onCancel}
          />
        ) : (
          <UpdateMemo
            onCancel={onCancel}
            wareHouse={warehouseVN}
            wareHouseFrom={warehouseTQ}
            shippingType={shippingTypeToWarehouse}
            idTarget={idTarget}
            data={defaultValues}
          />
        )}
      </FormCard>
    </Modal>
  );
};

export const VolumeFeeFormMemo = React.memo(VolumeFeeForm);

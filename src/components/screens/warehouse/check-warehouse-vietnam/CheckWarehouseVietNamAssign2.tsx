import React from "react";
import { useForm } from "react-hook-form";
import { Modal, FormCard, FormInput, Button, FormSelect } from "~/components";
import { useDeepEffect } from "~/hooks";
import { useCatalogue } from "~/hooks/useCatalogue";

type TProps = {
  visible: boolean;
  onCancel: () => void;
  item: TWarehouseVN;
  onPress: (data: (TWarehouseVN & Partial<TAddtionalFieldWarehouse>)[]) => void;
};

type TForm = TWarehouseVN & TAddtionalFieldWarehouse;

export const CheckWarehouseVietNamAssign2: React.FC<TProps> = ({
  onCancel,
  visible,
  item,
  onPress,
}) => {
  const { warehouseTQ, warehouseVN, shippingTypeToWarehouse, client } =
    useCatalogue({
      warehouseTQEnabled: true,
      warehouseVNEnabled: true,
      clientEnabled: true,
      shippingTypeToWarehouseEnabled: true,
    });

  const { control, handleSubmit, reset } = useForm<TForm>();

  useDeepEffect(() => {
    if (
      item &&
      !!warehouseTQ?.length &&
      !!warehouseVN?.length &&
      !!shippingTypeToWarehouse?.length &&
      !!client?.length
    ) {
      reset({
        ...item,
        AssignUID: client?.[0]?.Id,
        WareHouseFromId: warehouseTQ?.[0]?.Id,
        WareHouseId: warehouseVN?.[0]?.Id,
        ShippingTypeId: shippingTypeToWarehouse?.[0]?.Id,
      });
    }
  }, [item, warehouseTQ, warehouseVN, shippingTypeToWarehouse, client]);

  return (
    <Modal visible={visible} onCancel={onCancel}>
      <FormCard>
        <FormCard.Header onCancel={onCancel}>
          <p>Thêm mã kiện mới</p>
        </FormCard.Header>
        <FormCard.Body>
          <div className="grid xs:grid-cols-2 gap-2">
            <div className="col-span-full">
              <FormInput
                control={control}
                name="OrderTransactionCode"
                label="Mã vận đơn"
                placeholder=""
                required={false}
                inputClassName="mb-4"
                disabled
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                name="AssignUID"
                label="Username"
                placeholder=""
                required={false}
                data={client}
                select={{
                  label: "UserName",
                  value: "Id",
                }}
                defaultValue={client?.[0]}
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                name="WareHouseFromId"
                label="Kho TQ"
                placeholder=""
                required={false}
                data={warehouseTQ}
                select={{
                  label: "Name",
                  value: "Id",
                }}
                defaultValue={warehouseTQ?.[0]}
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                data={warehouseVN}
                name="WareHouseId"
                label="Kho VN"
                placeholder=""
                required={false}
                select={{
                  label: "Name",
                  value: "Id",
                }}
                defaultValue={warehouseVN?.[0]}
              />
            </div>
            <div className="col-span-1">
              <FormSelect
                control={control}
                name="ShippingTypeId"
                label="Phương thức VC"
                placeholder=""
                required={false}
                data={shippingTypeToWarehouse}
                select={{
                  label: "Name",
                  value: "Id",
                }}
                defaultValue={shippingTypeToWarehouse?.[0]}
              />
            </div>
            <div className="col-span-full">
              <FormInput
                control={control}
                name="AssignNote"
                label="Ghi chú"
                placeholder=""
                required={false}
              />
            </div>
          </div>
        </FormCard.Body>
        <FormCard.Footer>
          <div className="space-x-2">
            <Button
              title="Thêm"
              btnClass=" !bg-main min-w-[unset]"
              onClick={handleSubmit((data) =>
                onPress([{ ...data, IsAssign: true, AssignType: 2 }])
              )}
            />
            <Button
              title="Hủy"
              btnClass="!bg-active min-w-[unset]"
              onClick={onCancel}
            />
          </div>
        </FormCard.Footer>
      </FormCard>
    </Modal>
  );
};

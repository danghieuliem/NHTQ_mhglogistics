import clsx from "clsx";
import { FC } from "react";
import { FormSelect, IconButton } from "~/components";
import { useAppSelector } from "~/store";
import { TControl } from "~/types/field";

type TProps = TControl<TUserCreateOrder> & {
  warehouseTQCatalogue: TWarehouseTQCatalogue[];
  warehouseVNCatalogue: TWarehouseVNCatalogue[];
  shippingTypeToWarehouseCatalogue: TShippingTypeToWarehouse[];
  user?: any;
};
const infoContainer = "col-span-2";
const listBox = "flex items-center justify-end mt-4 w-full";

export const CreateOrderSelect: FC<TProps> = ({
  control,
  warehouseTQCatalogue,
  shippingTypeToWarehouseCatalogue,
  warehouseVNCatalogue,
  append,
  user,
}) => {
  const { current: newUser } = useAppSelector((state) => state.user);

  // if (!newUser) return null;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <div className={clsx(infoContainer)}>
          <div className="w-full">
            {!user ? (
              <div className="mt-2 xl:mt-0 w-full hidden lg:block">
                <FormSelect
                  data={user}
                  control={control}
                  name="UID"
                  placeholder=""
                  label="Username"
                  select={{ label: "UserName", value: "Id" }}
                  defaultValue={{
                    UserName: newUser?.UserName,
                    Id: newUser?.UserId,
                  }}
                  disabled
                  required={false}
                />
              </div>
            ) : (
              <div className="mt-2 xl:mt-0 w-full">
                <FormSelect
                  data={user}
                  label="Username"
                  control={control}
                  name="UID"
                  placeholder="Chọn khách hàng"
                  select={{ label: "UserName", value: "Id" }}
                  rules={{ required: "This field is required" }}
                />
              </div>
            )}
          </div>
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <FormSelect
              data={shippingTypeToWarehouseCatalogue}
              control={control}
              name="ShippingType"
              label="Phương thức vận chuyển"
              placeholder="Chọn phương thức vận chuyển"
              rules={{ required: "This field is required" }}
              select={{ label: "Name", value: "Id" }}
            />
          </div>
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <FormSelect
              data={warehouseTQCatalogue}
              control={control}
              name="WarehouseTQ"
              label="Kho Trung Quốc"
              placeholder="Chọn kho TQ"
              rules={{ required: "This field is required" }}
              select={{ label: "Name", value: "Id" }}
            />
          </div>
        </div>
        <div className={infoContainer}>
          <div className="w-full">
            <FormSelect
              data={warehouseVNCatalogue}
              control={control}
              name="WarehouseVN"
              label="Kho đích"
              placeholder="Chọn kho VN"
              rules={{ required: "This field is required" }}
              select={{ label: "Name", value: "Id" }}
            />
          </div>
        </div>
      </div>

      <div className={listBox}>
        <IconButton
          icon="far fa-plus"
          title="Thêm sản phẩm"
          onClick={() =>
            append({
              Id: new Date().getTime(),
              ImageProduct: null,
              LinkProduct: null,
              NameProduct: null,
              NoteProduct: null,
              PriceProduct: null,
              PropertyProduct: null,
              QuantityProduct: null,
            })
          }
          showLoading
          toolip=""
          green
        />
      </div>
    </>
  );
};

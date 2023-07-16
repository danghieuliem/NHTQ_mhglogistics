import { _format } from "~/utils";
import { CartOrderItem } from ".";

export const CartOrder = ({
  currentCart,
  note,
  setNote,
  toggleShopId,
  chosenShopIds,
  refetchCart,
  isFetching
}) => {
  return (
    <>
      {currentCart?.map((cart, index) => (
        <div className="cartNewWrapper-orders-items" key={`${index}-${cart?.ShopId}`}>
          <CartOrderItem
            cart={cart}
            note={note?.[cart?.Id]}
            handleNote={(key: number, value: string) =>
              setNote({ ...note, [key]: value })
            }
            isFetching={isFetching}
            toggleShopId={toggleShopId}
            checked={chosenShopIds.includes(cart?.Id)}
            refetchCart={refetchCart}
          />
        </div>
      ))}
    </>
  );
};

import { _format } from "~/utils";
import { CartOrderItem } from ".";

export const CartOrder = ({
  currentCart,
  note,
  setNote,
  toggleShopId,
  chosenShopIds,
  refetchCart,
}) => {
  return (
    <div className="cartOrderContainer">
      {currentCart?.map((cart, index) => (
        <div className="mb-4" key={`${index}-${cart?.ShopId}`}>
          <CartOrderItem
            cart={cart}
            note={note?.[cart?.Id]}
            handleNote={(key: number, value: string) =>
              setNote({ ...note, [key]: value })
            }
            toggleShopId={toggleShopId}
            checked={chosenShopIds.includes(cart?.Id)}
            refetchCart={refetchCart}
          />
        </div>
      ))}
    </div>
  );
};

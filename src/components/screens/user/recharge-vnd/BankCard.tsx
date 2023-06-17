import clsx from "clsx";

export const BankCard = ({ item, setSelectedBank, selectedBank }) => {

  return (
    <div
      key={item?.Id}
      className={clsx(
        "col-span-1 py-2 rounded-[4px] cursor-pointer transition-all duration-300",
        item?.Id === selectedBank?.Id && "shadow-xl bg-green text-white"
      )}
      onClick={() => {
        setSelectedBank(item);
      }}
      style={{
        border:
          item?.Id === selectedBank?.Id
            ? "1px solid transparent"
            : "1px solid #ececec",
      }}
    >
      <span className="flex items-center relative justify-evenly">
        <span className="block w-[26%] rounded-md overflow-hidden">
          <img src={item?.IMG ?? "/default/pro-empty.jpg"} alt="" />
        </span>
        <span className="flex flex-col">
          <span className="font-semiboldl pb-1 mb-1 border-b-2">
            {item?.BankName}
          </span>
          <span className="text-[12px] flex flex-1 flex-col">
            Stk: {item?.BankNumber}
          </span>
        </span>
      </span>
    </div>
  );
};

import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

type TFieldSelect<TFieldValues> = {
  value: "id" | keyof TFieldValues;
  label: "name" | keyof TFieldValues;
};

type TControl<T extends object = object> = Partial<UseFieldArrayReturn<T>> &
  Partial<UseFormReturn<T>>;

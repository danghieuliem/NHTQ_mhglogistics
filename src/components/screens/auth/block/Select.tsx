import clsx from "clsx";
import React, { FC } from "react";
import styles from "./index.module.css";

type TProps = {
  name: string;
  options: string[];
};

const Select: FC<TProps> = ({ name, options }) => {
  return (
    <div className={styles["select-box"]}>
      <div className={styles["select-box__current"]} tabIndex={1}>
        {options.map((item, index) => (
          <div key={item} className={styles["select-box__value"]}>
            <input
              className={styles["select-box__input"]}
              type="radio"
              id={name + item}
              value={item}
              name={name}
              defaultChecked={index === 0}
            />
            <p className={styles["select-box__input-text"]}>{item}</p>
          </div>
        ))}
        <i
          className={clsx("fas fa-caret-down", styles["select-box__icon"])}
        ></i>
      </div>
      <ul className={styles["select-box__list"]}>
        {options.map((item) => (
          <li key={item}>
            <label
              className={styles["select-box__option"]}
              htmlFor={name + item}
              aria-hidden="true"
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;

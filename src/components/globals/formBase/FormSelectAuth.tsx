import clsx from 'clsx';
import React from 'react';
import { Control, Controller, FieldValues, Path, RegisterOptions } from 'react-hook-form';
import styles from '~/assets/css/auth.module.scss';

type TProps<TFieldValues> = {
	data: object[];
	select?: { label: string; value: string };
	name: Path<TFieldValues>;
	rules?: RegisterOptions;
	control: Control<TFieldValues, object>;
	icon: string;
};

export const FormSelectAuth = <TFieldValues extends FieldValues = FieldValues>({
	control,
	data,
	icon,
	name,
	rules,
	select = { label: 'name', value: 'id' }
}: TProps<TFieldValues>) => {
	const { label: l, value: v } = select;

	const options = data.map((item) => {
		return { label: item[l], value: item[v] };
	});

	return (
		<div className={styles['select-box']}>
			<div className={styles['select-box__current']} tabIndex={1}>
				{options.map((item, index) => (
					<Controller
						control={control}
						name={name}
						rules={rules}
						render={({ field: { value, ...newField }, formState: { errors } }) => (
							<div key={item.value} className={styles['select-box__value']}>
								<input
									className={styles['select-box__input']}
									type="radio"
									id={item.value}
									value={item.value}
									name={name}
									defaultChecked={index === 0}
									{...newField}
								/>
								<p className={styles['select-box__input-text']}>{item}</p>
							</div>
						)}
					/>
				))}
				<i className={clsx('fas fa-caret-down', styles['select-box__icon'])}></i>
			</div>
			<ul className={styles['select-box__list']}>
				{options.map((item) => (
					<li key={item.value}>
						<label className={styles['select-box__option']} htmlFor={item.value} aria-hidden="true">
							{item}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

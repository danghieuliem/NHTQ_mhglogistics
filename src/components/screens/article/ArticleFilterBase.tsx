import React from "react";
import {FilterInput, FilterSelect} from "~/components";
import {useCatalogue} from "~/hooks";

type TProps = {
	handleFilter: (newFilter) => void;
};

export const ArticleFilterBase: React.FC<TProps> = ({handleFilter}) => {
	const {pageType} = useCatalogue({pageTypeEnabled: true});

	return (
		<div className="w-[500px] grid grid-cols-2 gap-4">
			<div className="col-span-1">
				<FilterInput
					name="code"
					handleSubmit={(val) => handleFilter({SearchContent: val.trim().toLocaleLowerCase(), PageTypeId: null})}
					allowClear={false}
					label="Tên bài viết"
					placeholder="Nhập tên bài viết"
					id={""}
				/>
			</div>
			<div className="col-span-1">
				<FilterSelect
					label="Tên chuyên mục"
					placeholder="Chọn chuyên mục"
					data={pageType}
					select={{label: "Name", value: "Id"}}
					handleSearch={(val) => handleFilter({SearchContent: null, PageTypeId: val})}
					isClearable
				/>
			</div>
		</div>
	);
};

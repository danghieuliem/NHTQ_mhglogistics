type TRegisterSteps = {
	id: number;
	Name: string;
	Link: string;
	index: number;
	enabled: boolean;
	Created: Date;
	Description: string;
	Active: boolean;
	Position: number;
	IMG: string;
};

type TClientBenefit = {
	id: number;
	Name: string;
	Active: boolean;
	Created: Date;
	benefitId: number;
	ItemTypeName: string;
	Position: number;
	Link: string;
	IMG: any;
	Description: string;
	ItemType: null;
};

type TEditContent = {
	Name: string;
	Id: number;
	Link: string;
	Active: boolean;
	newPage: boolean;
};

type TAddChildContent = {
	Id: number;
	Parent: string;
	Name: string;
	NameChild: string;
	Link: string;
	Position: number;
	enabled: boolean;
	newPage: boolean;
};

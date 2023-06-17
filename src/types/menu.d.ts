type TContentHome = TBaseReponseParams & {
	Name?: string;
	Link: string;
	Parent: number;
	Position: number;
	Type: number;
	newPage?: boolean;
	Active?: boolean;
	enabled?: boolean;
	Children?: TContentHome[];
};

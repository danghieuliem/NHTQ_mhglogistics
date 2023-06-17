import { useMutation } from 'react-query';
import { toast } from '~/components';

export const useGetExcel = (fetchFn, params?, content?: string) => {
	const mutation = useMutation(() => fetchFn(params), {
		onSuccess: (res: { Data: string }) => {
			const outputFilename = `${content}-${Date.now()}.xls`;
			const link = document.createElement('a');
			link.href = res.Data;
			link.setAttribute('download', outputFilename);
			document.body.appendChild(link);
			link.click();
			link.remove();
		},
		onError: toast.error
	});
	return mutation;
};

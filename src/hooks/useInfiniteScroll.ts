import { useCallback, useEffect, useRef } from 'react';

function useInfiniteScroll(cb) {
	const loadMoreRef = useRef(null);

	const handleObserver = useCallback((entries) => {
		const [target] = entries;
		if (target.isIntersecting) {
			cb();
		}
	}, []);

	useEffect(() => {
		const option = {
			root: null,
			rootMargin: '0px',
			threshold: 1.0
		};

		const observer = new IntersectionObserver(handleObserver, option);

		if (loadMoreRef.current) observer.observe(loadMoreRef.current);
	}, [handleObserver]);

	return { loadMoreRef };
}

export { useInfiniteScroll };


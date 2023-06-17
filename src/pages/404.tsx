import React from 'react';
import { Layout, NotFound } from '~/components';
import { TNextPageWithLayout } from '~/types/layout';

const Index: TNextPageWithLayout = () => {
	return <NotFound />;
};

Index.Layout = Layout;

export default Index;

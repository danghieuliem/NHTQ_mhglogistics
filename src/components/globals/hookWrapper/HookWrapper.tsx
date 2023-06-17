export const HookWrapper = ({ children, hookList }) => {
	hookList.forEach((hook) => hook());
	return <>{children}</>;
};

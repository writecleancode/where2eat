import { Icon, IconTwo, Wrapper } from './IconButton.styles';

type IconButtonProps = {
	iconURL: string;
	iconTwoURL?: string;
	label: string;
};

export const IconButton = ({ iconURL, iconTwoURL, label }: IconButtonProps) => {
	return (
		<Wrapper type='button' aria-label={label} title={label}>
			<Icon src={iconURL} alt='' />
			{iconTwoURL && <IconTwo $isActive={false} src={iconTwoURL} alt='' />}
		</Wrapper>
	);
};

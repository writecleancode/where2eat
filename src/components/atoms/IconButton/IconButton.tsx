import { Icon, IconTwo, Wrapper } from './IconButton.styles';

type IconButtonProps = {
	iconURL: string;
	iconTwoURL?: string;
	label: string;
	onClick?: () => void;
};

export const IconButton = ({ iconURL, iconTwoURL, label, ...props }: IconButtonProps) => {
	return (
		<Wrapper type='button' aria-label={label} title={label} {...props}>
			<Icon src={iconURL} alt='' />
			{iconTwoURL && <IconTwo $isActive={false} src={iconTwoURL} alt='' />}
		</Wrapper>
	);
};

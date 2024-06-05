import { Icon, IconTwo, Wrapper } from './IconButton.styles';
import { IconButtonProps } from 'src/types/types';

export const IconButton = ({ iconURL, iconTwoURL, label, isActive, ...props }: IconButtonProps) => {
	return (
		<Wrapper type='button' aria-label={label} title={label} {...props}>
			<Icon src={iconURL} alt='' />
			{iconTwoURL && <IconTwo $isActive={isActive} src={iconTwoURL} alt='' />}
		</Wrapper>
	);
};

import { LoadingAnimation, Wrapper } from './LoadingGif.styles';

export const LoadingGif = () => {
	return (
		<Wrapper>
			<LoadingAnimation src='/img/loading_animation.gif' alt='loading animation' />
		</Wrapper>
	);
};

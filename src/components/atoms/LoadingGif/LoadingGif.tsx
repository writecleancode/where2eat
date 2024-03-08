import { LoadingAnimation, Wrapper } from './LoadingGif.styles';

export const LoadingGif = () => {
	return (
		<Wrapper>
			<LoadingAnimation src='/src/assets/img/loading_animation.gif' alt='loading animation' />
		</Wrapper>
	);
};

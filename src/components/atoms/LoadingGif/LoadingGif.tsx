import { basePath } from 'src/utils/base-path';
import { LoadingAnimation, Wrapper } from './LoadingGif.styles';

export const LoadingGif = () => {
	return (
		<Wrapper>
			<LoadingAnimation src={`${basePath}/img/loading_animation.gif`} alt='loading animation' />
		</Wrapper>
	);
};

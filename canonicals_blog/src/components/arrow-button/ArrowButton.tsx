import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

interface OnClick {
	onClick?: (state: boolean) => void;
	sideBarVisible?: boolean;
}

export const ArrowButton = ({ onClick, sideBarVisible }: OnClick) => {
	const onClickHandler = () => {
		onClick?.(!sideBarVisible);
	};

	return (
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={`${styles.container} ${
				sideBarVisible ? styles.container_open : ''
			}`}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				onClickHandler();
			}}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, sideBarVisible && styles.arrow_open)}
			/>
		</div>
	);
};

/* eslint-disable prettier/prettier */
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { FormEvent, useRef, useState } from 'react';
import { Select } from '../select';
import { sideBarStateType,backgroundColors,contentWidthArr,defaultArticleState,fontColors,fontFamilyOptions,fontSizeOptions } from 'src/constants/articleProps';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { useCloseSideBar } from './hooks/useCloseSideBar';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

interface sideBarProps {
	sideBarState: sideBarStateType;
	setSideBarState: (param: sideBarStateType) => void;
}

export const ArticleParamsForm = ({
	sideBarState,
	setSideBarState,
}: sideBarProps) => {
	const [sideBarVisible, setSideBarVisible] = useState<boolean>(false);
	const [formState, setFormState] = useState({
		fontFamily: sideBarState.fontFamilyOption,
		fontSize: sideBarState.fontSizeOption,
		fontColor: sideBarState.fontColor,
		backgroundColor: sideBarState.backgroundColor,
		contentWidth: sideBarState.contentWidth,
	});

	const rootRef = useRef<HTMLElement | null>(null);
	const formRef = useRef<HTMLFormElement>(null);

	useOutsideClickClose({
		sideBarVisible,
		rootRef,
		onClose: () => setSideBarVisible(false),
		onChange: setSideBarVisible,
	});

	useCloseSideBar({
		sideBarVisible: sideBarVisible,
		onClose: () => setSideBarVisible(false),
		rootRef: formRef,
	});

	const formResetHandler = () => {
		setFormState((prevState) => ({
			...prevState,
			fontFamily: defaultArticleState.fontFamilyOption,
			fontSize: defaultArticleState.fontSizeOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
		}));

		setSideBarState(defaultArticleState);
	};

	const formSubmitHandler = (evt: FormEvent) => {
		evt.preventDefault();

		setSideBarState({
			...formState,
			fontFamilyOption: formState.fontFamily,
			fontSizeOption: formState.fontSize,
			fontColor: formState.fontColor,
			backgroundColor: formState.backgroundColor,
			contentWidth: formState.contentWidth,
		});

		setSideBarVisible(!sideBarVisible);
	};

	return (
		<>
			<ArrowButton onClick={setSideBarVisible} sideBarVisible={sideBarVisible} />
			<aside
				className={clsx(styles.container, sideBarVisible && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={formSubmitHandler}
					onReset={formResetHandler}
					ref={formRef}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={formState.fontFamily}
						options={fontFamilyOptions}
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontFamily: selectedOption,
							}))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={formState.fontSize}
						title='Размер шрифта'
						name='Размер шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontSize: selectedOption,
							}))
						}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title='Цвет шрифта'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								fontColor: selectedOption,
							}))
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='Цвет фона'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								backgroundColor: selectedOption,
							}))
						}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='Ширина контента'
						onChange={(selectedOption) =>
							setFormState((prevState) => ({
								...prevState,
								contentWidth: selectedOption,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};

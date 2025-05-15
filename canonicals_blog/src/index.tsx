import { createRoot } from 'react-dom/client';
import { CSSProperties, useState, StrictMode } from 'react';
import { defaultArticleState } from 'src/constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form/index';
import { Article } from './components/article/index';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [sideBarState, setSideBarState] = useState(defaultArticleState);

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': sideBarState.fontFamilyOption.value,
					'--font-size': sideBarState.fontSizeOption.value,
					'--font-color': sideBarState.fontColor.value,
					'--container-width': sideBarState.contentWidth.value,
					'--bg-color': sideBarState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				sideBarState={sideBarState}
				setSideBarState={setSideBarState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);

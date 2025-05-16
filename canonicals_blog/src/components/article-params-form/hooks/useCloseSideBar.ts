/* eslint-disable prettier/prettier */
import { useEffect } from 'react';

type TUseClose = {
	sideBarVisible: boolean;
	onClose: () => void;
	rootRef: React.RefObject<HTMLFormElement>;
};

export function useCloseSideBar({ sideBarVisible, onClose, rootRef }: TUseClose) {
	useEffect(() => {
		if (!sideBarVisible) return;

		function handleClickOutside(event: MouseEvent) {
			const { target } = event;
			const isOutsideClick =
				target instanceof Node && rootRef.current && !rootRef.current.contains(target);
			if (isOutsideClick) onClose();
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);
		
		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [sideBarVisible, onClose, rootRef]);
}

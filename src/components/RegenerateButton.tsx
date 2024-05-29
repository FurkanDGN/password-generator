import React, { useState, useEffect, useCallback } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

interface RegenerateButtonProps {
	onClick: () => void;
}

const RegenerateButton: React.FC<RegenerateButtonProps> = ({ onClick }) => {
	const [isSpinning, setIsSpinning] = useState(false);

	const handleClick = useCallback(() => {
		setIsSpinning(true);
		onClick();
		setTimeout(() => setIsSpinning(false), 400);
	}, [isSpinning, onClick]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (!event.shiftKey && ((event.ctrlKey && event.key === 'r') || (event.metaKey && event.key === 'r'))) {
				handleClick();
				event.preventDefault();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleClick]);

	return (
		<div className="relative inline-block group">
			<div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm px-2 py-1 rounded transition-all duration-300 transform-origin-bottom opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0`}>
				Regenerate
				<div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-500 rotate-45"></div>
			</div>
			<button
				onClick={handleClick}
				className={`p-2 transition-all rounded-md focus:outline-none ${isSpinning ? 'animate-spin' : ''}`}
			>
				<FaSyncAlt />
			</button>
		</div>
	);
};

export default RegenerateButton;

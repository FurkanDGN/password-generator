import React, { useState, useEffect, useCallback } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CopyButtonProps {
	textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
	const [copied, setCopied] = useState(false);

	const handleCopy = useCallback(() => {
		navigator.clipboard.writeText(textToCopy);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	}, [copied, textToCopy]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if ((event.ctrlKey && event.key === 'c') || (event.metaKey && event.key === 'c')) {
				handleCopy();
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [handleCopy]);

	return (
		<div className="relative inline-block group">
			<div className={`absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-sm px-2 py-1 rounded transition-all duration-300 transform-origin-bottom ${copied ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-0'}`}>
				{copied ? 'Copied' : 'Copy'}
				<div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-4px] w-2 h-2 bg-gray-500 rotate-45"></div>
			</div>
			<button
				onClick={handleCopy}
				className="flex items-center p-2 rounded transition-all relative group bg-transparent"
			>
				<div className={`transition-transform duration-300 ${copied ? 'transform scale-0' : 'transform scale-100'}`}>
					<FaCopy />
				</div>
				<div className={`absolute inset-0 flex items-center justify-center transition-transform duration-300 ${copied ? 'transform scale-100' : 'transform scale-0'}`}>
					<FaCheck className="text-green-500" />
				</div>
			</button>
		</div>
	);
};

export default CopyButton;

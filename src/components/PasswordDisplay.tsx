import React, { useEffect, useState } from 'react';
import CopyButton from './CopyButton';
import RegenerateButton from './RegenerateButton';
import { calculatePasswordStrength, getStrengthColor } from '../utils/passwordStrength';

interface PasswordDisplayProps {
	password: string;
	onRegenerate: () => void;
}

const PasswordDisplay: React.FC<PasswordDisplayProps> = ({ password, onRegenerate }) => {
	const [inputValue, setInputValue] = useState(password);
	const [displayValue, setDisplayValue] = useState(password);
	const [passwordStrength, setPasswordStrength] = useState(0);

	useEffect(() => {
		const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		let timeoutIds: NodeJS.Timeout[] = [];

		const animatePassword = (newPassword: string) => {
			let currentDisplay = inputValue.split('');
			let index = 0;

			const updateRandomChars = () => {
				for (let i = index; i < newPassword.length; i++) {
					currentDisplay[i] = randomChars[Math.floor(Math.random() * randomChars.length)];
				}
				setDisplayValue(currentDisplay.join(''));
			};

			const animate = () => {
				if (index < newPassword.length) {
					updateRandomChars();
					timeoutIds.push(setTimeout(() => {
						currentDisplay[index] = newPassword[index];
						setDisplayValue(currentDisplay.join(''));
						index++;
						animate();
					}, 20));
				} else {
					setDisplayValue(newPassword);
				}
			};

			animate();
		};

		animatePassword(password);
		setInputValue(password);
		setPasswordStrength(calculatePasswordStrength(password));

		return () => {
			timeoutIds.forEach(clearTimeout);
		};
	}, [password]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newPassword = event.target.value;
		setInputValue(newPassword);
		setDisplayValue(newPassword);
		setPasswordStrength(calculatePasswordStrength(newPassword));
	};

	return (
		<div className="mb-4 rounded-lg">
			<div className="relative flex items-center">
				<input
					type="text"
					value={displayValue}
					onChange={handleInputChange}
					className="text-lg p-2 bg-content1 w-full pr-10 rounded-md focus:outline-none relative"
				/>
				<div className="absolute bottom-2.5 right-2 flex items-center">
					<CopyButton textToCopy={inputValue} />
					<RegenerateButton onClick={onRegenerate} />
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-2 bg-content3 rounded-b-md overflow-hidden">
					<div
						className={`absolute h-full transition-all duration-300 ${getStrengthColor(passwordStrength)}`}
						style={{ width: `${(passwordStrength / 6) * 100}%` }}
					></div>
				</div>
			</div>
		</div>
	);
};

export default PasswordDisplay;

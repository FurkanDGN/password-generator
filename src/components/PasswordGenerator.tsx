import React, { useState, useEffect } from 'react';
import generatePassword from '../utils/generatePassword';
import PasswordDisplay from './PasswordDisplay';
import PasswordOptions from './PasswordOptions';
import { isDesktop, osName } from 'react-device-detect';
import { FaCopy, FaSyncAlt } from 'react-icons/fa';
import { PiArrowFatLineRightFill } from "react-icons/pi";

const shortcutColor = 'text-slate-400';

const PasswordGenerator = () => {
	const [includeUppercase, setIncludeUppercase] = useState(true);
	const [includeLowercase, setIncludeLowercase] = useState(true);
	const [includeNumbers, setIncludeNumbers] = useState(true);
	const [includeSymbols, setIncludeSymbols] = useState(true);

	const [password, setPassword] = useState('');

	const [length, setLength] = useState(12);

	useEffect(() => {
		const generatedPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
		setPassword(generatedPassword);
	}, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

	const forceGeneratePassword = () => {
		let generatedPassword = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
		setPassword(generatedPassword);
	}

	const [isDesktopDevice, setIsDesktopDevice] = useState(false);

	useEffect(() => {
		setIsDesktopDevice(isDesktop);
	}, []);

	const getShortcuts = () => {
		if (osName === 'Mac OS') {
			return (
				<>
					<FaCopy className="mr-1" />
					<PiArrowFatLineRightFill className="mr-1" />
					<span className={`text-base ${shortcutColor}`}>⌘+C</span>
					
					<FaSyncAlt className="ml-8 mr-1" />
					<PiArrowFatLineRightFill className="mr-1"/>
					<span className={`text-base ${shortcutColor}`}>⌘+R</span>
				</>
			);
		}
		return (
			<>
				<FaCopy className="mr-1" />
				<PiArrowFatLineRightFill className="mr-1" />
				<span className={`text-base ${shortcutColor}`}>Ctrl+C</span>
				
				<FaSyncAlt className="ml-8 mr-1" />
				<PiArrowFatLineRightFill className="mr-1"/>
				<span className={`text-base ${shortcutColor}`}>Ctrl+R</span>
			</>
		);
	};

	return (
		<div className="p-4 max-w-xl mx-auto">
			{isDesktopDevice && (<div className="text-center text-gray-500 text-sm mb-4">
				<span className="flex items-center justify-center">
					{getShortcuts()}
				</span>
			</div>
			)}
			<PasswordDisplay
				password={password}
				onRegenerate={forceGeneratePassword}
			/>	
			<PasswordOptions
				includeUppercase={includeUppercase}
				includeLowercase={includeLowercase}
				includeNumbers={includeNumbers}
				includeSymbols={includeSymbols}
				passwordLength={length}
				onUppercaseChange={setIncludeUppercase}
				onLowercaseChange={setIncludeLowercase}
				onNumbersChange={setIncludeNumbers}
				onSymbolsChange={setIncludeSymbols}
				onPasswordLengthChange={setLength}
			/>
		</div>
	);
};

export default PasswordGenerator;

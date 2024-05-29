import React from 'react';
import { Checkbox } from '@nextui-org/react';
import { Slider, Input } from '@nextui-org/react';

interface PasswordOptionsProps {
	includeUppercase: boolean;
	includeLowercase: boolean;
	includeNumbers: boolean;
	includeSymbols: boolean;
	passwordLength: number;
	onUppercaseChange: (checked: boolean) => void;
	onLowercaseChange: (checked: boolean) => void;
	onNumbersChange: (checked: boolean) => void;
	onSymbolsChange: (checked: boolean) => void;
	onPasswordLengthChange: (length: number) => void;
}

const PasswordOptions: React.FC<PasswordOptionsProps> = ({
	includeUppercase,
	includeLowercase,
	includeNumbers,
	includeSymbols,
	passwordLength,
	onUppercaseChange,
	onLowercaseChange,
	onNumbersChange,
	onSymbolsChange,
	onPasswordLengthChange,
}) => {
	const handleCheckboxChange = (
		type: 'uppercase' | 'lowercase' | 'numbers' | 'symbols',
		checked: boolean
	) => {
		const selectedCount =
			(includeUppercase ? 1 : 0) +
			(includeLowercase ? 1 : 0) +
			(includeNumbers ? 1 : 0) +
			(includeSymbols ? 1 : 0);

		switch (type) {
			case 'uppercase':
				onUppercaseChange(checked);
				break;
			case 'lowercase':
				onLowercaseChange(checked);
				break;
			case 'numbers':
				onNumbersChange(checked);
				break;
			case 'symbols':
				onSymbolsChange(checked);
				break;
		}
	};

	return (
	<div className="bg-content1 p-4 rounded-lg">
		<div className="flex flex-wrap items-center mb-4">
			<span className="mr-2 mb-2 sm:mb-0" style={{ minWidth: '100px' }}>
				Password length: 
			</span>
			<Input
				aria-label='Password length input'
				type="number"
				min={6}
				max={35}
				placeholder=""
				onChange={(e) => onPasswordLengthChange(parseInt(e.target.value, 10))}
				className="ml-12 mb-2 sm:mb-0 w-16 sm:w-16 h-10 sm:h-auto"
				value={"" + passwordLength}
			/>
			<Slider
				aria-label='Password length slider'
				minValue={6}
				maxValue={35}
				value={passwordLength}
				onChange={(v) => onPasswordLengthChange(Array.isArray(v) ? v[0] : v)}
				className="ml-4 w-5/12 sm:w-5/12"
			/>
		</div>
		<div className="mb-4 flex flex-wrap items-center">
			<span className="mr-2">Characters used:</span>
			<div className="flex flex-wrap items-center">
				{['uppercase', 'lowercase', 'numbers', 'symbols'].map((type, index) => (
					<Checkbox
						aria-label={"Checkbox for " + type}
						isSelected={
							type === 'uppercase' ? includeUppercase :
							type === 'lowercase' ? includeLowercase :
							type === 'numbers' ? includeNumbers :
							includeSymbols
						}
						onChange={(e) => handleCheckboxChange(type as 'uppercase' | 'lowercase' | 'numbers' | 'symbols', e.target.checked)}
						key={type}
						className="ml-6"
					>
						{['ABC', 'abc', '123', '#$&'][index]}
					</Checkbox>
				))}
			</div>
		</div>
	</div>
);

};

export default PasswordOptions;

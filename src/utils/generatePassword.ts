const generatePassword = (
	length: number,
	includeUppercase: boolean,
	includeLowercase: boolean,
	includeNumbers: boolean,
	includeSymbols: boolean
) => {
	const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lower = 'abcdefghijklmnopqrstuvwxyz';
	const numbers = '0123456789';
	const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

	let allChars = '';
	let mandatoryChars = '';

	if (includeUppercase) {
		allChars += upper;
		mandatoryChars += upper[Math.floor(Math.random() * upper.length)];
	}
	if (includeLowercase) {
		allChars += lower;
		mandatoryChars += lower[Math.floor(Math.random() * lower.length)];
	}
	if (includeNumbers) {
		allChars += numbers;
		mandatoryChars += numbers[Math.floor(Math.random() * numbers.length)];
	}
	if (includeSymbols) {
		allChars += symbols;
		mandatoryChars += symbols[Math.floor(Math.random() * symbols.length)];
	}

	if (allChars.length === 0) {
		return '';
	}

	let generatedPassword = mandatoryChars;
	for (let i = mandatoryChars.length; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * allChars.length);
		generatedPassword += allChars[randomIndex];
	}

	return generatedPassword.split('').sort(() => 0.5 - Math.random()).join('');
};

export default generatePassword;

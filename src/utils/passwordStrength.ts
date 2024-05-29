export const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    if (password.length >= 8) strength += 1;
    if (password.length >= 10) strength += 1;
    if (password.length > 12) strength += 1;
    if (password.length > 14) strength += 1;
    if (password.length >= 20) strength += 1;

    strength = Math.min(strength, 6);

    return strength;
};

export const getStrengthColor = (strength: number) => {
    switch (strength) {
        case 1:
            return 'bg-red-500';
        case 2:
            return 'bg-orange-500';
        case 3:
            return 'bg-yellow-500';
        case 4:
            return 'bg-yellow-300';
        case 5:
            return 'bg-green-600';
        case 6:
            return 'bg-green-700';
        default:
            return 'bg-gray-500';
    }
};
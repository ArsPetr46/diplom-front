export const validateNickname = (username: string) => {
    const usernameRegex = /^[A-Za-z0-9]{5,30}$/;
    return usernameRegex.test(username);
};

export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.length <= 255 && emailRegex.test(email);
};

export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
};

export const validateDescription = (description: string) => {
    return description.length <= 300;
};

export const validateBirthDate = (birthDate: string) => {
    const date = new Date(birthDate);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    const dayDiff = today.getDate() - date.getDate();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        return age - 1 >= 13 && age - 1 <= 100;
    }

    return age >= 13 && age <= 100;
};

export const validateAvatarUrl = (url: string) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};
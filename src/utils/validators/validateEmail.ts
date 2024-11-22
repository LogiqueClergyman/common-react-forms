type ValidateEmailProps = {
  value: string;
  required?: boolean;
  domain?: string;
  regex?: RegExp;
};

export const validateEmail = ({
  value,
  required,
  domain,
  regex,
}: ValidateEmailProps): string | undefined => {
  if (required && !value) {
    return 'This field is required';
  }
  const basicEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!basicEmailRegex.test(value)) {
    return 'Invalid email format';
  }
  if (domain) {
    const domainRegex = new RegExp(`^[^@]+@${domain}$`);
    if (!domainRegex.test(value)) {
      return `Only emails with @${domain} are allowed`;
    }
  }
  if (regex && !regex.test(value)) {
    return 'Invalid format';
  }
  return undefined;
};

import { useState, ChangeEvent, FormEvent } from 'react';
import { FormData, FormErrors } from './types';
import { validateForm } from './validation';
import { trackContactFormSubmission } from '../../utils/analytics';
import { useNavigate } from 'react-router-dom';

const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};


export function useContactForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          subject: `Neue Kontaktanfrage: ${formData.subject}`,
          from_name: `${formData.firstName} ${formData.lastName}`,
          to_email: 'info@h-i-s.ch',
          reply_to: formData.email,
          message: `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Telefon: ${formData.phone}
Betreff: ${formData.subject}

Nachricht:
${formData.message}
              `.trim(),
            })
          });

          if (!response.ok) {
            throw new Error('Failed to send message');
          }

          // Clear form on success
          setFormData(initialFormData);
          alert('Ihre Nachricht wurde erfolgreich gesendet!');
        } catch (error) {
          alert('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
        } finally {
          setIsSubmitting(false);
        }
      });
    } catch (error) {
      setIsSubmitting(false);
      alert('Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es später erneut.');
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  };
}

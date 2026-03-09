import { toast } from 'react-toastify';

// Parse API error produced by express-validator or generic error responses
export function showApiError(err, opts = {}) {
  const { title } = opts;
  const resp = err?.response?.data;
  if (!resp) {
    const msg = err?.message || 'An unexpected error occurred';
    toast.error(msg);
    return { message: msg };
  }

  // If express-validator style errors
  if (Array.isArray(resp.errors) && resp.errors.length > 0) {
    const messages = resp.errors.map((e) => `${e.param}: ${e.msg}`);
    // show first message in toast, keep others available
    toast.error(messages[0]);
    return { message: messages.join('; '), fieldErrors: resp.errors };
  }

  // If server returned a message string
  if (resp.message) {
    toast.error(resp.message);
    return { message: resp.message };
  }

  // fallback
  toast.error('Request failed');
  return { message: 'Request failed' };
}

export default showApiError;

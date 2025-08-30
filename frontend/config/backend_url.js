let BACKEND_URL;

if (import.meta.env.VITE_ENV === "development") {
  BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
} else {
  BACKEND_URL = import.meta.env.VITE_PROD_BACKEND_URL;
}

export default BACKEND_URL;


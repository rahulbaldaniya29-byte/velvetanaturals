import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — handle token refresh
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const { data } = await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        localStorage.setItem('accessToken', data.accessToken);
        original.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(original);
      } catch { localStorage.removeItem('accessToken'); window.location.href = '/login'; }
    }
    return Promise.reject(error);
  }
);

// ── AUTH ────────────────────────────────────────────────
export const authService = {
  register: (data: { name: string; email: string; password: string; phone?: string }) =>
    api.post('/auth/register', data),
  login: (data: { email: string; password: string }) =>
    api.post('/auth/login', data),
  googleLogin: (token: string) =>
    api.post('/auth/google', { token }),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post(`/auth/reset-password/${token}`, { password }),
  verifyEmail: (token: string) =>
    api.get(`/auth/verify-email/${token}`),
  sendOTP: (phone: string) =>
    api.post('/auth/send-otp', { phone }),
  verifyOTP: (phone: string, otp: string) =>
    api.post('/auth/verify-otp', { phone, otp }),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (data: any) => api.put('/auth/profile', data),
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    api.put('/auth/change-password', data),
  refresh: () => api.post('/auth/refresh'),
};

// ── PRODUCTS ────────────────────────────────────────────
export const productService = {
  getAll: (params?: { category?: string; sort?: string; page?: number; limit?: number; search?: string; minPrice?: number; maxPrice?: number }) =>
    api.get('/products', { params }),
  getBySlug: (slug: string) => api.get(`/products/${slug}`),
  getRelated: (slug: string) => api.get(`/products/${slug}/related`),
  getFeatured: () => api.get('/products/featured'),
  search: (q: string) => api.get('/products/search', { params: { q } }),
  // Admin
  create: (data: FormData) => api.post('/admin/products', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/admin/products/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  delete: (id: string) => api.delete(`/admin/products/${id}`),
};

// ── ORDERS ──────────────────────────────────────────────
export const orderService = {
  create: (data: any) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my'),
  getById: (id: string) => api.get(`/orders/${id}`),
  verifyPayment: (data: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) =>
    api.post('/orders/verify-payment', data),
  // Admin
  getAll: (params?: any) => api.get('/admin/orders', { params }),
  updateStatus: (id: string, status: string) => api.put(`/admin/orders/${id}/status`, { status }),
};

// ── REVIEWS ─────────────────────────────────────────────
export const reviewService = {
  getByProduct: (productId: string) => api.get(`/reviews/${productId}`),
  create: (data: { productId: string; rating: number; comment: string }) =>
    api.post('/reviews', data),
  update: (id: string, data: any) => api.put(`/reviews/${id}`, data),
  delete: (id: string) => api.delete(`/reviews/${id}`),
};

// ── CART (server-side for logged-in users) ───────────────
export const cartService = {
  get: () => api.get('/cart'),
  add: (productId: string, qty: number) => api.post('/cart', { productId, qty }),
  update: (productId: string, qty: number) => api.put(`/cart/${productId}`, { qty }),
  remove: (productId: string) => api.delete(`/cart/${productId}`),
  clear: () => api.delete('/cart'),
  sync: (items: any[]) => api.post('/cart/sync', { items }),
};

// ── WISHLIST ─────────────────────────────────────────────
export const wishlistService = {
  get: () => api.get('/wishlist'),
  add: (productId: string) => api.post('/wishlist', { productId }),
  remove: (productId: string) => api.delete(`/wishlist/${productId}`),
};

// ── COUPONS ──────────────────────────────────────────────
export const couponService = {
  validate: (code: string, total: number) => api.post('/coupons/validate', { code, total }),
};

// ── BLOGS ────────────────────────────────────────────────
export const blogService = {
  getAll: (params?: any) => api.get('/blogs', { params }),
  getBySlug: (slug: string) => api.get(`/blogs/${slug}`),
};

// ── ADMIN ────────────────────────────────────────────────
export const adminService = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAnalytics: (period: string) => api.get('/admin/analytics', { params: { period } }),
  getUsers: (params?: any) => api.get('/admin/users', { params }),
  updateUserRole: (id: string, role: string) => api.put(`/admin/users/${id}/role`, { role }),
  getCoupons: () => api.get('/admin/coupons'),
  createCoupon: (data: any) => api.post('/admin/coupons', data),
  updateCoupon: (id: string, data: any) => api.put(`/admin/coupons/${id}`, data),
  deleteCoupon: (id: string) => api.delete(`/admin/coupons/${id}`),
  uploadImage: (file: File) => {
    const fd = new FormData(); fd.append('image', file);
    return api.post('/admin/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
  },
};

export default api;
  const API_BASE = window.__API_BASE__ || '';

  async function request(path, opts = {}){
    const headers = opts.headers || {};
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';

    const token = localStorage.getItem('token');
    if(token) headers['Authorization'] = 'Bearer ' + token;

    const res = await fetch(API_BASE + path, {...opts, headers});
    const data = await res.json().catch(()=>null);

    if(!res.ok){
      const err = (data && data.message) ? data.message : (res.statusText || 'Request failed');
      throw new Error(err);
    }

    return data;
  }

  export async function register(payload){
    return request('/api/auth/register', {
      method:'POST',
      body: JSON.stringify(payload)
    });
  }

  export async function login(payload){
    return request('/api/auth/login', {
      method:'POST',
      body: JSON.stringify(payload)
    });
  }

  export async function addFarmer(payload){
    return request('/api/farmer/add', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

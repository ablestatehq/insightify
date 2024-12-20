import { environments } from "@src/constants";

const { BASE_URL, STRAPI_BASE_URL } = environments;

class AuthService {
  private static instance: AuthService;
  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    };
    return AuthService.instance;
  }

  async signUp(userData: any) {
    const payload = {
      username: userData.email,
      email: userData.email,
      password: userData.password,
    };

      const options = {
        method: 'POST',
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(payload)
      };

      try {
        const response = await fetch(`${STRAPI_BASE_URL}/auth/local/register`, options);
        const data = await response.json();
    
        return data;
      } catch (error) { }
  }

  async updateUser(id: number, jwt: string, data_: unknown) {
    try {
      const response = await fetch(`${STRAPI_BASE_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(data_)
      });

      const data = await response.json();
    
      if (response.ok && data) {
        return {
          error: null,
          success: true,
          data
        };
      } else {
        return {
          error: data,
          success: false,
          data: null
        };
      };
    } catch (error) {
      return {
        error: error,
        success: false
      };
    };
  };

  async login(identifier: string, password: string) {
    const payload = {
      "identifier": identifier,
      "password": password
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    try {
      const response = await fetch(`${STRAPI_BASE_URL}/auth/local?populate=*`, options);
      const data = await response.json();

      return data;
    } catch (error) { }
  }

  async resetPassword(newPassword: string, code: string) {
    const payload = {
      code,
      password: newPassword,
      passwordConfirmation: newPassword
    };
    try {
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(payload)
      };
      const update = await
        fetch(`${BASE_URL}/api/auth/reset-password`, options);
      return update.json();
    } catch (error) {}
  };

  async forgotRequest(identifier: string,) {
    const payload = {
      email: identifier
    };

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    try {
      const response = await fetch(`${BASE_URL}/api/auth/forgot-password`, options);
      const data = await response.json();
      return data;
    } catch (error) { }
  }
};
import axios from 'axios';
import { OfficerSession } from '@/types';
import { CURRENT_SESSION_ID, SESSION_COOKIE_NAME } from '@/constant';
import { v4 as uuidv4 } from 'uuid';

class SessionService {
  private static async getDeviceInfo() {
    const userAgent = navigator.userAgent;
    const browser = this.getBrowserInfo(userAgent);
    const os = this.getOSInfo(userAgent);
    const device = this.detectDevice(userAgent);

    return { browser, os, device };
  }

  private static getBrowserInfo(userAgent: string): string {
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  }

  private static getOSInfo(userAgent: string): string {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'MacOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  }

  private static detectDevice(userAgent: string): string {
    if (userAgent.includes('Mobile')) return 'Mobile';
    if (userAgent.includes('Tablet')) return 'Tablet';
    return 'Desktop';
  }

  public static async createSession(email: string): Promise<OfficerSession> {
    try {
      // Get IP address using a service
      const ipResponse = await axios.get('https://api.ipify.org?format=json');
      const ipAddress = ipResponse.data.ip;

      // Get location info (optional)
      const locationResponse = await axios.get(`https://ipapi.co/${ipAddress}/json/`);
      const location = {
        city: locationResponse.data.city,
        country: locationResponse.data.country_name,
        longitude: locationResponse.data.longitude,
        latitude: locationResponse.data.latitude,
        org: locationResponse.data.org,
        region: locationResponse.data.region,
        timezone: locationResponse.data.timezone,
        postal: locationResponse.data.postal,
        country_name: locationResponse.data.country_name
      };

      const deviceInfo = await this.getDeviceInfo();

      const session: OfficerSession = {
        session_id: uuidv4(),
        officer_email: email, 
        ip_address: ipAddress,
        device_info: deviceInfo,
        latitude: location.latitude,
        longitude: location.longitude,
        login_time: new Date().toISOString(),
        last_active_time: new Date().toISOString(),
        is_active: true,
      };

      // Store the session in localStorage
      localStorage.setItem(CURRENT_SESSION_ID, JSON.stringify(session));

      return session;
    } catch (error) {
      console.error('Error creating session:', error);
      throw error;
    }
  }

  public static updateLastActive() {
    const session = this.getCurrentSession();
    if (session) {
      const updatedSession = {
        session_id: session.session_id
      };
      localStorage.setItem(CURRENT_SESSION_ID, JSON.stringify(updatedSession));
    }
  }

  public static getCurrentSession(): OfficerSession | null {
    try {
      const sessionStr = localStorage.getItem(CURRENT_SESSION_ID);
      if (!sessionStr) return null;
      
      // Check if the string is "undefined" before parsing
      if (sessionStr === "undefined") return null;
      
      return JSON.parse(sessionStr);
    } catch (error) {
      console.error('Error parsing session from localStorage:', error);
      // Clear invalid session data
      localStorage.removeItem(CURRENT_SESSION_ID);
      return null;
    }
  }

  public static clearSession() {
    localStorage.removeItem(CURRENT_SESSION_ID);
    localStorage.removeItem(SESSION_COOKIE_NAME);
  }
}

export default SessionService;
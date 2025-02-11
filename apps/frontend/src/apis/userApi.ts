// src/api/userApi.ts

import { baseUrl } from './index';
import type { GoogleProfile, User } from '@/types/types';

/**
 * User API:
 * Functions for user-related operations.
 */
export const userApi = {
  /**
   * Get the authenticated user's profile.
   */
  getProfile: async (): Promise<GoogleProfile> => {
    const response = await fetch(`${baseUrl}/auth/profile`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Get a user by their email address.
   * Returns null if the user is not found.
   */
  getUserByEmail: async (email: string): Promise<User | null> => {
    const response = await fetch(`${baseUrl}/user/get-by-email?email=${email}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Update a user's profile.
   */
  updateUserProfile: async (profile: User): Promise<void> => {
    const response = await fetch(`${baseUrl}/user/update-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profile),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
  },
};
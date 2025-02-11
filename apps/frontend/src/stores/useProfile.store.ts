// src/stores/userProfile.ts
import { defineStore } from 'pinia';

import type { GoogleProfile, User } from '@/types/types';
import { userApi } from '@/apis/userApi';

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
      profile: null as User | null,
      isLoading: false,
      error: null as string | null,
    }),
    actions: {
      /**
       * Fetch the authenticated user's profile from the API.
       * Then check if the user already exists on the backend by email.
       * Depending on that, update the user profile state.
       */
      async fetchProfile() {
        this.isLoading = true;
        this.error = null;
        try {
          // Get the Google profile from the API
          const data: GoogleProfile = await userApi.getProfile();

          // If the profile exists and has an email, then check for an existing user.
          if (data?.profile?.email) {
            const now = new Date().toISOString();
            const existingUser = await this.getUserByEmail(data.profile.email);
         
            if (existingUser) {
              // For an existing user, use the stored firstLogin and update lastLogin.
              this.profile = {
                userId: data.profile.email,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                profilePicture: data.profile.profilePicture,
                accessToken: data.profile.accessToken,
                firstLogin: existingUser.firstLogin, // Keep the original firstLogin
                lastLogin: now, // Update lastLogin to the current time
              };
              
            } else {
              // For a new user, set both firstLogin and lastLogin to the current time.
              this.profile = {
                userId: data.profile.email,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                profilePicture: data.profile.profilePicture,
                accessToken: data.profile.accessToken,
                firstLogin: now,
                lastLogin: now,
              };
            }
          }
        } catch (err: any) {
          this.error = err.message || 'Error fetching profile';
        } finally {
          this.isLoading = false;
        }
      },
  
      /**
       * Check if a user exists on the backend by email.
       * Returns the user object if found, or null otherwise.
       */
      async getUserByEmail(email: string): Promise<User | null> {
        try {
          const response = await userApi.getUserByEmail(email);
          return response;
        } catch (error) {
          console.error('Error fetching user:', error);
          return null;
        }
      },
  

      // -----
      /**
       * Optionally, update the user profile on the backend.
       */
      async updateProfile() {
        if (this.profile && this.profile.userId) {
          try {
            await userApi.updateUserProfile(this.profile);
          } catch (error) {
            console.error('Error updating user profile:', error);
          }
        }
      },
    },
  });
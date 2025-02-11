// src/api/connectivityApi.ts

import { baseUrl } from './index';

/**
 * Connectivity API:
 * Functions for checking connectivity and performing test operations.
 */
export const connectivityApi = {
  /**
   * Ping the backend to check connectivity.
   */
  pingBackend: async (): Promise<{ message: string }> => {
    const response = await fetch(`${baseUrl}/ping`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Retrieve DynamoDB table names.
   */
  getDynamoDBTables: async (): Promise<string[]> => {
    const response = await fetch(`${baseUrl}/aws/dynamodb/tables`, {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },

  /**
   * Add test data to the backend.
   * Useful for verifying that POST operations are working.
   */
  addTestData: async (testData: { randomId: string; message: string }): Promise<{ message: string }> => {
    const response = await fetch(`${baseUrl}/test/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  },
};
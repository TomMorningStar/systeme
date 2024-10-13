/* eslint-disable no-console */

import { IEntityTable } from '../shared/types';

class EntityTableService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint: string): Promise<IEntityTable[]> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: IEntityTable[] = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return [];
    }
  }

  async getOne(endpoint: string): Promise<IEntityTable | null> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data: IEntityTable = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
      return null;
    }
  }

  async put<IAll>(endpoint: string, body: IAll): Promise<IAll> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const updatedData = await response.json();
      return updatedData;
    } catch (error) {
      console.error('Failed to update data:', error);
      return {} as IAll;
    }
  }
}

export const api = new EntityTableService('https://6661cd0563e6a0189feba200.mockapi.io/api/v1');

import apiClient from './apiClient'
import type { ApiResponse } from '@/typings/services/ApiResponse'

export interface UserProfile {
  id: string
  display_name?: string
  avatar_url?: string
  preferences?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface AuthUser {
  id: string
  email: string
  created_at: string
  email_confirmed_at?: string
}

export interface ProfileResponse {
  user: AuthUser
  profile: UserProfile | null
}

class AuthService {
  /**
   * Get user profile
   */
  async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.get('/auth/profile')
    return response.data
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData: Partial<UserProfile>): Promise<ApiResponse<UserProfile>> {
    const response = await apiClient.put('/auth/profile', profileData)
    return response.data
  }

  /**
   * Get user by ID
   */
  async getUser(id: string): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.get(`/users/${id}`)
    return response.data
  }

  /**
   * Verify authentication token
   */
  async verifyToken(tokenHash: string, type: string): Promise<ApiResponse<{ user: any; session: any }>> {
    const response = await apiClient.post('/auth/verify', {
      token_hash: tokenHash,
      type
    })
    return response.data
  }

  /**
   * Delete user account
   */
  async deleteAccount(): Promise<ApiResponse<void>> {
    const response = await apiClient.delete('/auth/profile')
    return response.data
  }
}

export const authService = new AuthService()

import { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin, createUserClient } from '../lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    // Get authorization header
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token required'
      })
    }

    const token = authHeader.split(' ')[1]
    const userClient = createUserClient(token)

    // Verify the token and get user
    const { data: { user }, error: authError } = await userClient.auth.getUser(token)
    
    if (authError || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }

    if (req.method === 'GET') {
      // Get user profile
      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      res.json({
        success: true,
        data: {
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
            email_confirmed_at: user.email_confirmed_at
          },
          profile: profile || null
        }
      })

    } else if (req.method === 'PUT') {
      // Update user profile
      const { display_name, avatar_url, preferences } = req.body

      const { data: profile, error } = await supabaseAdmin
        .from('profiles')
        .upsert({
          id: user.id,
          display_name,
          avatar_url,
          preferences,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      res.json({
        success: true,
        data: profile,
        message: 'Profile updated successfully'
      })

    } else if (req.method === 'DELETE') {
      // Delete user account (admin operation)
      const { error } = await supabaseAdmin.auth.admin.deleteUser(user.id)

      if (error) {
        throw error
      }

      res.json({
        success: true,
        message: 'User account deleted successfully'
      })

    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed'
      })
    }

  } catch (error) {
    console.error('Profile API error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

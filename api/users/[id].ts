import { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin, createUserClient } from '../lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'GET') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { id } = req.query

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      })
    }

    // Get authorization header for user verification
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token required'
      })
    }

    const token = authHeader.split(' ')[1]
    const userClient = createUserClient(token)

    // Verify the token and get requesting user
    const { data: { user: requestingUser }, error: authError } = await userClient.auth.getUser(token)
    
    if (authError || !requestingUser) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }

    // Users can only access their own data
    if (requestingUser.id !== id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      })
    }

    // Get user data
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(id)
    
    if (userError) {
      throw userError
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single()

    if (profileError && profileError.code !== 'PGRST116') {
      throw profileError
    }

    res.json({
      success: true,
      data: {
        user: {
          id: userData.user.id,
          email: userData.user.email,
          created_at: userData.user.created_at,
          email_confirmed_at: userData.user.email_confirmed_at
        },
        profile: profile || null
      }
    })

  } catch (error) {
    console.error('User API error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

import { VercelRequest, VercelResponse } from '@vercel/node'
import { supabaseAdmin } from '../lib/supabase'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    })
  }

  try {
    const { token_hash, type } = req.body

    if (!token_hash || !type) {
      return res.status(400).json({
        success: false,
        message: 'Token hash and type are required'
      })
    }

    // Verify the token
    const { data, error } = await supabaseAdmin.auth.verifyOtp({
      token_hash,
      type: type as any
    })

    if (error) {
      console.error('Token verification error:', error)
      return res.status(400).json({
        success: false,
        message: error.message
      })
    }

    res.json({
      success: true,
      data: {
        user: data.user,
        session: data.session
      },
      message: 'Token verified successfully'
    })

  } catch (error) {
    console.error('Verify API error:', error)
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    })
  }
}

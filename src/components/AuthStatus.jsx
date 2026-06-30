import React from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * AuthStatus - Shows authentication status (preview-safe)
 *
 * This component is intentionally minimal and preview-safe:
 * - Does not require auth to be configured
 * - Does not grant any pro entitlements
 * - Only shows status when Supabase is configured
 *
 * Placeholder: Can be added to nav, pricing page, or debug section
 */
export default function AuthStatus() {
  const { user, loading, isAuthConfigured, signInWithGoogle, signOut } = useAuth()

  // Only show when Supabase is actually configured
  if (!isAuthConfigured) {
    return null
  }

  // Loading state
  if (loading) {
    return (
      <div style={{
        padding: '8px 12px',
        fontSize: '0.75rem',
        color: 'var(--gray-500)'
      }}>
        Loading auth...
      </div>
    )
  }

  // Not logged in
  if (!user) {
    return (
      <button
        onClick={signInWithGoogle}
        className="btn btn-primary"
        style={{ padding: '6px 16px', fontSize: '0.85rem' }}
      >
        Sign In
      </button>
    )
  }

  // Logged in
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '4px 8px'
    }}>
      <span style={{
        fontSize: '0.8rem',
        color: 'var(--gray-600)'
      }}>
        {user.email}
      </span>
      <button
        onClick={signOut}
        className="btn btn-outline"
        style={{ padding: '4px 12px', fontSize: '0.75rem' }}
      >
        Sign Out
      </button>
    </div>
  )
}
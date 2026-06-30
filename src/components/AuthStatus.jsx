import React from 'react'
import { useAuth } from '../context/AuthContext'

/**
 * AuthStatus - Shows authentication status (preview-safe)
 *
 * This component is intentionally minimal and preview-safe:
 * - Does not require auth to be configured
 * - Does not grant any pro entitlements
 * - Only shows meaningful status when Supabase is configured
 *
 * Placement: Added to Pricing page entitlement preview section
 */
export default function AuthStatus() {
  const { user, loading, isAuthConfigured, signInWithGoogle, signOut } = useAuth()

  // Not configured - show preview mode notice
  if (!isAuthConfigured) {
    return (
      <div className="auth-status-preview">
        <div className="auth-status-row">
          <span className="auth-status-label">Authentication:</span>
          <span className="auth-status-value auth-status-preview-mode">Preview mode</span>
        </div>
        <p className="auth-status-note">
          Auth scaffold installed. Configure Supabase in .env to enable sign-in.
        </p>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="auth-status-preview">
        <div className="auth-status-row">
          <span className="auth-status-label">Authentication:</span>
          <span className="auth-status-value">Checking status...</span>
        </div>
      </div>
    )
  }

  // Not logged in - show sign in option
  if (!user) {
    return (
      <div className="auth-status-preview">
        <div className="auth-status-row">
          <span className="auth-status-label">Authentication:</span>
          <span className="auth-status-value auth-status-ready">Ready (signed out)</span>
        </div>
        <button
          onClick={signInWithGoogle}
          className="btn btn-outline auth-status-action"
        >
          Sign in with Google
        </button>
      </div>
    )
  }

  // Logged in - show user email (no pro/paid status)
  return (
    <div className="auth-status-preview">
      <div className="auth-status-row">
        <span className="auth-status-label">Authentication:</span>
        <span className="auth-status-value auth-status-signed-in">Signed in</span>
      </div>
      <div className="auth-status-row">
        <span className="auth-status-label">User:</span>
        <span className="auth-status-value auth-status-user-email">
          {user.email}
        </span>
      </div>
      <p className="auth-status-note">
        Auth status is separate from Pro access.
      </p>
      <button
        onClick={signOut}
        className="btn btn-outline auth-status-action"
      >
        Sign out
      </button>
    </div>
  )
}
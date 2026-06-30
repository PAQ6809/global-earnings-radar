import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

/**
 * AuthContext - Provides authentication state and methods
 *
 * This context is preview-safe: if Supabase is not configured,
 * all auth features gracefully degrade without crashing the app.
 */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isConfigured, setIsConfigured] = useState(isSupabaseConfigured)

  useEffect(() => {
    // If Supabase is not configured, skip auth initialization
    if (!supabase) {
      setLoading(false)
      return
    }

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    if (!supabase) {
      console.warn('Supabase not configured - sign in disabled')
      return { error: new Error('Authentication not configured') }
    }
    return supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
  }

  const signOut = async () => {
    if (!supabase) {
      console.warn('Supabase not configured - sign out disabled')
      return { error: new Error('Authentication not configured') }
    }
    return supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    loading,
    isAuthConfigured: isConfigured,
    signInWithGoogle,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
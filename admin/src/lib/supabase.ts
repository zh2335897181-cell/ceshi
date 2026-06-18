import { createClient } from '@supabase/supabase-js'

const supabaseUrl = `${(window as any).MEOO_CONFIG?.meoo_app_access_url || location.origin}/sb-api`
const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxNTgzNjU3LCJleHAiOjEzMjkyMjIzNjU3fQ.tCujtUzJ0ERVCeXnPucPTaSqKgx5E8AvzVsed4vd3q0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

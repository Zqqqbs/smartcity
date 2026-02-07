import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mxwissvbcckdoaxyvjgs.supabase.co'
const supabaseKey = 'sb_publishable_-DAgHnTj3lbwLth0lM8G0g_j10Ok5ZO';

export const supabase = createClient(supabaseUrl, supabaseKey);
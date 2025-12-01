
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://wafisohswxqutsttotkb.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'mock-key-placeholder';

export const supabase = createClient(supabaseUrl, supabaseKey);

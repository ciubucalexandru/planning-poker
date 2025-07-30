import dotenv from 'dotenv';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from './types';

const SUPABASE_URL = dotenv.config().parsed?.SUPABASE_URL;
const SUPABASE_KEY = dotenv.config().parsed?.SUPABASE_KEY;

const supabase: SupabaseClient<Database> = createClient<Database>(SUPABASE_URL, SUPABASE_KEY);

export default supabase;

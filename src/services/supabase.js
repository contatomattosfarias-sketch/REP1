import { createClient } from '@supabase/supabase-js';

// Suas credenciais reais
const SUPABASE_URL = "https://gikzawgaalmjggwkmrua.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpa3phd2dhYWxtamdnd2ttcnVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ4NTQ2MzcsImV4cCI6MjA4MDQzMDYzN30.hZ-UA2oDzkuOTt7JejvBbRQzf1KIbiu9HyskjQvIhfM";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
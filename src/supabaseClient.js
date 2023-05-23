import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mzuqlrknsylnjbevfytt.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16dXFscmtuc3lsbmpiZXZmeXR0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODQ3MzQ3NzAsImV4cCI6MjAwMDMxMDc3MH0.dCqWNAqeQb_BZBSFHDLhTnkxpchS8rQbs2MxFpQLM7s';

const supabase = createClient(
  supabaseUrl, 
  supabaseKey
);

export default supabase;
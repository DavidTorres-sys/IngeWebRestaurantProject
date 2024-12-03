import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jowhklhwmcnveabcsmup.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd2hrbGh3bWNudmVhYmNzbXVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNzExNjIsImV4cCI6MjA0Njk0NzE2Mn0.7gAaUYpnA7OsNUwa9teC0HhBms8H57VPBat_vIc5Iq0"; 

export const supabase = createClient(supabaseUrl, supabaseKey);

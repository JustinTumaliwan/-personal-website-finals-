import { Injectable } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class AppService {
  private supabase: SupabaseClient;

  constructor() {
    // This connects to your Supabase database using environment variables
    this.supabase = createClient(
      process.env.SUPABASE_URL || 'https://fwwlwjfsluxgxuosdfvr.supabase.co',
      process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3d2x3amZzbHV4Z3h1b3NkZnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4NDgwOTcsImV4cCI6MjA4NDQyNDA5N30.-Ea4ngAG3yq3FoeLtZjMnVoqvfOrrmv6fqVfuymyIBM'
    );
  }

  async getMessages() {
    const { data, error } = await this.supabase
      .from('paddock_guestbook')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw new Error(error.message);
    return data;
  }

  async addMessage(visitor_name: string, message: string) {
    const { data, error } = await this.supabase
      .from('paddock_guestbook')
      .insert([{ visitor_name, message }]);
    if (error) throw new Error(error.message);
    return data;
  }
}
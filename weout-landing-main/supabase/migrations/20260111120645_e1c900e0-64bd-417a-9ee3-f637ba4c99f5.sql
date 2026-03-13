-- Create beta signups table
CREATE TABLE public.beta_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for public signup form)
CREATE POLICY "Anyone can insert beta signups" 
ON public.beta_signups 
FOR INSERT 
WITH CHECK (true);

-- Only service role can read (for admin purposes)
CREATE POLICY "Service role can read signups" 
ON public.beta_signups 
FOR SELECT 
USING (false);

-- Create index on email for faster lookups
CREATE INDEX idx_beta_signups_email ON public.beta_signups(email);
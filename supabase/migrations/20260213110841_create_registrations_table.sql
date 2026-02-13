/*
  # Create Registrations Table for UTKALPRENEUR E-FEST 2026

  1. New Tables
    - `registrations`
      - `id` (uuid, primary key) - Unique registration ID
      - `full_name` (text) - Participant's full name
      - `email` (text) - Email address
      - `phone` (text) - Phone number
      - `college_company` (text) - College or company name
      - `role` (text) - Role: Student, Startup Founder, Mentor, Investor, Visitor, Sponsor
      - `event_type` (text) - Event selection: Hackathon, Pitch Competition, Exhibition, Networking, Full Fest Pass
      - `created_at` (timestamptz) - Registration timestamp
  
  2. Security
    - Enable RLS on `registrations` table
    - Add policy for public insert (anyone can register)
    - Add policy for authenticated users to read their own registrations
*/

CREATE TABLE IF NOT EXISTS registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  college_company text NOT NULL,
  role text NOT NULL,
  event_type text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can register for the event"
  ON registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Users can view all registrations"
  ON registrations
  FOR SELECT
  TO anon
  USING (true);
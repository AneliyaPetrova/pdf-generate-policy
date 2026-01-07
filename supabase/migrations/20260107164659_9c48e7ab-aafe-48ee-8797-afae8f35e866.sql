-- Insert admin role for specific email
-- This will be triggered after the user registers with this email
-- Create a function to auto-assign admin role for specific email
CREATE OR REPLACE FUNCTION public.check_and_assign_admin_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the user email is the admin email
  IF NEW.email = 'aneliya_admin@abv.bg' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger to check admin email on user creation
DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.check_and_assign_admin_role();
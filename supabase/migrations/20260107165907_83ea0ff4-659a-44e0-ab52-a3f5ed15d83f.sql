-- Add DELETE policy for profiles table (needed for GDPR right to erasure)
CREATE POLICY "Users can delete their own profile"
ON public.profiles
FOR DELETE
USING (auth.uid() = user_id);

-- Add DELETE policy for user_roles (needed for account deletion)
CREATE POLICY "Users can delete their own roles"
ON public.user_roles
FOR DELETE
USING (auth.uid() = user_id);
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface PendingInvitation {
  invitation_id: string;
  company_id: string;
  company_name: string;
  email: string;
  name: string;
  surname: string;
  role_id: string;
  role_display_name: string | null;
  invited_by_full_name: string | null;
  invited_at: string | null;
  expires_at: string | null;
  days_until_expiry: number | null;
  worker_data: Record<string, unknown> | null;
  custom_permissions: Record<string, unknown> | null;
}

interface UsePendingInvitationsReturn {
  invitations: PendingInvitation[];
  loading: boolean;
  error: string | null;
  fetchInvitations: (userEmail: string, userId?: string) => Promise<PendingInvitation[]>;
  acceptInvitation: (invitation: PendingInvitation, userId: string) => Promise<boolean>;
  declineInvitation: (invitationId: string) => Promise<boolean>;
  processingId: string | null;
}

export function usePendingInvitations(): UsePendingInvitationsReturn {
  const [invitations, setInvitations] = useState<PendingInvitation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchInvitations = useCallback(async (userEmail: string, userId?: string): Promise<PendingInvitation[]> => {
    setLoading(true);
    setError(null);

    try {
      // Build query to find pending invitations by email or user_id
      let query = supabase
        .from('v_worker_invitations')
        .select('*')
        .eq('is_expired', false)
        .or(`computed_status.eq.pending,computed_status.is.null`)
        .is('accepted_at', null)
        .is('rejected_at', null);

      // Filter by email (case-insensitive) or user_id
      if (userId) {
        query = query.or(`email.ilike.${userEmail},user_id.eq.${userId}`);
      } else {
        query = query.ilike('email', userEmail);
      }

      query = query.order('invited_at', { ascending: false });

      const { data, error: fetchError } = await query;

      if (fetchError) {
        console.error('Error fetching invitations:', fetchError);
        setError(fetchError.message);
        return [];
      }

      if (!data || data.length === 0) {
        setInvitations([]);
        return [];
      }

      // Fetch company names for all invitations
      const companyIds = [...new Set(data.map(inv => inv.company_id))];
      const { data: companies } = await supabase
        .from('companies')
        .select('id, name')
        .in('id', companyIds);

      const companyMap = new Map(companies?.map(c => [c.id, c.name]) || []);

      const formattedInvitations: PendingInvitation[] = data.map(inv => ({
        invitation_id: inv.invitation_id,
        company_id: inv.company_id,
        company_name: companyMap.get(inv.company_id) || 'Unknown Company',
        email: inv.email,
        name: inv.name,
        surname: inv.surname,
        role_id: inv.role_id,
        role_display_name: inv.role_display_name,
        invited_by_full_name: inv.invited_by_full_name,
        invited_at: inv.invited_at,
        expires_at: inv.expires_at,
        days_until_expiry: inv.days_until_expiry,
        worker_data: inv.worker_data,
        custom_permissions: inv.custom_permissions,
      }));

      setInvitations(formattedInvitations);
      return formattedInvitations;
    } catch (err: any) {
      console.error('Unexpected error fetching invitations:', err);
      setError(err.message || 'Failed to fetch invitations');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptInvitation = useCallback(async (invitation: PendingInvitation, userId: string): Promise<boolean> => {
    setProcessingId(invitation.invitation_id);
    setError(null);

    try {
      // 1. Update the invitation status
      const { error: updateError } = await supabase
        .from('user_invitations')
        .update({
          accepted_at: new Date().toISOString(),
          status: 'accepted',
          user_id: userId,
        })
        .eq('id', invitation.invitation_id);

      if (updateError) {
        console.error('Error updating invitation:', updateError);
        setError(updateError.message);
        return false;
      }

      // 2. Create user_companies entry
      const { error: companyError } = await supabase
        .from('user_companies')
        .insert({
          user_id: userId,
          company_id: invitation.company_id,
          role_id: invitation.role_id,
          work_areas: [], // Required field - empty array as default
        });

      if (companyError) {
        // Check if it's a duplicate - user might already be in the company
        if (companyError.code === '23505') {
          console.log('User already in company, continuing...');
        } else {
          console.error('Error creating user_companies entry:', companyError);
          setError(companyError.message);
          return false;
        }
      }

      // 3. Handle custom permissions if present
      if (invitation.custom_permissions && Object.keys(invitation.custom_permissions).length > 0) {
        // Insert custom permission overrides
        const permissionOverrides = Object.entries(invitation.custom_permissions).map(([permissionId, value]) => ({
          user_id: userId,
          company_id: invitation.company_id,
          permission_id: permissionId,
          is_granted: value,
        }));

        if (permissionOverrides.length > 0) {
          await supabase
            .from('user_permission_overrides')
            .upsert(permissionOverrides, { onConflict: 'user_id,company_id,permission_id' });
        }
      }

      // 4. Remove from local state
      setInvitations(prev => prev.filter(inv => inv.invitation_id !== invitation.invitation_id));

      return true;
    } catch (err: any) {
      console.error('Unexpected error accepting invitation:', err);
      setError(err.message || 'Failed to accept invitation');
      return false;
    } finally {
      setProcessingId(null);
    }
  }, []);

  const declineInvitation = useCallback(async (invitationId: string): Promise<boolean> => {
    setProcessingId(invitationId);
    setError(null);

    try {
      const { error: updateError } = await supabase
        .from('user_invitations')
        .update({
          rejected_at: new Date().toISOString(),
          status: 'rejected',
        })
        .eq('id', invitationId);

      if (updateError) {
        console.error('Error declining invitation:', updateError);
        setError(updateError.message);
        return false;
      }

      // Remove from local state
      setInvitations(prev => prev.filter(inv => inv.invitation_id !== invitationId));

      return true;
    } catch (err: any) {
      console.error('Unexpected error declining invitation:', err);
      setError(err.message || 'Failed to decline invitation');
      return false;
    } finally {
      setProcessingId(null);
    }
  }, []);

  return {
    invitations,
    loading,
    error,
    fetchInvitations,
    acceptInvitation,
    declineInvitation,
    processingId,
  };
}

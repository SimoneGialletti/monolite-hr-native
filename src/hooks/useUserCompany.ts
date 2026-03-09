import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface UserCompany {
  id: string;
  company_id: string;
  company_name: string;
  role_id: string | null;
}

export function useUserCompany() {
  const { user } = useAuth();
  const [companies, setCompanies] = useState<UserCompany[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setCompanies([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from('user_companies')
        .select('id, company_id, role_id, companies:company_id(name)')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user companies:', error);
        setCompanies([]);
        return;
      }

      const mapped = (data || []).map((uc: any) => ({
        id: uc.id,
        company_id: uc.company_id,
        company_name: uc.companies?.name || 'Unknown',
        role_id: uc.role_id,
      }));

      setCompanies(mapped);
    } catch (err) {
      console.error('Error in useUserCompany:', err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    companies,
    hasCompany: companies.length > 0,
    loading,
    refresh,
  };
}

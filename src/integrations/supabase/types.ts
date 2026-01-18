export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      acube_business_registrations: {
        Row: {
          authorization_completed_at: string | null
          authorization_error: string | null
          authorization_requested_at: string | null
          authorization_status:
            | Database["public"]["Enums"]["acube_authorization_status"]
            | null
          business_registry_config_id: string | null
          company_id: string
          created_at: string | null
          created_by: string | null
          id: string
          last_customer_invoice_date: string | null
          last_supplier_invoice_date: string | null
          last_sync_at: string | null
          last_sync_error: string | null
          last_sync_status:
            | Database["public"]["Enums"]["acube_sync_status"]
            | null
          sync_customer_invoices: boolean | null
          sync_notifications: boolean | null
          sync_supplier_invoices: boolean | null
          tax_code: string
          total_invoices_imported: number | null
          updated_at: string | null
        }
        Insert: {
          authorization_completed_at?: string | null
          authorization_error?: string | null
          authorization_requested_at?: string | null
          authorization_status?:
            | Database["public"]["Enums"]["acube_authorization_status"]
            | null
          business_registry_config_id?: string | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_customer_invoice_date?: string | null
          last_supplier_invoice_date?: string | null
          last_sync_at?: string | null
          last_sync_error?: string | null
          last_sync_status?:
            | Database["public"]["Enums"]["acube_sync_status"]
            | null
          sync_customer_invoices?: boolean | null
          sync_notifications?: boolean | null
          sync_supplier_invoices?: boolean | null
          tax_code: string
          total_invoices_imported?: number | null
          updated_at?: string | null
        }
        Update: {
          authorization_completed_at?: string | null
          authorization_error?: string | null
          authorization_requested_at?: string | null
          authorization_status?:
            | Database["public"]["Enums"]["acube_authorization_status"]
            | null
          business_registry_config_id?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          last_customer_invoice_date?: string | null
          last_supplier_invoice_date?: string | null
          last_sync_at?: string | null
          last_sync_error?: string | null
          last_sync_status?:
            | Database["public"]["Enums"]["acube_sync_status"]
            | null
          sync_customer_invoices?: boolean | null
          sync_notifications?: boolean | null
          sync_supplier_invoices?: boolean | null
          tax_code?: string
          total_invoices_imported?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acube_business_registrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acube_business_registrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acube_business_registrations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      acube_configurations: {
        Row: {
          acube_email_encrypted: string | null
          acube_password_encrypted: string | null
          api_key_id: string | null
          appointee_id: string | null
          appointee_tax_code: string | null
          created_at: string | null
          created_by: string | null
          credentials_expires_at: string | null
          credentials_status:
            | Database["public"]["Enums"]["acube_credential_status"]
            | null
          environment: Database["public"]["Enums"]["acube_environment"] | null
          fisconline_password_encrypted: string | null
          fisconline_pin_encrypted: string | null
          fisconline_user_encrypted: string | null
          id: string
          is_active: boolean | null
          jwt_expires_at: string | null
          jwt_token: string | null
          last_api_call_at: string | null
          last_credential_check: string | null
          last_error: string | null
          private_key_encrypted: string | null
          updated_at: string | null
          webhook_registered_at: string | null
          webhook_secret: string | null
          webhook_url: string | null
        }
        Insert: {
          acube_email_encrypted?: string | null
          acube_password_encrypted?: string | null
          api_key_id?: string | null
          appointee_id?: string | null
          appointee_tax_code?: string | null
          created_at?: string | null
          created_by?: string | null
          credentials_expires_at?: string | null
          credentials_status?:
            | Database["public"]["Enums"]["acube_credential_status"]
            | null
          environment?: Database["public"]["Enums"]["acube_environment"] | null
          fisconline_password_encrypted?: string | null
          fisconline_pin_encrypted?: string | null
          fisconline_user_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          jwt_expires_at?: string | null
          jwt_token?: string | null
          last_api_call_at?: string | null
          last_credential_check?: string | null
          last_error?: string | null
          private_key_encrypted?: string | null
          updated_at?: string | null
          webhook_registered_at?: string | null
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Update: {
          acube_email_encrypted?: string | null
          acube_password_encrypted?: string | null
          api_key_id?: string | null
          appointee_id?: string | null
          appointee_tax_code?: string | null
          created_at?: string | null
          created_by?: string | null
          credentials_expires_at?: string | null
          credentials_status?:
            | Database["public"]["Enums"]["acube_credential_status"]
            | null
          environment?: Database["public"]["Enums"]["acube_environment"] | null
          fisconline_password_encrypted?: string | null
          fisconline_pin_encrypted?: string | null
          fisconline_user_encrypted?: string | null
          id?: string
          is_active?: boolean | null
          jwt_expires_at?: string | null
          jwt_token?: string | null
          last_api_call_at?: string | null
          last_credential_check?: string | null
          last_error?: string | null
          private_key_encrypted?: string | null
          updated_at?: string | null
          webhook_registered_at?: string | null
          webhook_secret?: string | null
          webhook_url?: string | null
        }
        Relationships: []
      }
      acube_invoice_mappings: {
        Row: {
          acube_invoice_id: string | null
          document_type: string | null
          id: string
          import_source:
            | Database["public"]["Enums"]["acube_import_source"]
            | null
          imported_at: string | null
          invoice_direction: Database["public"]["Enums"]["acube_invoice_direction"]
          invoice_id: string
          original_pdf_path: string | null
          original_xml_path: string | null
          registration_id: string | null
          sdi_identifier: string
          sync_log_id: string | null
        }
        Insert: {
          acube_invoice_id?: string | null
          document_type?: string | null
          id?: string
          import_source?:
            | Database["public"]["Enums"]["acube_import_source"]
            | null
          imported_at?: string | null
          invoice_direction: Database["public"]["Enums"]["acube_invoice_direction"]
          invoice_id: string
          original_pdf_path?: string | null
          original_xml_path?: string | null
          registration_id?: string | null
          sdi_identifier: string
          sync_log_id?: string | null
        }
        Update: {
          acube_invoice_id?: string | null
          document_type?: string | null
          id?: string
          import_source?:
            | Database["public"]["Enums"]["acube_import_source"]
            | null
          imported_at?: string | null
          invoice_direction?: Database["public"]["Enums"]["acube_invoice_direction"]
          invoice_id?: string
          original_pdf_path?: string | null
          original_xml_path?: string | null
          registration_id?: string | null
          sdi_identifier?: string
          sync_log_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "acube_invoice_mappings_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acube_invoice_mappings_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_unallocated_invoices"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "acube_invoice_mappings_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "acube_business_registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acube_invoice_mappings_sync_log_id_fkey"
            columns: ["sync_log_id"]
            isOneToOne: false
            referencedRelation: "acube_sync_logs"
            referencedColumns: ["id"]
          },
        ]
      }
      acube_sync_logs: {
        Row: {
          acube_request_id: string | null
          completed_at: string | null
          created_at: string | null
          duration_ms: number | null
          error_code: string | null
          error_details: Json | null
          error_message: string | null
          id: string
          invoices_failed: number | null
          invoices_found: number | null
          invoices_imported: number | null
          invoices_skipped: number | null
          registration_id: string | null
          request_id: string | null
          started_at: string | null
          status: Database["public"]["Enums"]["acube_log_status"]
          sync_source: Database["public"]["Enums"]["acube_sync_source"] | null
          sync_type: Database["public"]["Enums"]["acube_sync_type"]
          webhook_payload: Json | null
        }
        Insert: {
          acube_request_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_ms?: number | null
          error_code?: string | null
          error_details?: Json | null
          error_message?: string | null
          id?: string
          invoices_failed?: number | null
          invoices_found?: number | null
          invoices_imported?: number | null
          invoices_skipped?: number | null
          registration_id?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["acube_log_status"]
          sync_source?: Database["public"]["Enums"]["acube_sync_source"] | null
          sync_type: Database["public"]["Enums"]["acube_sync_type"]
          webhook_payload?: Json | null
        }
        Update: {
          acube_request_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          duration_ms?: number | null
          error_code?: string | null
          error_details?: Json | null
          error_message?: string | null
          id?: string
          invoices_failed?: number | null
          invoices_found?: number | null
          invoices_imported?: number | null
          invoices_skipped?: number | null
          registration_id?: string | null
          request_id?: string | null
          started_at?: string | null
          status?: Database["public"]["Enums"]["acube_log_status"]
          sync_source?: Database["public"]["Enums"]["acube_sync_source"] | null
          sync_type?: Database["public"]["Enums"]["acube_sync_type"]
          webhook_payload?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "acube_sync_logs_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "acube_business_registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      administrative_divisions: {
        Row: {
          admin_code_1: string | null
          admin_code_2: string | null
          admin_code_3: string | null
          admin_code_4: string | null
          admin_level: number
          alternate_names: string[] | null
          country_id: string
          created_at: string | null
          dem: number | null
          elevation: number | null
          geoname_id: number
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          name_ascii: string | null
          parent_division_id: string | null
          population: number | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          admin_code_1?: string | null
          admin_code_2?: string | null
          admin_code_3?: string | null
          admin_code_4?: string | null
          admin_level?: number
          alternate_names?: string[] | null
          country_id: string
          created_at?: string | null
          dem?: number | null
          elevation?: number | null
          geoname_id: number
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          name_ascii?: string | null
          parent_division_id?: string | null
          population?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_code_1?: string | null
          admin_code_2?: string | null
          admin_code_3?: string | null
          admin_code_4?: string | null
          admin_level?: number
          alternate_names?: string[] | null
          country_id?: string
          created_at?: string | null
          dem?: number | null
          elevation?: number | null
          geoname_id?: number
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          name_ascii?: string | null
          parent_division_id?: string | null
          population?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "administrative_divisions_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "administrative_divisions_parent_division_id_fkey"
            columns: ["parent_division_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
        ]
      }
      apple_identities: {
        Row: {
          apple_subject: string
          created_at: string | null
          email_snapshot: string | null
          id: string
          last_sign_in_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          apple_subject: string
          created_at?: string | null
          email_snapshot?: string | null
          id?: string
          last_sign_in_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          apple_subject?: string
          created_at?: string | null
          email_snapshot?: string | null
          id?: string
          last_sign_in_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "apple_identities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apple_identities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apple_identities_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      boq_articles: {
        Row: {
          boq_id: string
          created_at: string | null
          description: string
          id: string
          id_in_boq: string
          measure_unit_id: string
          order_number: number
          order_number_string: string | null
          quantity: number | null
          total_price: number | null
          unit_price: number | null
          updated_at: string | null
          work_category_id: string
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Insert: {
          boq_id: string
          created_at?: string | null
          description: string
          id?: string
          id_in_boq: string
          measure_unit_id: string
          order_number: number
          order_number_string?: string | null
          quantity?: number | null
          total_price?: number | null
          unit_price?: number | null
          updated_at?: string | null
          work_category_id: string
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Update: {
          boq_id?: string
          created_at?: string | null
          description?: string
          id?: string
          id_in_boq?: string
          measure_unit_id?: string
          order_number?: number
          order_number_string?: string | null
          quantity?: number | null
          total_price?: number | null
          unit_price?: number | null
          updated_at?: string | null
          work_category_id?: string
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boq_articles_boq_id_fkey"
            columns: ["boq_id"]
            isOneToOne: false
            referencedRelation: "project_estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_boq_id_fkey"
            columns: ["boq_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_id"]
          },
          {
            foreignKeyName: "boq_articles_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_category_id_fkey"
            columns: ["work_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_sub_category_id_fkey"
            columns: ["work_sub_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      cities: {
        Row: {
          admin_division_1_id: string | null
          admin_division_2_id: string | null
          admin_division_3_id: string | null
          admin_division_4_id: string | null
          alternate_names: string[] | null
          country_id: string
          created_at: string | null
          dem: number | null
          elevation: number | null
          feature_class: string
          feature_code: string
          geoname_id: number
          id: string
          latitude: number
          longitude: number
          modification_date: string | null
          name: string
          name_ascii: string | null
          population: number | null
          timezone: string | null
          updated_at: string | null
        }
        Insert: {
          admin_division_1_id?: string | null
          admin_division_2_id?: string | null
          admin_division_3_id?: string | null
          admin_division_4_id?: string | null
          alternate_names?: string[] | null
          country_id: string
          created_at?: string | null
          dem?: number | null
          elevation?: number | null
          feature_class?: string
          feature_code: string
          geoname_id: number
          id?: string
          latitude: number
          longitude: number
          modification_date?: string | null
          name: string
          name_ascii?: string | null
          population?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Update: {
          admin_division_1_id?: string | null
          admin_division_2_id?: string | null
          admin_division_3_id?: string | null
          admin_division_4_id?: string | null
          alternate_names?: string[] | null
          country_id?: string
          created_at?: string | null
          dem?: number | null
          elevation?: number | null
          feature_class?: string
          feature_code?: string
          geoname_id?: number
          id?: string
          latitude?: number
          longitude?: number
          modification_date?: string | null
          name?: string
          name_ascii?: string | null
          population?: number | null
          timezone?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cities_admin_division_1_id_fkey"
            columns: ["admin_division_1_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_admin_division_2_id_fkey"
            columns: ["admin_division_2_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_admin_division_3_id_fkey"
            columns: ["admin_division_3_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_admin_division_4_id_fkey"
            columns: ["admin_division_4_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          avatar_url: string | null
          city_id: string | null
          company_type_id: string
          country_id: string | null
          created_at: string | null
          default_language_code: string | null
          email: string | null
          id: string
          industry_id: string
          name: string
          phone_number: string | null
          postal_code: string | null
          service_description: string | null
          updated_at: string | null
          vat: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          company_type_id: string
          country_id?: string | null
          created_at?: string | null
          default_language_code?: string | null
          email?: string | null
          id?: string
          industry_id: string
          name: string
          phone_number?: string | null
          postal_code?: string | null
          service_description?: string | null
          updated_at?: string | null
          vat?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          company_type_id?: string
          country_id?: string | null
          created_at?: string | null
          default_language_code?: string | null
          email?: string | null
          id?: string
          industry_id?: string
          name?: string
          phone_number?: string | null
          postal_code?: string | null
          service_description?: string | null
          updated_at?: string | null
          vat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_company_type_id_fkey"
            columns: ["company_type_id"]
            isOneToOne: false
            referencedRelation: "company_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      company_brands: {
        Row: {
          brand_id: string
          company_id: string
          created_at: string | null
          created_by: string
          id: string
          is_active: boolean | null
        }
        Insert: {
          brand_id: string
          company_id: string
          created_at?: string | null
          created_by: string
          id?: string
          is_active?: boolean | null
        }
        Update: {
          brand_id?: string
          company_id?: string
          created_at?: string | null
          created_by?: string
          id?: string
          is_active?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "company_brands_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "item_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_brands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_brands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_brands_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_document_type_config: {
        Row: {
          company_id: string
          created_at: string
          custom_display_name: string | null
          custom_expiry_warning_days: number | null
          display_order: number
          document_type_id: string
          id: string
          is_enabled: boolean
          is_required: boolean
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          custom_display_name?: string | null
          custom_expiry_warning_days?: number | null
          display_order?: number
          document_type_id: string
          id?: string
          is_enabled?: boolean
          is_required?: boolean
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          custom_display_name?: string | null
          custom_expiry_warning_days?: number | null
          display_order?: number
          document_type_id?: string
          id?: string
          is_enabled?: boolean
          is_required?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_document_type_config_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_document_type_config_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_document_type_config_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_document_type_config_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_document_type_config_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_compliance_summary"
            referencedColumns: ["document_type_id"]
          },
          {
            foreignKeyName: "company_document_type_config_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_type_id"]
          },
          {
            foreignKeyName: "company_document_type_config_document_type_id_fkey"
            columns: ["document_type_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["type_id"]
          },
        ]
      }
      company_documents: {
        Row: {
          approval_date: string | null
          approved_by: string | null
          company_id: string
          created_at: string | null
          description: string | null
          document_date: string | null
          document_number: string | null
          document_type: string
          expiry_date: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_confidential: boolean | null
          mime_type: string
          parent_document_id: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
          uploaded_by: string
          version: number | null
        }
        Insert: {
          approval_date?: string | null
          approved_by?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          document_date?: string | null
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_confidential?: boolean | null
          mime_type: string
          parent_document_id?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
          uploaded_by: string
          version?: number | null
        }
        Update: {
          approval_date?: string | null
          approved_by?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          document_date?: string | null
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_confidential?: boolean | null
          mime_type?: string
          parent_document_id?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
          uploaded_by?: string
          version?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "company_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_documents_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "company_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_invoices: {
        Row: {
          accounting_regime: string | null
          accounting_section: string | null
          ai_confidence: string | null
          ai_extracted_at: string | null
          ai_notes: string | null
          code: string | null
          company_id: string
          competence_from: string | null
          competence_to: string | null
          cost_center_code: string | null
          cost_center_description: string | null
          cost_revenue_type: string | null
          counterparty_company_id: string | null
          created_at: string | null
          currency: string | null
          customer_supplier_code: string | null
          customer_supplier_description: string | null
          customer_supplier_vat_number: string | null
          description: string | null
          document_date: string | null
          document_number: string | null
          document_protocol: string | null
          file_url: string | null
          id: string
          import_source: string | null
          invoice_category_id: string | null
          invoice_type: number
          job_code: string | null
          job_description: string | null
          operation_type: string | null
          operation_type_description: string | null
          payment_date: string | null
          payment_due_date: string | null
          registration_number: number | null
          subaccount_code: string | null
          subaccount_description: string | null
          tax_code: string | null
          taxable_amount: number | null
          total_document_amount: number | null
          updated_at: string | null
          vat_activity_description: string | null
          vat_activity_number: number | null
          vat_amount: number | null
          vat_code: string | null
          vat_number: string | null
        }
        Insert: {
          accounting_regime?: string | null
          accounting_section?: string | null
          ai_confidence?: string | null
          ai_extracted_at?: string | null
          ai_notes?: string | null
          code?: string | null
          company_id: string
          competence_from?: string | null
          competence_to?: string | null
          cost_center_code?: string | null
          cost_center_description?: string | null
          cost_revenue_type?: string | null
          counterparty_company_id?: string | null
          created_at?: string | null
          currency?: string | null
          customer_supplier_code?: string | null
          customer_supplier_description?: string | null
          customer_supplier_vat_number?: string | null
          description?: string | null
          document_date?: string | null
          document_number?: string | null
          document_protocol?: string | null
          file_url?: string | null
          id?: string
          import_source?: string | null
          invoice_category_id?: string | null
          invoice_type: number
          job_code?: string | null
          job_description?: string | null
          operation_type?: string | null
          operation_type_description?: string | null
          payment_date?: string | null
          payment_due_date?: string | null
          registration_number?: number | null
          subaccount_code?: string | null
          subaccount_description?: string | null
          tax_code?: string | null
          taxable_amount?: number | null
          total_document_amount?: number | null
          updated_at?: string | null
          vat_activity_description?: string | null
          vat_activity_number?: number | null
          vat_amount?: number | null
          vat_code?: string | null
          vat_number?: string | null
        }
        Update: {
          accounting_regime?: string | null
          accounting_section?: string | null
          ai_confidence?: string | null
          ai_extracted_at?: string | null
          ai_notes?: string | null
          code?: string | null
          company_id?: string
          competence_from?: string | null
          competence_to?: string | null
          cost_center_code?: string | null
          cost_center_description?: string | null
          cost_revenue_type?: string | null
          counterparty_company_id?: string | null
          created_at?: string | null
          currency?: string | null
          customer_supplier_code?: string | null
          customer_supplier_description?: string | null
          customer_supplier_vat_number?: string | null
          description?: string | null
          document_date?: string | null
          document_number?: string | null
          document_protocol?: string | null
          file_url?: string | null
          id?: string
          import_source?: string | null
          invoice_category_id?: string | null
          invoice_type?: number
          job_code?: string | null
          job_description?: string | null
          operation_type?: string | null
          operation_type_description?: string | null
          payment_date?: string | null
          payment_due_date?: string | null
          registration_number?: number | null
          subaccount_code?: string | null
          subaccount_description?: string | null
          tax_code?: string | null
          taxable_amount?: number | null
          total_document_amount?: number | null
          updated_at?: string | null
          vat_activity_description?: string | null
          vat_activity_number?: number | null
          vat_amount?: number | null
          vat_code?: string | null
          vat_number?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_invoices_counterparty_company_id_fkey"
            columns: ["counterparty_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_counterparty_company_id_fkey"
            columns: ["counterparty_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_counterparty_company_id_fkey"
            columns: ["counterparty_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_invoices_invoice_category_id_fkey"
            columns: ["invoice_category_id"]
            isOneToOne: false
            referencedRelation: "invoice_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      company_relationship_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          company_relationship_id: string
          created_at: string
          document_id: string
          id: string
          notes: string | null
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          company_relationship_id: string
          created_at?: string
          document_id: string
          id?: string
          notes?: string | null
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          company_relationship_id?: string
          created_at?: string
          document_id?: string
          id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_relationship_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationship_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationship_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "company_relationship_documents_company_relationship_id_fkey"
            columns: ["company_relationship_id"]
            isOneToOne: false
            referencedRelation: "company_relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationship_documents_company_relationship_id_fkey"
            columns: ["company_relationship_id"]
            isOneToOne: false
            referencedRelation: "v_company_suppliers"
            referencedColumns: ["relationship_id"]
          },
          {
            foreignKeyName: "company_relationship_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationship_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "company_relationship_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
        ]
      }
      company_relationships: {
        Row: {
          company_id: string
          created_at: string | null
          id: string
          related_company_id: string
          relationship_type: string
          updated_at: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          id?: string
          related_company_id: string
          relationship_type: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          id?: string
          related_company_id?: string
          relationship_type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["related_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["related_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["related_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      company_role_permissions: {
        Row: {
          company_id: string
          customized_at: string | null
          customized_by: string
          id: string
          is_granted: boolean
          notes: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          company_id: string
          customized_at?: string | null
          customized_by: string
          id?: string
          is_granted?: boolean
          notes?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          company_id?: string
          customized_at?: string | null
          customized_by?: string
          id?: string
          is_granted?: boolean
          notes?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_role_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "company_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "company_role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "company_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "company_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "company_role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
        ]
      }
      company_store_items: {
        Row: {
          avatar_url: string | null
          barcode: string | null
          brand_id: string | null
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          item_category_id: string
          max_stock_quantity: number
          measure_unit_id: string
          min_stok_quantity: number
          name: string
          supplier_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          avatar_url?: string | null
          barcode?: string | null
          brand_id?: string | null
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          item_category_id: string
          max_stock_quantity: number
          measure_unit_id: string
          min_stok_quantity: number
          name: string
          supplier_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          avatar_url?: string | null
          barcode?: string | null
          brand_id?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          item_category_id?: string
          max_stock_quantity?: number
          measure_unit_id?: string
          min_stok_quantity?: number
          name?: string
          supplier_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_store_items_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "item_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["item_macro_category_id"]
          },
          {
            foreignKeyName: "company_store_items_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      company_types: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      construction_allocation_details: {
        Row: {
          allocation_id: string
          boq_article_id: string | null
          boq_id: string | null
          boq_type_id: string | null
          cost_unforeseen: number | null
          cost_without_unforeseen: number | null
          created_at: string
          id: string
          metadata: Json | null
          sal_number: number | null
          sal_type_id: string | null
          updated_at: string
          work_category_id: string | null
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Insert: {
          allocation_id: string
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_unforeseen?: number | null
          cost_without_unforeseen?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          sal_number?: number | null
          sal_type_id?: string | null
          updated_at?: string
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Update: {
          allocation_id?: string
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_unforeseen?: number | null
          cost_without_unforeseen?: number | null
          created_at?: string
          id?: string
          metadata?: Json | null
          sal_number?: number | null
          sal_type_id?: string | null
          updated_at?: string
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_allocation_details_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: true
            referencedRelation: "invoice_movement_project_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_allocation_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "boq_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_allocation_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_allocation_details_sal_type_id_fkey"
            columns: ["sal_type_id"]
            isOneToOne: false
            referencedRelation: "sal_types"
            referencedColumns: ["id"]
          },
        ]
      }
      construction_cost_center_details: {
        Row: {
          code_numeric: string | null
          cost_center_id: string
          created_at: string | null
          estimate_id: string
          estimate_type_id: string | null
          legacy_boq_depth_id: string | null
          legacy_boq_id: string | null
          legacy_boq_type_id: string | null
          legacy_work_category_id: string | null
          metadata: Json | null
          price_list_id: string | null
          progress_report_type_id: string | null
          structure_level_id: string | null
          updated_at: string | null
        }
        Insert: {
          code_numeric?: string | null
          cost_center_id: string
          created_at?: string | null
          estimate_id: string
          estimate_type_id?: string | null
          legacy_boq_depth_id?: string | null
          legacy_boq_id?: string | null
          legacy_boq_type_id?: string | null
          legacy_work_category_id?: string | null
          metadata?: Json | null
          price_list_id?: string | null
          progress_report_type_id?: string | null
          structure_level_id?: string | null
          updated_at?: string | null
        }
        Update: {
          code_numeric?: string | null
          cost_center_id?: string
          created_at?: string | null
          estimate_id?: string
          estimate_type_id?: string | null
          legacy_boq_depth_id?: string | null
          legacy_boq_id?: string | null
          legacy_boq_type_id?: string | null
          legacy_work_category_id?: string | null
          metadata?: Json | null
          price_list_id?: string | null
          progress_report_type_id?: string | null
          structure_level_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_cost_center_details_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: true
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "project_estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_progress_report_type_id_fkey"
            columns: ["progress_report_type_id"]
            isOneToOne: false
            referencedRelation: "sal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "estimate_structure_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_depth_id"]
          },
        ]
      }
      construction_estimate_details: {
        Row: {
          created_at: string | null
          document_id: string | null
          estimate_id: string
          is_parent_estimate: boolean | null
          legacy_boq_depth_id: string | null
          legacy_boq_id: string | null
          legacy_boq_type_id: string | null
          metadata: Json | null
          progress_report_number: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          document_id?: string | null
          estimate_id: string
          is_parent_estimate?: boolean | null
          legacy_boq_depth_id?: string | null
          legacy_boq_id?: string | null
          legacy_boq_type_id?: string | null
          metadata?: Json | null
          progress_report_number?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          document_id?: string | null
          estimate_id?: string
          is_parent_estimate?: boolean | null
          legacy_boq_depth_id?: string | null
          legacy_boq_id?: string | null
          legacy_boq_type_id?: string | null
          metadata?: Json | null
          progress_report_number?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_estimate_details_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_estimate_details_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "construction_estimate_details_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "construction_estimate_details_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: true
            referencedRelation: "project_estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_estimate_details_estimate_id_fkey"
            columns: ["estimate_id"]
            isOneToOne: true
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_id"]
          },
        ]
      }
      construction_site_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          document_phase: string | null
          id: string
          notes: string | null
          site_id: string
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          document_phase?: string | null
          id?: string
          notes?: string | null
          site_id: string
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          document_phase?: string | null
          id?: string
          notes?: string | null
          site_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "site_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "site_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "site_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
        ]
      }
      construction_sites: {
        Row: {
          actual_end_date: string | null
          address_line_1: string | null
          address_line_2: string | null
          avatar_url: string | null
          city_id: string | null
          created_at: string | null
          description: string | null
          expected_end_date: string | null
          id: string
          location_id: string | null
          name: string
          owner_company_id: string
          project_id: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          workflow_step: number | null
        }
        Insert: {
          actual_end_date?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          expected_end_date?: string | null
          id?: string
          location_id?: string | null
          name: string
          owner_company_id: string
          project_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          workflow_step?: number | null
        }
        Update: {
          actual_end_date?: string | null
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          description?: string | null
          expected_end_date?: string | null
          id?: string
          location_id?: string | null
          name?: string
          owner_company_id?: string
          project_id?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          workflow_step?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_sites_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["owner_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["owner_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["owner_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "construction_sites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "construction_sites_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
        ]
      }
      construction_transaction_details: {
        Row: {
          boq_article_id: string | null
          boq_id: string | null
          boq_type_id: string | null
          cost_unforeseen: number | null
          cost_without_unforeseen: number | null
          created_at: string
          created_by: string | null
          forecast_card_id: string | null
          id: string
          metadata: Json | null
          sal_number: number | null
          sal_type_id: string | null
          transaction_id: string
          updated_at: string
          updated_by: string | null
          work_category_id: string | null
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Insert: {
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_unforeseen?: number | null
          cost_without_unforeseen?: number | null
          created_at?: string
          created_by?: string | null
          forecast_card_id?: string | null
          id?: string
          metadata?: Json | null
          sal_number?: number | null
          sal_type_id?: string | null
          transaction_id: string
          updated_at?: string
          updated_by?: string | null
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Update: {
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_unforeseen?: number | null
          cost_without_unforeseen?: number | null
          created_at?: string
          created_by?: string | null
          forecast_card_id?: string | null
          id?: string
          metadata?: Json | null
          sal_number?: number | null
          sal_type_id?: string | null
          transaction_id?: string
          updated_at?: string
          updated_by?: string | null
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_transaction_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "boq_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "construction_transaction_details_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "forecast_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_allocations_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "construction_transaction_details_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "construction_transaction_details_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_with_margin"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "construction_transaction_details_sal_type_id_fkey"
            columns: ["sal_type_id"]
            isOneToOne: false
            referencedRelation: "sal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_transaction_id_fkey"
            columns: ["transaction_id"]
            isOneToOne: true
            referencedRelation: "project_transactions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_transaction_details_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      construction_work_hours_details: {
        Row: {
          absence_reason: string | null
          boq_article_id: string | null
          boq_id: string | null
          boq_type_id: string | null
          cost_center_id: string | null
          created_at: string
          delay_minutes: number | null
          emergency_description: string | null
          holiday_name: string | null
          id: string
          inail_protocol_number: string | null
          is_emergency_work: boolean | null
          is_national_holiday: boolean | null
          is_regional_holiday: boolean | null
          medical_certificate_url: string | null
          metadata: Json | null
          rain_hours: number | null
          sal_number: number | null
          sal_type_id: string | null
          substitute_user_id: string | null
          updated_at: string
          work_category_id: string | null
          work_hours_id: string
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Insert: {
          absence_reason?: string | null
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_center_id?: string | null
          created_at?: string
          delay_minutes?: number | null
          emergency_description?: string | null
          holiday_name?: string | null
          id?: string
          inail_protocol_number?: string | null
          is_emergency_work?: boolean | null
          is_national_holiday?: boolean | null
          is_regional_holiday?: boolean | null
          medical_certificate_url?: string | null
          metadata?: Json | null
          rain_hours?: number | null
          sal_number?: number | null
          sal_type_id?: string | null
          substitute_user_id?: string | null
          updated_at?: string
          work_category_id?: string | null
          work_hours_id: string
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Update: {
          absence_reason?: string | null
          boq_article_id?: string | null
          boq_id?: string | null
          boq_type_id?: string | null
          cost_center_id?: string | null
          created_at?: string
          delay_minutes?: number | null
          emergency_description?: string | null
          holiday_name?: string | null
          id?: string
          inail_protocol_number?: string | null
          is_emergency_work?: boolean | null
          is_national_holiday?: boolean | null
          is_regional_holiday?: boolean | null
          medical_certificate_url?: string | null
          metadata?: Json | null
          rain_hours?: number | null
          sal_number?: number | null
          sal_type_id?: string | null
          substitute_user_id?: string | null
          updated_at?: string
          work_category_id?: string | null
          work_hours_id?: string
          work_sub_category_id?: string | null
          work_super_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_work_hours_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "boq_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_sal_type_id_fkey"
            columns: ["sal_type_id"]
            isOneToOne: false
            referencedRelation: "sal_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_substitute_user_id_fkey"
            columns: ["substitute_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_substitute_user_id_fkey"
            columns: ["substitute_user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_substitute_user_id_fkey"
            columns: ["substitute_user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_work_hours_id_fkey"
            columns: ["work_hours_id"]
            isOneToOne: true
            referencedRelation: "v_production_footprint"
            referencedColumns: ["work_hours_id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_work_hours_id_fkey"
            columns: ["work_hours_id"]
            isOneToOne: true
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["work_hours_id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_work_hours_id_fkey"
            columns: ["work_hours_id"]
            isOneToOne: true
            referencedRelation: "v_workers_hours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_work_hours_id_fkey"
            columns: ["work_hours_id"]
            isOneToOne: true
            referencedRelation: "work_hours"
            referencedColumns: ["id"]
          },
        ]
      }
      cost_centers: {
        Row: {
          code: string
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          hierarchy_level: number | null
          id: string
          industry_id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          parent_ids: string[] | null
          project_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          hierarchy_level?: number | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          parent_ids?: string[] | null
          project_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          hierarchy_level?: number | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          parent_ids?: string[] | null
          project_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cost_centers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "cost_centers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "cost_centers_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "cost_centers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "cost_centers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cost_centers_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      countries: {
        Row: {
          area_sq_km: number | null
          capital: string | null
          continent_code: string
          created_at: string | null
          currency_code: string | null
          currency_name: string | null
          equivalent_fips_code: string | null
          fips_code: string | null
          geoname_id: number
          id: string
          iso_code_2: string
          iso_code_3: string
          iso_numeric: string
          languages: string[] | null
          name: string
          name_it: string | null
          name_local: string | null
          neighbors: string[] | null
          phone_prefix: string | null
          population: number | null
          postal_code_format: string | null
          postal_code_regex: string | null
          timezone: string | null
          tld: string | null
          updated_at: string | null
        }
        Insert: {
          area_sq_km?: number | null
          capital?: string | null
          continent_code: string
          created_at?: string | null
          currency_code?: string | null
          currency_name?: string | null
          equivalent_fips_code?: string | null
          fips_code?: string | null
          geoname_id: number
          id?: string
          iso_code_2: string
          iso_code_3: string
          iso_numeric: string
          languages?: string[] | null
          name: string
          name_it?: string | null
          name_local?: string | null
          neighbors?: string[] | null
          phone_prefix?: string | null
          population?: number | null
          postal_code_format?: string | null
          postal_code_regex?: string | null
          timezone?: string | null
          tld?: string | null
          updated_at?: string | null
        }
        Update: {
          area_sq_km?: number | null
          capital?: string | null
          continent_code?: string
          created_at?: string | null
          currency_code?: string | null
          currency_name?: string | null
          equivalent_fips_code?: string | null
          fips_code?: string | null
          geoname_id?: number
          id?: string
          iso_code_2?: string
          iso_code_3?: string
          iso_numeric?: string
          languages?: string[] | null
          name?: string
          name_it?: string | null
          name_local?: string | null
          neighbors?: string[] | null
          phone_prefix?: string | null
          population?: number | null
          postal_code_format?: string | null
          postal_code_regex?: string | null
          timezone?: string | null
          tld?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      document_activity_log: {
        Row: {
          action: string
          created_at: string | null
          details: string | null
          document_id: string
          id: string
          ip_address: unknown
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: string | null
          document_id: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: string | null
          document_id?: string
          id?: string
          ip_address?: unknown
          user_agent?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_activity_log_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "company_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_activity_log_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_macro_types: {
        Row: {
          code: string
          created_at: string
          description: string | null
          display_order: number
          icon: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          description?: string | null
          display_order?: number
          icon?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      document_permissions: {
        Row: {
          company_id: string
          document_id: string
          expires_at: string | null
          granted_at: string | null
          granted_by: string
          id: string
          permission_type: string
          user_id: string
        }
        Insert: {
          company_id: string
          document_id: string
          expires_at?: string | null
          granted_at?: string | null
          granted_by: string
          id?: string
          permission_type: string
          user_id: string
        }
        Update: {
          company_id?: string
          document_id?: string
          expires_at?: string | null
          granted_at?: string | null
          granted_by?: string
          id?: string
          permission_type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "document_permissions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "company_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_granted_by_fkey"
            columns: ["granted_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "document_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_permissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_relationships: {
        Row: {
          child_document_id: string
          created_at: string
          created_by: string | null
          id: string
          notes: string | null
          parent_document_id: string
          relationship_type: string
        }
        Insert: {
          child_document_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          parent_document_id: string
          relationship_type: string
        }
        Update: {
          child_document_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          notes?: string | null
          parent_document_id?: string
          relationship_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_relationships_child_document_id_fkey"
            columns: ["child_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_relationships_child_document_id_fkey"
            columns: ["child_document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "document_relationships_child_document_id_fkey"
            columns: ["child_document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "document_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_relationships_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "document_relationships_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_relationships_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "document_relationships_parent_document_id_fkey"
            columns: ["parent_document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
        ]
      }
      document_tags: {
        Row: {
          color: string | null
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          updated_at: string
        }
        Insert: {
          color?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          updated_at?: string
        }
        Update: {
          color?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_tags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "document_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_tags_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_type_tags: {
        Row: {
          document_id: string
          id: string
          tag_id: string
          tagged_at: string
          tagged_by: string | null
        }
        Insert: {
          document_id: string
          id?: string
          tag_id: string
          tagged_at?: string
          tagged_by?: string | null
        }
        Update: {
          document_id?: string
          id?: string
          tag_id?: string
          tagged_at?: string
          tagged_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_type_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_type_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "document_type_tags_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "document_type_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "document_tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_type_tags_tagged_by_fkey"
            columns: ["tagged_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_type_tags_tagged_by_fkey"
            columns: ["tagged_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_type_tags_tagged_by_fkey"
            columns: ["tagged_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      document_types: {
        Row: {
          code: string
          created_at: string
          default_expiry_warning_days: number | null
          description: string | null
          display_order: number
          id: string
          industry_ids: string[] | null
          is_active: boolean
          is_system_defined: boolean
          macro_type_id: string
          metadata: Json | null
          name: string
          requires_expiry: boolean
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          default_expiry_warning_days?: number | null
          description?: string | null
          display_order?: number
          id?: string
          industry_ids?: string[] | null
          is_active?: boolean
          is_system_defined?: boolean
          macro_type_id: string
          metadata?: Json | null
          name: string
          requires_expiry?: boolean
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          default_expiry_warning_days?: number | null
          description?: string | null
          display_order?: number
          id?: string
          industry_ids?: string[] | null
          is_active?: boolean
          is_system_defined?: boolean
          macro_type_id?: string
          metadata?: Json | null
          name?: string
          requires_expiry?: boolean
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "document_types_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "document_macro_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_types_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_compliance_summary"
            referencedColumns: ["macro_type_id"]
          },
          {
            foreignKeyName: "document_types_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["macro_type_id"]
          },
        ]
      }
      document_vectors: {
        Row: {
          chunk_index: number
          chunk_text: string
          company_id: string
          created_at: string
          document_id: string
          embedding: string | null
          id: string
          metadata: Json | null
          page_number: number | null
          updated_at: string
          vectorization_error: string | null
          vectorization_status: string | null
        }
        Insert: {
          chunk_index: number
          chunk_text: string
          company_id: string
          created_at?: string
          document_id: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          page_number?: number | null
          updated_at?: string
          vectorization_error?: string | null
          vectorization_status?: string | null
        }
        Update: {
          chunk_index?: number
          chunk_text?: string
          company_id?: string
          created_at?: string
          document_id?: string
          embedding?: string | null
          id?: string
          metadata?: Json | null
          page_number?: number | null
          updated_at?: string
          vectorization_error?: string | null
          vectorization_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "document_vectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_vectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_vectors_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "document_vectors_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "document_vectors_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "document_vectors_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
        ]
      }
      documents: {
        Row: {
          company_id: string
          created_at: string | null
          document_number: string | null
          expiry_date: string | null
          file_name: string | null
          file_size: number | null
          file_url: string | null
          id: string
          issue_date: string | null
          issuing_authority: string | null
          macro_type_id: string | null
          metadata: Json | null
          mime_type: string | null
          notes: string | null
          status: string
          type_id: string | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          verified_at: string | null
          verified_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          document_number?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          macro_type_id?: string | null
          metadata?: Json | null
          mime_type?: string | null
          notes?: string | null
          status?: string
          type_id?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          document_number?: string | null
          expiry_date?: string | null
          file_name?: string | null
          file_size?: number | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority?: string | null
          macro_type_id?: string | null
          metadata?: Json | null
          mime_type?: string | null
          notes?: string | null
          status?: string
          type_id?: string | null
          updated_at?: string | null
          uploaded_at?: string | null
          uploaded_by?: string | null
          verified_at?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "documents_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "document_macro_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_compliance_summary"
            referencedColumns: ["macro_type_id"]
          },
          {
            foreignKeyName: "documents_macro_type_id_fkey"
            columns: ["macro_type_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["macro_type_id"]
          },
          {
            foreignKeyName: "documents_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "document_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "v_document_compliance_summary"
            referencedColumns: ["document_type_id"]
          },
          {
            foreignKeyName: "documents_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_type_id"]
          },
          {
            foreignKeyName: "documents_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["type_id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      estimate_structure_levels: {
        Row: {
          code: string
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          id: string
          industry_id: string
          is_active: boolean | null
          level_number: number
          metadata: Json | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          level_number: number
          metadata?: Json | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          level_number?: number
          metadata?: Json | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimate_structure_levels_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_structure_levels_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      estimate_types: {
        Row: {
          code: string
          company_id: string
          created_at: string | null
          created_by: string | null
          description: string | null
          display_order: number | null
          id: string
          industry_id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code: string
          company_id: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "estimate_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "estimate_types_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "estimate_types_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "estimate_types_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      fiscal_periods: {
        Row: {
          closed_at: string | null
          closed_by: string | null
          code: string
          company_id: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          end_date: string
          id: string
          is_active: boolean | null
          is_closed: boolean | null
          parent_period_id: string | null
          period_type: string
          sort_order: number | null
          start_date: string
          updated_at: string
        }
        Insert: {
          closed_at?: string | null
          closed_by?: string | null
          code: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          end_date: string
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          parent_period_id?: string | null
          period_type: string
          sort_order?: number | null
          start_date: string
          updated_at?: string
        }
        Update: {
          closed_at?: string | null
          closed_by?: string | null
          code?: string
          company_id?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          end_date?: string
          id?: string
          is_active?: boolean | null
          is_closed?: boolean | null
          parent_period_id?: string | null
          period_type?: string
          sort_order?: number | null
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fiscal_periods_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fiscal_periods_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fiscal_periods_closed_by_fkey"
            columns: ["closed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "fiscal_periods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fiscal_periods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fiscal_periods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "fiscal_periods_parent_period_id_fkey"
            columns: ["parent_period_id"]
            isOneToOne: false
            referencedRelation: "fiscal_periods"
            referencedColumns: ["id"]
          },
        ]
      }
      forecast_card_categories: {
        Row: {
          category_type: string
          created_at: string
          forecast_card_id: string
          id: string
          work_category_id: string
        }
        Insert: {
          category_type: string
          created_at?: string
          forecast_card_id: string
          id?: string
          work_category_id: string
        }
        Update: {
          category_type?: string
          created_at?: string
          forecast_card_id?: string
          id?: string
          work_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forecast_card_categories_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "forecast_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_card_categories_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_allocations_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "forecast_card_categories_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "forecast_card_categories_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_with_margin"
            referencedColumns: ["forecast_card_id"]
          },
        ]
      }
      forecast_cards: {
        Row: {
          boq_type_id: string
          construction_site_id: string
          created_at: string
          created_by: string
          id: string
          name: string | null
          status: string
          updated_at: string
          updated_by: string | null
          work_super_category_id: string
        }
        Insert: {
          boq_type_id: string
          construction_site_id: string
          created_at?: string
          created_by: string
          id?: string
          name?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
          work_super_category_id: string
        }
        Update: {
          boq_type_id?: string
          construction_site_id?: string
          created_at?: string
          created_by?: string
          id?: string
          name?: string | null
          status?: string
          updated_at?: string
          updated_by?: string | null
          work_super_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      forecast_cost_allocations: {
        Row: {
          allocated_cost: number
          allocated_imprevisti: number
          allocated_total: number | null
          created_at: string
          forecast_cost_item_id: string
          forecasted_revenue: number
          id: string
          weight_percentage: number
          work_category_id: string | null
          work_sub_category_id: string | null
          work_super_category_id: string
        }
        Insert: {
          allocated_cost?: number
          allocated_imprevisti?: number
          allocated_total?: number | null
          created_at?: string
          forecast_cost_item_id: string
          forecasted_revenue?: number
          id?: string
          weight_percentage?: number
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id: string
        }
        Update: {
          allocated_cost?: number
          allocated_imprevisti?: number
          allocated_total?: number | null
          created_at?: string
          forecast_cost_item_id?: string
          forecasted_revenue?: number
          id?: string
          weight_percentage?: number
          work_category_id?: string | null
          work_sub_category_id?: string | null
          work_super_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cost_allocations_forecast_cost_item_id_fkey"
            columns: ["forecast_cost_item_id"]
            isOneToOne: false
            referencedRelation: "forecast_cost_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_category_id_fkey"
            columns: ["work_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_sub_category_id_fkey"
            columns: ["work_sub_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      forecast_cost_items: {
        Row: {
          created_at: string
          created_by: string
          description: string
          display_order: number
          forecast_card_id: string
          id: string
          imprevisti_amount: number | null
          imprevisti_percentage: number
          measure_unit_id: string
          quantity: number
          total_cost: number | null
          unit_price: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description: string
          display_order?: number
          forecast_card_id: string
          id?: string
          imprevisti_amount?: number | null
          imprevisti_percentage?: number
          measure_unit_id: string
          quantity?: number
          total_cost?: number | null
          unit_price?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string
          display_order?: number
          forecast_card_id?: string
          id?: string
          imprevisti_amount?: number | null
          imprevisti_percentage?: number
          measure_unit_id?: string
          quantity?: number
          total_cost?: number | null
          unit_price?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cost_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cost_items_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "forecast_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_allocations_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "forecast_cost_items_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_summary"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "forecast_cost_items_forecast_card_id_fkey"
            columns: ["forecast_card_id"]
            isOneToOne: false
            referencedRelation: "v_forecast_card_with_margin"
            referencedColumns: ["forecast_card_id"]
          },
          {
            foreignKeyName: "forecast_cost_items_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      import_batch_transactions: {
        Row: {
          batch_id: string
          transaction_id: string
          transaction_type: string | null
        }
        Insert: {
          batch_id: string
          transaction_id: string
          transaction_type?: string | null
        }
        Update: {
          batch_id?: string
          transaction_id?: string
          transaction_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "import_batch_transactions_batch_id_fkey"
            columns: ["batch_id"]
            isOneToOne: false
            referencedRelation: "import_batches"
            referencedColumns: ["id"]
          },
        ]
      }
      import_batches: {
        Row: {
          company_id: string
          construction_site_id: string
          cost_transaction_count: number | null
          created_at: string | null
          error_message: string | null
          file_name: string | null
          file_path: string
          id: string
          import_date: string | null
          revenue_transaction_count: number | null
          status: string | null
          total_cost_with_unforeseen: number | null
          total_cost_without_unforeseen: number | null
          total_revenue: number | null
          total_unforeseen: number | null
          transaction_count: number | null
          user_id: string
        }
        Insert: {
          company_id: string
          construction_site_id: string
          cost_transaction_count?: number | null
          created_at?: string | null
          error_message?: string | null
          file_name?: string | null
          file_path: string
          id?: string
          import_date?: string | null
          revenue_transaction_count?: number | null
          status?: string | null
          total_cost_with_unforeseen?: number | null
          total_cost_without_unforeseen?: number | null
          total_revenue?: number | null
          total_unforeseen?: number | null
          transaction_count?: number | null
          user_id: string
        }
        Update: {
          company_id?: string
          construction_site_id?: string
          cost_transaction_count?: number | null
          created_at?: string | null
          error_message?: string | null
          file_name?: string | null
          file_path?: string
          id?: string
          import_date?: string | null
          revenue_transaction_count?: number | null
          status?: string | null
          total_cost_with_unforeseen?: number | null
          total_cost_without_unforeseen?: number | null
          total_revenue?: number | null
          total_unforeseen?: number | null
          transaction_count?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "fk_import_batches_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "import_batches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "import_batches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "import_batches_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      industries: {
        Row: {
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      industry_terminology: {
        Row: {
          created_at: string | null
          description: string | null
          display_name_en: string
          display_name_it: string
          id: string
          industry_id: string
          term_key: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name_en: string
          display_name_it: string
          id?: string
          industry_id: string
          term_key: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          id?: string
          industry_id?: string
          term_key?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_terminology_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      industry_work_types: {
        Row: {
          display_name_en: string
          display_name_it: string
          id: string
          industry_id: string
          is_active: boolean | null
          is_overtime: boolean | null
          name: string
          overtime_multiplier: number | null
        }
        Insert: {
          display_name_en: string
          display_name_it: string
          id?: string
          industry_id: string
          is_active?: boolean | null
          is_overtime?: boolean | null
          name: string
          overtime_multiplier?: number | null
        }
        Update: {
          display_name_en?: string
          display_name_it?: string
          id?: string
          industry_id?: string
          is_active?: boolean | null
          is_overtime?: boolean | null
          name?: string
          overtime_multiplier?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "industry_work_types_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movement_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          id: string
          inventory_movement_id: string
          notes: string | null
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          id?: string
          inventory_movement_id: string
          notes?: string | null
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          id?: string
          inventory_movement_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_inventory_movement_id_fkey"
            columns: ["inventory_movement_id"]
            isOneToOne: false
            referencedRelation: "inventory_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movement_documents_inventory_movement_id_fkey"
            columns: ["inventory_movement_id"]
            isOneToOne: false
            referencedRelation: "v_inventory_movements"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          batch_id: string
          company_id: string
          created_at: string | null
          created_by: string
          from_location_id: string | null
          from_location_type: string | null
          from_project_id: string | null
          id: string
          invoice_movement_id: string | null
          item_id: string
          material_request_detail_id: string | null
          movement_date: string | null
          movement_reason: string | null
          movement_type: number
          notes: string | null
          purchase_order_id: string | null
          quantity_moved: number
          return_reason_description: string | null
          supplier_company_id: string | null
          supplier_item_id: string | null
          to_location_id: string | null
          to_location_type: string | null
          to_project_id: string | null
          total_cost: number
          total_price: number
          unitary_cost: number
          unitary_price: number
        }
        Insert: {
          batch_id: string
          company_id: string
          created_at?: string | null
          created_by: string
          from_location_id?: string | null
          from_location_type?: string | null
          from_project_id?: string | null
          id?: string
          invoice_movement_id?: string | null
          item_id: string
          material_request_detail_id?: string | null
          movement_date?: string | null
          movement_reason?: string | null
          movement_type: number
          notes?: string | null
          purchase_order_id?: string | null
          quantity_moved: number
          return_reason_description?: string | null
          supplier_company_id?: string | null
          supplier_item_id?: string | null
          to_location_id?: string | null
          to_location_type?: string | null
          to_project_id?: string | null
          total_cost: number
          total_price: number
          unitary_cost: number
          unitary_price: number
        }
        Update: {
          batch_id?: string
          company_id?: string
          created_at?: string | null
          created_by?: string
          from_location_id?: string | null
          from_location_type?: string | null
          from_project_id?: string | null
          id?: string
          invoice_movement_id?: string | null
          item_id?: string
          material_request_detail_id?: string | null
          movement_date?: string | null
          movement_reason?: string | null
          movement_type?: number
          notes?: string | null
          purchase_order_id?: string | null
          quantity_moved?: number
          return_reason_description?: string | null
          supplier_company_id?: string | null
          supplier_item_id?: string | null
          to_location_id?: string | null
          to_location_type?: string | null
          to_project_id?: string | null
          total_cost?: number
          total_price?: number
          unitary_cost?: number
          unitary_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_invoice_movement_id_fkey"
            columns: ["invoice_movement_id"]
            isOneToOne: false
            referencedRelation: "invoice_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_material_request_detail_id_fkey"
            columns: ["material_request_detail_id"]
            isOneToOne: false
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["material_request_detail_id"]
          },
          {
            foreignKeyName: "inventory_movements_material_request_detail_id_fkey"
            columns: ["material_request_detail_id"]
            isOneToOne: false
            referencedRelation: "worker_material_request_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
        ]
      }
      invoice_categories: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          examples: string[] | null
          id: string
          is_active: boolean | null
          macro_category: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          examples?: string[] | null
          id?: string
          is_active?: boolean | null
          macro_category: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          examples?: string[] | null
          id?: string
          is_active?: boolean | null
          macro_category?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoice_classification_errors: {
        Row: {
          attempt_number: number
          created_at: string | null
          error_context: Json | null
          error_message: string
          id: string
          invoice_id: string
          queue_id: string
        }
        Insert: {
          attempt_number: number
          created_at?: string | null
          error_context?: Json | null
          error_message: string
          id?: string
          invoice_id: string
          queue_id: string
        }
        Update: {
          attempt_number?: number
          created_at?: string | null
          error_context?: Json | null
          error_message?: string
          id?: string
          invoice_id?: string
          queue_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "invoice_classification_errors_queue_id_fkey"
            columns: ["queue_id"]
            isOneToOne: false
            referencedRelation: "invoice_classification_queue"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_classification_queue: {
        Row: {
          attempts: number | null
          classification_result: Json | null
          company_id: string
          completed_at: string | null
          created_at: string | null
          extracted_text: string | null
          extraction_metadata: Json | null
          file_type: string | null
          file_url: string | null
          id: string
          invoice_id: string
          last_error: string | null
          max_attempts: number | null
          priority: number | null
          queued_at: string | null
          started_at: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          attempts?: number | null
          classification_result?: Json | null
          company_id: string
          completed_at?: string | null
          created_at?: string | null
          extracted_text?: string | null
          extraction_metadata?: Json | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          invoice_id: string
          last_error?: string | null
          max_attempts?: number | null
          priority?: number | null
          queued_at?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          attempts?: number | null
          classification_result?: Json | null
          company_id?: string
          completed_at?: string | null
          created_at?: string | null
          extracted_text?: string | null
          extraction_metadata?: Json | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          invoice_id?: string
          last_error?: string | null
          max_attempts?: number | null
          priority?: number | null
          queued_at?: string | null
          started_at?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_classification_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_classification_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_classification_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "invoice_classification_queue_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_classification_queue_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_unallocated_invoices"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      invoice_documents: {
        Row: {
          created_at: string | null
          created_by: string | null
          document_id: string
          id: string
          invoice_id: string
          is_primary: boolean | null
          relationship_type: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          document_id: string
          id?: string
          invoice_id: string
          is_primary?: boolean | null
          relationship_type?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          document_id?: string
          id?: string
          invoice_id?: string
          is_primary?: boolean | null
          relationship_type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invoice_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "invoice_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "invoice_documents_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_documents_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_unallocated_invoices"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      invoice_movement_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          id: string
          invoice_movement_id: string
          notes: string | null
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          id?: string
          invoice_movement_id: string
          notes?: string | null
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          id?: string
          invoice_movement_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "invoice_movement_documents_invoice_movement_id_fkey"
            columns: ["invoice_movement_id"]
            isOneToOne: false
            referencedRelation: "invoice_movements"
            referencedColumns: ["id"]
          },
        ]
      }
      invoice_movement_project_allocations: {
        Row: {
          allocated_amount: number | null
          allocation_notes: string | null
          allocation_percentage: number
          cost_center_code: string | null
          cost_center_name: string | null
          created_at: string
          created_by: string | null
          fiscal_period_id: string | null
          id: string
          invoice_movement_id: string
          project_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          allocated_amount?: number | null
          allocation_notes?: string | null
          allocation_percentage?: number
          cost_center_code?: string | null
          cost_center_name?: string | null
          created_at?: string
          created_by?: string | null
          fiscal_period_id?: string | null
          id?: string
          invoice_movement_id: string
          project_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          allocated_amount?: number | null
          allocation_notes?: string | null
          allocation_percentage?: number
          cost_center_code?: string | null
          cost_center_name?: string | null
          created_at?: string
          created_by?: string | null
          fiscal_period_id?: string | null
          id?: string
          invoice_movement_id?: string
          project_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_movement_project_allocations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_fiscal_period_id_fkey"
            columns: ["fiscal_period_id"]
            isOneToOne: false
            referencedRelation: "fiscal_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_invoice_movement_id_fkey"
            columns: ["invoice_movement_id"]
            isOneToOne: false
            referencedRelation: "invoice_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movement_project_allocations_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      invoice_movements: {
        Row: {
          balancing: string
          created_at: string | null
          id: string
          invoice_id: string
          line_amount: number
          line_competence_from: string | null
          line_competence_to: string | null
          line_number: number
          line_progressive: string
          movement_amount: number
          movement_date: string
          movement_description: string | null
          movement_number: number
          movement_status: string
          movement_status_description: string | null
          operation_description: string | null
          protocol: number | null
          rule_code: string | null
          subaccount_extension: string | null
          tax_amount: number | null
          taxable_amount: number | null
          total_line_amount: number
          updated_at: string | null
        }
        Insert: {
          balancing: string
          created_at?: string | null
          id?: string
          invoice_id: string
          line_amount: number
          line_competence_from?: string | null
          line_competence_to?: string | null
          line_number: number
          line_progressive: string
          movement_amount: number
          movement_date: string
          movement_description?: string | null
          movement_number: number
          movement_status?: string
          movement_status_description?: string | null
          operation_description?: string | null
          protocol?: number | null
          rule_code?: string | null
          subaccount_extension?: string | null
          tax_amount?: number | null
          taxable_amount?: number | null
          total_line_amount: number
          updated_at?: string | null
        }
        Update: {
          balancing?: string
          created_at?: string | null
          id?: string
          invoice_id?: string
          line_amount?: number
          line_competence_from?: string | null
          line_competence_to?: string | null
          line_number?: number
          line_progressive?: string
          movement_amount?: number
          movement_date?: string
          movement_description?: string | null
          movement_number?: number
          movement_status?: string
          movement_status_description?: string | null
          operation_description?: string | null
          protocol?: number | null
          rule_code?: string | null
          subaccount_extension?: string | null
          tax_amount?: number | null
          taxable_amount?: number | null
          total_line_amount?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoice_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoice_movements_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_unallocated_invoices"
            referencedColumns: ["invoice_id"]
          },
        ]
      }
      item_attributes: {
        Row: {
          attribute_date: string | null
          attribute_number: number | null
          attribute_string: string | null
          attribute_type: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          item_id: string
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          attribute_date?: string | null
          attribute_number?: number | null
          attribute_string?: string | null
          attribute_type: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          item_id: string
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          attribute_date?: string | null
          attribute_number?: number | null
          attribute_string?: string | null
          attribute_type?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          item_id?: string
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_attributes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "item_attributes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_attributes_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      item_brands: {
        Row: {
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_items_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_items_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_items_brands_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "store_items_brands_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_items_brands_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_items_brands_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      item_categories: {
        Row: {
          company_id: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          level?: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "item_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "item_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "item_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["item_macro_category_id"]
          },
          {
            foreignKeyName: "item_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "item_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      knowledge_notes: {
        Row: {
          company_id: string
          content: string
          created_at: string
          favorite: boolean | null
          id: string
          pinned: boolean | null
          tags: string[] | null
          title: string
          updated_at: string
          user_id: string
          visibility: string
        }
        Insert: {
          company_id: string
          content: string
          created_at?: string
          favorite?: boolean | null
          id?: string
          pinned?: boolean | null
          tags?: string[] | null
          title: string
          updated_at?: string
          user_id: string
          visibility?: string
        }
        Update: {
          company_id?: string
          content?: string
          created_at?: string
          favorite?: boolean | null
          id?: string
          pinned?: boolean | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          user_id?: string
          visibility?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      languages: {
        Row: {
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          is_default: boolean | null
          name: string
          native_name: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name: string
          native_name: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          is_default?: boolean | null
          name?: string
          native_name?: string
        }
        Relationships: []
      }
      leave_request_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          id: string
          is_required: boolean
          leave_request_id: string
          notes: string | null
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          id?: string
          is_required?: boolean
          leave_request_id: string
          notes?: string | null
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          id?: string
          is_required?: boolean
          leave_request_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "leave_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "leave_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "leave_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "leave_request_documents_leave_request_id_fkey"
            columns: ["leave_request_id"]
            isOneToOne: false
            referencedRelation: "worker_leave_request_details"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_request_types: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          description_it: string | null
          display_name: string
          display_name_it: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          is_paid: boolean | null
          name: string
          requires_document: boolean | null
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_it?: string | null
          display_name: string
          display_name_it?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          name: string
          requires_document?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_it?: string | null
          display_name?: string
          display_name_it?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          name?: string
          requires_document?: boolean | null
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      license_categories: {
        Row: {
          color_code: string | null
          company_id: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          color_code?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          color_code?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "license_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "license_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      license_types: {
        Row: {
          color_code: string | null
          company_id: string
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          color_code?: string | null
          company_id: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          color_code?: string | null
          company_id?: string
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "license_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "license_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "license_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      licenses: {
        Row: {
          alert_days_before_expiry: number | null
          approval_date: string | null
          approved_by: string | null
          attachment_path: string | null
          company_id: string | null
          conditions_restrictions: string | null
          construction_site_id: string | null
          created_at: string | null
          created_by: string
          currency: string | null
          description: string | null
          document_reference: string | null
          equipment_identifier: string | null
          expiration_date: string
          id: string
          issue_date: string | null
          issuing_authority: string
          issuing_authority_contact: string | null
          last_alert_sent: string | null
          license_category_id: string
          license_cost: number | null
          license_number: string | null
          license_type_id: string
          mandatory_for_work: boolean | null
          name: string
          notes: string | null
          renewal_cost: number | null
          renewal_date: string | null
          renewal_period_months: number | null
          renewal_required: boolean | null
          scope: number
          status: number
          supplier_company_id: string | null
          training_completion_date: string | null
          training_required: boolean | null
          updated_at: string | null
          user_id: string | null
          work_categories_applicable: string[] | null
        }
        Insert: {
          alert_days_before_expiry?: number | null
          approval_date?: string | null
          approved_by?: string | null
          attachment_path?: string | null
          company_id?: string | null
          conditions_restrictions?: string | null
          construction_site_id?: string | null
          created_at?: string | null
          created_by: string
          currency?: string | null
          description?: string | null
          document_reference?: string | null
          equipment_identifier?: string | null
          expiration_date: string
          id?: string
          issue_date?: string | null
          issuing_authority: string
          issuing_authority_contact?: string | null
          last_alert_sent?: string | null
          license_category_id: string
          license_cost?: number | null
          license_number?: string | null
          license_type_id: string
          mandatory_for_work?: boolean | null
          name: string
          notes?: string | null
          renewal_cost?: number | null
          renewal_date?: string | null
          renewal_period_months?: number | null
          renewal_required?: boolean | null
          scope: number
          status?: number
          supplier_company_id?: string | null
          training_completion_date?: string | null
          training_required?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          work_categories_applicable?: string[] | null
        }
        Update: {
          alert_days_before_expiry?: number | null
          approval_date?: string | null
          approved_by?: string | null
          attachment_path?: string | null
          company_id?: string | null
          conditions_restrictions?: string | null
          construction_site_id?: string | null
          created_at?: string | null
          created_by?: string
          currency?: string | null
          description?: string | null
          document_reference?: string | null
          equipment_identifier?: string | null
          expiration_date?: string
          id?: string
          issue_date?: string | null
          issuing_authority?: string
          issuing_authority_contact?: string | null
          last_alert_sent?: string | null
          license_category_id?: string
          license_cost?: number | null
          license_number?: string | null
          license_type_id?: string
          mandatory_for_work?: boolean | null
          name?: string
          notes?: string | null
          renewal_cost?: number | null
          renewal_date?: string | null
          renewal_period_months?: number | null
          renewal_required?: boolean | null
          scope?: number
          status?: number
          supplier_company_id?: string | null
          training_completion_date?: string | null
          training_required?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          work_categories_applicable?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "fk_licenses_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "licenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "licenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "licenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "licenses_license_category_id_fkey"
            columns: ["license_category_id"]
            isOneToOne: false
            referencedRelation: "license_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_license_type_id_fkey"
            columns: ["license_type_id"]
            isOneToOne: false
            referencedRelation: "license_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "licenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "licenses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      location_types: {
        Row: {
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          industry_id: string
          is_active: boolean | null
          is_primary: boolean | null
          name: string
          requires_metadata: Json | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          is_primary?: boolean | null
          name: string
          requires_metadata?: Json | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          is_primary?: boolean | null
          name?: string
          requires_metadata?: Json | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "location_types_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          address: string | null
          city: string | null
          company_id: string
          country: string | null
          created_at: string
          id: string
          is_active: boolean | null
          latitude: number | null
          location_type_id: string
          longitude: number | null
          max_workers: number | null
          metadata: Json | null
          name: string
          operating_hours_end: string | null
          operating_hours_start: string | null
          parent_location_id: string | null
          postal_code: string | null
          reference_id: string | null
          reference_type: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          location_type_id: string
          longitude?: number | null
          max_workers?: number | null
          metadata?: Json | null
          name: string
          operating_hours_end?: string | null
          operating_hours_start?: string | null
          parent_location_id?: string | null
          postal_code?: string | null
          reference_id?: string | null
          reference_type?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: string
          country?: string | null
          created_at?: string
          id?: string
          is_active?: boolean | null
          latitude?: number | null
          location_type_id?: string
          longitude?: number | null
          max_workers?: number | null
          metadata?: Json | null
          name?: string
          operating_hours_end?: string | null
          operating_hours_start?: string | null
          parent_location_id?: string | null
          postal_code?: string | null
          reference_id?: string | null
          reference_type?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "locations_location_type_id_fkey"
            columns: ["location_type_id"]
            isOneToOne: false
            referencedRelation: "location_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_parent_location_id_fkey"
            columns: ["parent_location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "locations_parent_location_id_fkey"
            columns: ["parent_location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
        ]
      }
      material_request_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          id: string
          is_required: boolean
          material_request_id: string
          notes: string | null
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          id?: string
          is_required?: boolean
          material_request_id: string
          notes?: string | null
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          id?: string
          is_required?: boolean
          material_request_id?: string
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "material_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_request_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "material_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "material_request_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "material_request_documents_request_fk"
            columns: ["material_request_id"]
            isOneToOne: false
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["request_id"]
          },
          {
            foreignKeyName: "material_request_documents_request_fk"
            columns: ["material_request_id"]
            isOneToOne: false
            referencedRelation: "v_worker_leave_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_request_documents_request_fk"
            columns: ["material_request_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "material_request_documents_request_fk"
            columns: ["material_request_id"]
            isOneToOne: false
            referencedRelation: "worker_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      measure_units: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      note_documents: {
        Row: {
          created_at: string
          document_id: string
          id: string
          note_id: string
        }
        Insert: {
          created_at?: string
          document_id: string
          id?: string
          note_id: string
        }
        Update: {
          created_at?: string
          document_id?: string
          id?: string
          note_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "note_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "note_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "note_documents_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "knowledge_notes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "note_documents_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "v_knowledge_notes_with_author"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_batch_queue: {
        Row: {
          app_id: string
          company_id: string
          created_at: string | null
          expiring_documents_count: number | null
          id: string
          manager_user_id: string
          pending_leave_requests: number | null
          pending_material_requests: number | null
          pending_requests_count: number | null
          processed_at: string | null
          scheduled_for: string
          summary_data: Json | null
        }
        Insert: {
          app_id?: string
          company_id: string
          created_at?: string | null
          expiring_documents_count?: number | null
          id?: string
          manager_user_id: string
          pending_leave_requests?: number | null
          pending_material_requests?: number | null
          pending_requests_count?: number | null
          processed_at?: string | null
          scheduled_for: string
          summary_data?: Json | null
        }
        Update: {
          app_id?: string
          company_id?: string
          created_at?: string | null
          expiring_documents_count?: number | null
          id?: string
          manager_user_id?: string
          pending_leave_requests?: number | null
          pending_material_requests?: number | null
          pending_requests_count?: number | null
          processed_at?: string | null
          scheduled_for?: string
          summary_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_batch_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_batch_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_batch_queue_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      notification_preferences: {
        Row: {
          app_id: string
          batch_notification_time: string | null
          batch_notification_timezone: string | null
          batch_notifications_enabled: boolean | null
          company_id: string | null
          created_at: string | null
          email_enabled: boolean | null
          id: string
          notify_announcements: boolean | null
          notify_document_expired: boolean | null
          notify_document_expiring: boolean | null
          notify_request_approved: boolean | null
          notify_request_rejected: boolean | null
          notify_request_submitted: boolean | null
          push_enabled: boolean | null
          quiet_hours_end: string | null
          quiet_hours_start: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          app_id?: string
          batch_notification_time?: string | null
          batch_notification_timezone?: string | null
          batch_notifications_enabled?: boolean | null
          company_id?: string | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notify_announcements?: boolean | null
          notify_document_expired?: boolean | null
          notify_document_expiring?: boolean | null
          notify_request_approved?: boolean | null
          notify_request_rejected?: boolean | null
          notify_request_submitted?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          app_id?: string
          batch_notification_time?: string | null
          batch_notification_timezone?: string | null
          batch_notifications_enabled?: boolean | null
          company_id?: string | null
          created_at?: string | null
          email_enabled?: boolean | null
          id?: string
          notify_announcements?: boolean | null
          notify_document_expired?: boolean | null
          notify_document_expiring?: boolean | null
          notify_request_approved?: boolean | null
          notify_request_rejected?: boolean | null
          notify_request_submitted?: boolean | null
          push_enabled?: boolean | null
          quiet_hours_end?: string | null
          quiet_hours_start?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      notifications: {
        Row: {
          app_id: string
          body: string
          company_id: string | null
          created_at: string | null
          deep_link_path: string | null
          dismissed_at: string | null
          entity_id: string | null
          entity_type: string | null
          expires_at: string | null
          id: string
          metadata: Json | null
          notification_type: string
          priority: string | null
          push_delivered_at: string | null
          push_error: string | null
          push_sent_at: string | null
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          app_id?: string
          body: string
          company_id?: string | null
          created_at?: string | null
          deep_link_path?: string | null
          dismissed_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          notification_type: string
          priority?: string | null
          push_delivered_at?: string | null
          push_error?: string | null
          push_sent_at?: string | null
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          app_id?: string
          body?: string
          company_id?: string | null
          created_at?: string | null
          deep_link_path?: string | null
          dismissed_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          expires_at?: string | null
          id?: string
          metadata?: Json | null
          notification_type?: string
          priority?: string | null
          push_delivered_at?: string | null
          push_error?: string | null
          push_sent_at?: string | null
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notifications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      permission_change_log: {
        Row: {
          action: string
          changed_at: string | null
          changed_by: string
          company_id: string
          id: string
          ip_address: unknown
          new_state: boolean | null
          permission_id: string
          previous_state: boolean | null
          reason: string | null
          role_id: string
          user_agent: string | null
        }
        Insert: {
          action: string
          changed_at?: string | null
          changed_by: string
          company_id: string
          id?: string
          ip_address?: unknown
          new_state?: boolean | null
          permission_id: string
          previous_state?: boolean | null
          reason?: string | null
          role_id: string
          user_agent?: string | null
        }
        Update: {
          action?: string
          changed_at?: string | null
          changed_by?: string
          company_id?: string
          id?: string
          ip_address?: unknown
          new_state?: boolean | null
          permission_id?: string
          previous_state?: boolean | null
          reason?: string | null
          role_id?: string
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_change_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_changed_by_fkey"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "permission_change_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "permission_change_log_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "permission_change_log_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "permission_change_log_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_change_log_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "permission_change_log_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "permission_change_log_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
        ]
      }
      permission_template_items: {
        Row: {
          id: string
          is_granted: boolean
          permission_id: string
          template_id: string
        }
        Insert: {
          id?: string
          is_granted?: boolean
          permission_id: string
          template_id: string
        }
        Update: {
          id?: string
          is_granted?: boolean
          permission_id?: string
          template_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "permission_template_items_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_template_items_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "permission_template_items_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "permission_template_items_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "permission_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      permission_templates: {
        Row: {
          base_role_id: string | null
          company_id: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          base_role_id?: string | null
          company_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          base_role_id?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_templates_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_templates_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "permission_templates_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "permission_templates_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "permission_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_templates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "permission_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_templates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      permission_translations: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          language_code: string
          permission_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          language_code: string
          permission_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          language_code?: string
          permission_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "permission_translations_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "permission_translations_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "permission_translations_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
        ]
      }
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource?: string
        }
        Relationships: []
      }
      postal_codes: {
        Row: {
          accuracy: number | null
          admin_code_1: string | null
          admin_code_2: string | null
          admin_code_3: string | null
          admin_division_1_id: string | null
          admin_division_2_id: string | null
          admin_name_1: string | null
          admin_name_2: string | null
          admin_name_3: string | null
          city_id: string | null
          country_id: string
          created_at: string | null
          id: string
          latitude: number | null
          longitude: number | null
          place_name: string | null
          postal_code: string
          updated_at: string | null
        }
        Insert: {
          accuracy?: number | null
          admin_code_1?: string | null
          admin_code_2?: string | null
          admin_code_3?: string | null
          admin_division_1_id?: string | null
          admin_division_2_id?: string | null
          admin_name_1?: string | null
          admin_name_2?: string | null
          admin_name_3?: string | null
          city_id?: string | null
          country_id: string
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          place_name?: string | null
          postal_code: string
          updated_at?: string | null
        }
        Update: {
          accuracy?: number | null
          admin_code_1?: string | null
          admin_code_2?: string | null
          admin_code_3?: string | null
          admin_division_1_id?: string | null
          admin_division_2_id?: string | null
          admin_name_1?: string | null
          admin_name_2?: string | null
          admin_name_3?: string | null
          city_id?: string | null
          country_id?: string
          created_at?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          place_name?: string | null
          postal_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "postal_codes_admin_division_1_id_fkey"
            columns: ["admin_division_1_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postal_codes_admin_division_2_id_fkey"
            columns: ["admin_division_2_id"]
            isOneToOne: false
            referencedRelation: "administrative_divisions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postal_codes_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "postal_codes_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          avatar_url: string | null
          city_id: string | null
          created_at: string | null
          date_of_birth: string | null
          email: string
          full_name: string | null
          has_completed_onboarding: boolean
          id: string
          name: string
          nationality_country_id: string | null
          phone: string | null
          preferred_language_code: string | null
          sex: string | null
          surname: string
          updated_at: string | null
        }
        Insert: {
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email: string
          full_name?: string | null
          has_completed_onboarding: boolean
          id: string
          name: string
          nationality_country_id?: string | null
          phone?: string | null
          preferred_language_code?: string | null
          sex?: string | null
          surname: string
          updated_at?: string | null
        }
        Update: {
          address_line_1?: string | null
          address_line_2?: string | null
          avatar_url?: string | null
          city_id?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          email?: string
          full_name?: string | null
          has_completed_onboarding?: boolean
          id?: string
          name?: string
          nationality_country_id?: string | null
          phone?: string | null
          preferred_language_code?: string | null
          sex?: string | null
          surname?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_nationality_country_id_fkey"
            columns: ["nationality_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      project_estimates: {
        Row: {
          company_id: string
          created_at: string | null
          created_by: string | null
          currency_code: string | null
          description: string | null
          discount: number | null
          estimate_type_id: string | null
          id: string
          industry_id: string
          is_active: boolean | null
          metadata: Json | null
          name: string
          project_id: string
          status: string | null
          structure_level_id: string | null
          updated_at: string | null
          updated_by: string | null
          version: string | null
        }
        Insert: {
          company_id: string
          created_at?: string | null
          created_by?: string | null
          currency_code?: string | null
          description?: string | null
          discount?: number | null
          estimate_type_id?: string | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          metadata?: Json | null
          name: string
          project_id: string
          status?: string | null
          structure_level_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string | null
          created_by?: string | null
          currency_code?: string | null
          description?: string | null
          discount?: number | null
          estimate_type_id?: string | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          metadata?: Json | null
          name?: string
          project_id?: string
          status?: string | null
          structure_level_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_estimates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "project_estimates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "project_estimates_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "project_estimates_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_estimates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_estimates_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "estimate_structure_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_depth_id"]
          },
          {
            foreignKeyName: "project_estimates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      project_statuses: {
        Row: {
          allowed_next_statuses: string[] | null
          code: string
          color_hex: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          is_terminal: boolean | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          allowed_next_statuses?: string[] | null
          code: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_terminal?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          allowed_next_statuses?: string[] | null
          code?: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_terminal?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      project_transactions: {
        Row: {
          allocation_id: string | null
          amount: number
          balancing: string
          cost_center_code: string | null
          cost_center_name: string | null
          created_at: string
          created_by: string | null
          currency_code: string | null
          description: string
          fiscal_period_id: string | null
          id: string
          invoice_id: string | null
          invoice_movement_id: string | null
          metadata: Json | null
          notes: string | null
          project_id: string
          transaction_date: string
          transaction_type_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          allocation_id?: string | null
          amount: number
          balancing: string
          cost_center_code?: string | null
          cost_center_name?: string | null
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          description: string
          fiscal_period_id?: string | null
          id?: string
          invoice_id?: string | null
          invoice_movement_id?: string | null
          metadata?: Json | null
          notes?: string | null
          project_id: string
          transaction_date: string
          transaction_type_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          allocation_id?: string | null
          amount?: number
          balancing?: string
          cost_center_code?: string | null
          cost_center_name?: string | null
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          description?: string
          fiscal_period_id?: string | null
          id?: string
          invoice_id?: string | null
          invoice_movement_id?: string | null
          metadata?: Json | null
          notes?: string | null
          project_id?: string
          transaction_date?: string
          transaction_type_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_transactions_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: false
            referencedRelation: "invoice_movement_project_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "project_transactions_fiscal_period_id_fkey"
            columns: ["fiscal_period_id"]
            isOneToOne: false
            referencedRelation: "fiscal_periods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "company_invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "v_unallocated_invoices"
            referencedColumns: ["invoice_id"]
          },
          {
            foreignKeyName: "project_transactions_invoice_movement_id_fkey"
            columns: ["invoice_movement_id"]
            isOneToOne: false
            referencedRelation: "invoice_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_transactions_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "project_transactions_transaction_type_id_fkey"
            columns: ["transaction_type_id"]
            isOneToOne: false
            referencedRelation: "transaction_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_transactions_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_cost: number | null
          actual_end_date: string | null
          actual_start_date: string | null
          company_id: string
          created_at: string
          created_by: string | null
          currency_code: string | null
          description: string | null
          id: string
          industry_id: string
          location_id: string | null
          metadata: Json | null
          planned_budget: number | null
          planned_end_date: string | null
          planned_start_date: string | null
          project_code: string
          project_name: string
          status_id: string
          updated_at: string
          updated_by: string | null
          work_hour_tracking_mode: Database["public"]["Enums"]["work_hour_tracking_mode"]
        }
        Insert: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          description?: string | null
          id?: string
          industry_id: string
          location_id?: string | null
          metadata?: Json | null
          planned_budget?: number | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_code: string
          project_name: string
          status_id: string
          updated_at?: string
          updated_by?: string | null
          work_hour_tracking_mode?: Database["public"]["Enums"]["work_hour_tracking_mode"]
        }
        Update: {
          actual_cost?: number | null
          actual_end_date?: string | null
          actual_start_date?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          currency_code?: string | null
          description?: string | null
          id?: string
          industry_id?: string
          location_id?: string | null
          metadata?: Json | null
          planned_budget?: number | null
          planned_end_date?: string | null
          planned_start_date?: string | null
          project_code?: string
          project_name?: string
          status_id?: string
          updated_at?: string
          updated_by?: string | null
          work_hour_tracking_mode?: Database["public"]["Enums"]["work_hour_tracking_mode"]
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "projects_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
          {
            foreignKeyName: "projects_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "project_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      purchase_order_items: {
        Row: {
          cost_center_cat_id: string | null
          cost_center_sub_id: string | null
          cost_center_sup_id: string | null
          created_at: string
          created_by: string | null
          estimate_type_id: string | null
          id: string
          line_total: number | null
          material_request_detail_id: string | null
          needed_by_date: string | null
          notes: string | null
          project_id: string | null
          purchase_order_id: string
          quantity: number
          received_quantity: number
          store_item_id: string
          unit_price: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string
          created_by?: string | null
          estimate_type_id?: string | null
          id?: string
          line_total?: number | null
          material_request_detail_id?: string | null
          needed_by_date?: string | null
          notes?: string | null
          project_id?: string | null
          purchase_order_id: string
          quantity: number
          received_quantity?: number
          store_item_id: string
          unit_price?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string
          created_by?: string | null
          estimate_type_id?: string | null
          id?: string
          line_total?: number | null
          material_request_detail_id?: string | null
          needed_by_date?: string | null
          notes?: string | null
          project_id?: string | null
          purchase_order_id?: string
          quantity?: number
          received_quantity?: number
          store_item_id?: string
          unit_price?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_cost_center_cat_id_fkey"
            columns: ["cost_center_cat_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_cost_center_sub_id_fkey"
            columns: ["cost_center_sub_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_cost_center_sup_id_fkey"
            columns: ["cost_center_sup_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "purchase_order_items_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "purchase_order_items_material_request_detail_id_fkey"
            columns: ["material_request_detail_id"]
            isOneToOne: false
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["material_request_detail_id"]
          },
          {
            foreignKeyName: "purchase_order_items_material_request_detail_id_fkey"
            columns: ["material_request_detail_id"]
            isOneToOne: false
            referencedRelation: "worker_material_request_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "purchase_order_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          expected_delivery_date: string | null
          id: string
          notes: string | null
          order_date: string
          order_number: string | null
          sent_at: string | null
          status: string
          supplier_name: string
          total_amount: number
          total_items: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number?: string | null
          sent_at?: string | null
          status?: string
          supplier_name: string
          total_amount?: number
          total_items?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          expected_delivery_date?: string | null
          id?: string
          notes?: string | null
          order_date?: string
          order_number?: string | null
          sent_at?: string | null
          status?: string
          supplier_name?: string
          total_amount?: number
          total_items?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "purchase_orders_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      retail_allocation_details: {
        Row: {
          allocation_id: string
          created_at: string
          id: string
          metadata: Json | null
          product_category: string | null
          sales_campaign_id: string | null
          store_department: string | null
          updated_at: string
        }
        Insert: {
          allocation_id: string
          created_at?: string
          id?: string
          metadata?: Json | null
          product_category?: string | null
          sales_campaign_id?: string | null
          store_department?: string | null
          updated_at?: string
        }
        Update: {
          allocation_id?: string
          created_at?: string
          id?: string
          metadata?: Json | null
          product_category?: string | null
          sales_campaign_id?: string | null
          store_department?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retail_allocation_details_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: true
            referencedRelation: "invoice_movement_project_allocations"
            referencedColumns: ["id"]
          },
        ]
      }
      retail_store_types: {
        Row: {
          code: string
          color_hex: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          requires_franchise_agreement: boolean | null
          sort_order: number | null
          typical_size_sqm_max: number | null
          typical_size_sqm_min: number | null
          updated_at: string
        }
        Insert: {
          code: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requires_franchise_agreement?: boolean | null
          sort_order?: number | null
          typical_size_sqm_max?: number | null
          typical_size_sqm_min?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requires_franchise_agreement?: boolean | null
          sort_order?: number | null
          typical_size_sqm_max?: number | null
          typical_size_sqm_min?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      retail_stores: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string
          employee_count: number | null
          franchisee_name: string | null
          id: string
          latitude: number | null
          lease_end_date: string | null
          lease_start_date: string | null
          longitude: number | null
          manager_name: string | null
          metadata: Json | null
          monthly_rent: number | null
          postal_code: string | null
          project_id: string
          square_meters: number | null
          state_province: string | null
          store_number: string | null
          store_type_id: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          employee_count?: number | null
          franchisee_name?: string | null
          id?: string
          latitude?: number | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          longitude?: number | null
          manager_name?: string | null
          metadata?: Json | null
          monthly_rent?: number | null
          postal_code?: string | null
          project_id: string
          square_meters?: number | null
          state_province?: string | null
          store_number?: string | null
          store_type_id: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          employee_count?: number | null
          franchisee_name?: string | null
          id?: string
          latitude?: number | null
          lease_end_date?: string | null
          lease_start_date?: string | null
          longitude?: number | null
          manager_name?: string | null
          metadata?: Json | null
          monthly_rent?: number | null
          postal_code?: string | null
          project_id?: string
          square_meters?: number | null
          state_province?: string | null
          store_number?: string | null
          store_type_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "retail_stores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retail_stores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "retail_stores_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "retail_stores_store_type_id_fkey"
            columns: ["store_type_id"]
            isOneToOne: false
            referencedRelation: "retail_store_types"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          created_at: string | null
          id: string
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
        ]
      }
      role_translations: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          id: string
          language_code: string
          role_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          id?: string
          language_code: string
          role_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          id?: string
          language_code?: string
          role_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "role_translations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_translations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "role_translations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "role_translations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          display_name: string
          hierarchy_level: number
          id: string
          is_active: boolean | null
          is_system: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name: string
          hierarchy_level?: number
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name?: string
          hierarchy_level?: number
          id?: string
          is_active?: boolean | null
          is_system?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      sal_types: {
        Row: {
          boq_type_id: string
          code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          boq_type_id: string
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          boq_type_id?: string
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      site_companies: {
        Row: {
          company_id: string
          construction_site_id: string
          contract_end_date: string | null
          contract_start_date: string | null
          created_at: string | null
          id: string
          role: string
        }
        Insert: {
          company_id: string
          construction_site_id: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          id?: string
          role: string
        }
        Update: {
          company_id?: string
          construction_site_id?: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          created_at?: string | null
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "fk_site_companies_site"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      supplier_contacts: {
        Row: {
          created_at: string | null
          created_by: string
          customer_company_id: string
          email: string | null
          id: string
          is_primary: boolean | null
          mobile: string | null
          name: string
          phone: string | null
          role: string | null
          supplier_company_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          customer_company_id: string
          email?: string | null
          id?: string
          is_primary?: boolean | null
          mobile?: string | null
          name: string
          phone?: string | null
          role?: string | null
          supplier_company_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          customer_company_id?: string
          email?: string | null
          id?: string
          is_primary?: boolean | null
          mobile?: string | null
          name?: string
          phone?: string | null
          role?: string | null
          supplier_company_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "supplier_contacts_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "supplier_contacts_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_contacts_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      supplier_price_lists: {
        Row: {
          created_at: string | null
          created_by: string
          currency: string | null
          customer_company_id: string
          discount_percentage: number | null
          id: string
          is_available: boolean | null
          item_id: string | null
          lead_time_days: number | null
          measure_unit_id: string | null
          minimum_order_quantity: number | null
          notes: string | null
          stock_quantity: number | null
          supplier_company_id: string
          supplier_item_code: string | null
          supplier_item_description: string | null
          supplier_item_name: string | null
          unit_price: number
          updated_at: string | null
          updated_by: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          currency?: string | null
          customer_company_id: string
          discount_percentage?: number | null
          id?: string
          is_available?: boolean | null
          item_id?: string | null
          lead_time_days?: number | null
          measure_unit_id?: string | null
          minimum_order_quantity?: number | null
          notes?: string | null
          stock_quantity?: number | null
          supplier_company_id: string
          supplier_item_code?: string | null
          supplier_item_description?: string | null
          supplier_item_name?: string | null
          unit_price: number
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          currency?: string | null
          customer_company_id?: string
          discount_percentage?: number | null
          id?: string
          is_available?: boolean | null
          item_id?: string | null
          lead_time_days?: number | null
          measure_unit_id?: string | null
          minimum_order_quantity?: number | null
          notes?: string | null
          stock_quantity?: number | null
          supplier_company_id?: string
          supplier_item_code?: string | null
          supplier_item_description?: string | null
          supplier_item_name?: string | null
          unit_price?: number
          updated_at?: string | null
          updated_by?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplier_price_lists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "supplier_price_lists_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "supplier_price_lists_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "supplier_price_lists_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_price_lists_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      supplier_reviews: {
        Row: {
          created_at: string | null
          customer_company_id: string
          delivery_rating: number | null
          id: string
          order_reference: string | null
          price_rating: number | null
          quality_rating: number | null
          rating: number
          review_date: string | null
          review_text: string | null
          reviewed_by: string
          service_rating: number | null
          supplier_company_id: string
        }
        Insert: {
          created_at?: string | null
          customer_company_id: string
          delivery_rating?: number | null
          id?: string
          order_reference?: string | null
          price_rating?: number | null
          quality_rating?: number | null
          rating: number
          review_date?: string | null
          review_text?: string | null
          reviewed_by: string
          service_rating?: number | null
          supplier_company_id: string
        }
        Update: {
          created_at?: string | null
          customer_company_id?: string
          delivery_rating?: number | null
          id?: string
          order_reference?: string | null
          price_rating?: number | null
          quality_rating?: number | null
          rating?: number
          review_date?: string | null
          review_text?: string | null
          reviewed_by?: string
          service_rating?: number | null
          supplier_company_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "supplier_reviews_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_customer_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "supplier_reviews_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "supplier_reviews_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "supplier_reviews_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      tech_allocation_details: {
        Row: {
          allocation_id: string
          cost_type_id: string
          created_at: string
          developer_hours: number | null
          id: string
          jira_ticket_id: string | null
          metadata: Json | null
          service_name: string | null
          sprint_number: number | null
          updated_at: string
        }
        Insert: {
          allocation_id: string
          cost_type_id: string
          created_at?: string
          developer_hours?: number | null
          id?: string
          jira_ticket_id?: string | null
          metadata?: Json | null
          service_name?: string | null
          sprint_number?: number | null
          updated_at?: string
        }
        Update: {
          allocation_id?: string
          cost_type_id?: string
          created_at?: string
          developer_hours?: number | null
          id?: string
          jira_ticket_id?: string | null
          metadata?: Json | null
          service_name?: string | null
          sprint_number?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tech_allocation_details_allocation_id_fkey"
            columns: ["allocation_id"]
            isOneToOne: true
            referencedRelation: "invoice_movement_project_allocations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_allocation_details_cost_type_id_fkey"
            columns: ["cost_type_id"]
            isOneToOne: false
            referencedRelation: "tech_cost_types"
            referencedColumns: ["id"]
          },
        ]
      }
      tech_cost_types: {
        Row: {
          code: string
          color_hex: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          is_capitalizable: boolean | null
          is_recurring: boolean | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          code: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_capitalizable?: boolean | null
          is_recurring?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_capitalizable?: boolean | null
          is_recurring?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      tech_project_documents: {
        Row: {
          created_at: string | null
          created_by: string | null
          document_id: string
          id: string
          tech_project_id: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          document_id: string
          id?: string
          tech_project_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          document_id?: string
          id?: string
          tech_project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tech_project_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_project_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_project_documents_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "tech_project_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_project_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "tech_project_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "tech_project_documents_tech_project_id_fkey"
            columns: ["tech_project_id"]
            isOneToOne: false
            referencedRelation: "tech_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_project_documents_tech_project_id_fkey"
            columns: ["tech_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["tech_project_id"]
          },
        ]
      }
      tech_project_types: {
        Row: {
          code: string
          color_hex: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          sort_order: number | null
          typical_duration_months: number | null
          typical_team_size_max: number | null
          typical_team_size_min: number | null
          updated_at: string
        }
        Insert: {
          code: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          typical_duration_months?: number | null
          typical_team_size_max?: number | null
          typical_team_size_min?: number | null
          updated_at?: string
        }
        Update: {
          code?: string
          color_hex?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          sort_order?: number | null
          typical_duration_months?: number | null
          typical_team_size_max?: number | null
          typical_team_size_min?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      tech_projects: {
        Row: {
          avatar_url: string | null
          client_company_id: string | null
          client_contact_email: string | null
          client_contact_name: string | null
          color: string | null
          created_at: string
          current_sprint_number: number | null
          deployment_url: string | null
          documentation_url: string | null
          id: string
          metadata: Json | null
          methodology: string | null
          primary_language: string | null
          priority: string | null
          project_id: string
          project_type_id: string
          repository_url: string | null
          sprint_length_weeks: number | null
          team_size: number | null
          tech_lead_name: string | null
          technology_stack: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          client_company_id?: string | null
          client_contact_email?: string | null
          client_contact_name?: string | null
          color?: string | null
          created_at?: string
          current_sprint_number?: number | null
          deployment_url?: string | null
          documentation_url?: string | null
          id?: string
          metadata?: Json | null
          methodology?: string | null
          primary_language?: string | null
          priority?: string | null
          project_id: string
          project_type_id: string
          repository_url?: string | null
          sprint_length_weeks?: number | null
          team_size?: number | null
          tech_lead_name?: string | null
          technology_stack?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          client_company_id?: string | null
          client_contact_email?: string | null
          client_contact_name?: string | null
          color?: string | null
          created_at?: string
          current_sprint_number?: number | null
          deployment_url?: string | null
          documentation_url?: string | null
          id?: string
          metadata?: Json | null
          methodology?: string | null
          primary_language?: string | null
          priority?: string | null
          project_id?: string
          project_type_id?: string
          repository_url?: string | null
          sprint_length_weeks?: number | null
          team_size?: number | null
          tech_lead_name?: string | null
          technology_stack?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "tech_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "tech_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "tech_projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "tech_project_types"
            referencedColumns: ["id"]
          },
        ]
      }
      transaction_types: {
        Row: {
          accounting_basis: string | null
          affects_accrual: boolean | null
          affects_cash_flow: boolean | null
          code: number
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          requires_invoice_movement: boolean | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          accounting_basis?: string | null
          affects_accrual?: boolean | null
          affects_cash_flow?: boolean | null
          code: number
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requires_invoice_movement?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          accounting_basis?: string | null
          affects_accrual?: boolean | null
          affects_cash_flow?: boolean | null
          code?: number
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          requires_invoice_movement?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      user_companies: {
        Row: {
          company_id: string
          contract_end_date: string | null
          contract_start_date: string | null
          contract_type_id: string | null
          contracted_daily_hours: number | null
          created_at: string | null
          hourly_rate: number | null
          id: string
          invitation_accepted_at: string | null
          invitation_sent_at: string | null
          invitation_status: string | null
          invited_by: string | null
          is_active: boolean | null
          role_id: string | null
          updated_at: string | null
          user_id: string
          work_areas: Database["public"]["Enums"]["work_areas"][]
          worker_category_id: string | null
        }
        Insert: {
          company_id: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          contract_type_id?: string | null
          contracted_daily_hours?: number | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          invitation_accepted_at?: string | null
          invitation_sent_at?: string | null
          invitation_status?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          role_id?: string | null
          updated_at?: string | null
          user_id: string
          work_areas: Database["public"]["Enums"]["work_areas"][]
          worker_category_id?: string | null
        }
        Update: {
          company_id?: string
          contract_end_date?: string | null
          contract_start_date?: string | null
          contract_type_id?: string | null
          contracted_daily_hours?: number | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          invitation_accepted_at?: string | null
          invitation_sent_at?: string | null
          invitation_status?: string | null
          invited_by?: string | null
          is_active?: boolean | null
          role_id?: string | null
          updated_at?: string | null
          user_id?: string
          work_areas?: Database["public"]["Enums"]["work_areas"][]
          worker_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_companies_contract_type_id_fkey"
            columns: ["contract_type_id"]
            isOneToOne: false
            referencedRelation: "work_contract_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_companies_worker_category_id_fkey"
            columns: ["worker_category_id"]
            isOneToOne: false
            referencedRelation: "worker_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_devices: {
        Row: {
          app_id: string
          created_at: string | null
          device_info: Json | null
          device_uuid: string
          fcm_token: string | null
          id: string
          last_active_at: string | null
          onesignal_player_id: string | null
          platform: string | null
          push_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          app_id?: string
          created_at?: string | null
          device_info?: Json | null
          device_uuid: string
          fcm_token?: string | null
          id?: string
          last_active_at?: string | null
          onesignal_player_id?: string | null
          platform?: string | null
          push_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          app_id?: string
          created_at?: string | null
          device_info?: Json | null
          device_uuid?: string
          fcm_token?: string | null
          id?: string
          last_active_at?: string | null
          onesignal_player_id?: string | null
          platform?: string | null
          push_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_devices_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_document_preferences: {
        Row: {
          company_id: string
          created_at: string | null
          document_id: string
          favorite: boolean | null
          id: string
          pinned: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          document_id: string
          favorite?: boolean | null
          id?: string
          pinned?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          document_id?: string
          favorite?: boolean | null
          id?: string
          pinned?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_document_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_document_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_document_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_document_preferences_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_document_preferences_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "user_document_preferences_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "user_document_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_document_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_document_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_invitations: {
        Row: {
          accepted_at: string | null
          company_id: string
          created_at: string | null
          custom_permissions: Json | null
          email: string
          expires_at: string | null
          id: string
          invitation_token: string
          invited_at: string | null
          invited_by: string
          language_code: string | null
          name: string
          notes: string | null
          rejected_at: string | null
          role_id: string
          sent_at: string | null
          status: string | null
          surname: string
          temp_worker_id: string | null
          user_id: string | null
          worker_data: Json | null
        }
        Insert: {
          accepted_at?: string | null
          company_id: string
          created_at?: string | null
          custom_permissions?: Json | null
          email: string
          expires_at?: string | null
          id?: string
          invitation_token: string
          invited_at?: string | null
          invited_by: string
          language_code?: string | null
          name: string
          notes?: string | null
          rejected_at?: string | null
          role_id: string
          sent_at?: string | null
          status?: string | null
          surname: string
          temp_worker_id?: string | null
          user_id?: string | null
          worker_data?: Json | null
        }
        Update: {
          accepted_at?: string | null
          company_id?: string
          created_at?: string | null
          custom_permissions?: Json | null
          email?: string
          expires_at?: string | null
          id?: string
          invitation_token?: string
          invited_at?: string | null
          invited_by?: string
          language_code?: string | null
          name?: string
          notes?: string | null
          rejected_at?: string | null
          role_id?: string
          sent_at?: string | null
          status?: string | null
          surname?: string
          temp_worker_id?: string | null
          user_id?: string | null
          worker_data?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_invitations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_invitations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "user_invitations_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_permission_overrides: {
        Row: {
          created_at: string | null
          created_by: string
          grant_type: string
          id: string
          permission_id: string
          reason: string | null
          user_company_id: string
        }
        Insert: {
          created_at?: string | null
          created_by: string
          grant_type: string
          id?: string
          permission_id: string
          reason?: string | null
          user_company_id: string
        }
        Update: {
          created_at?: string | null
          created_by?: string
          grant_type?: string
          id?: string
          permission_id?: string
          reason?: string | null
          user_company_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_permission_overrides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permission_overrides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permission_overrides_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_permission_overrides_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permission_overrides_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "user_permission_overrides_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "v_user_effective_permissions"
            referencedColumns: ["permission_id"]
          },
          {
            foreignKeyName: "user_permission_overrides_user_company_id_fkey"
            columns: ["user_company_id"]
            isOneToOne: false
            referencedRelation: "user_companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_permission_overrides_user_company_id_fkey"
            columns: ["user_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["user_company_id"]
          },
        ]
      }
      work_contract_types: {
        Row: {
          created_at: string | null
          description: string | null
          display_name_en: string
          display_name_it: string
          id: string
          is_active: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_name_en: string
          display_name_it: string
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      work_hour_cost_center_mappings: {
        Row: {
          company_id: string
          confidence_score: number | null
          cost_center_id: string
          created_at: string
          created_by: string | null
          id: string
          mapping_type: string
          metadata: Json | null
          notes: string | null
          project_id: string | null
          updated_at: string
          updated_by: string | null
          work_hour_category_id: string
        }
        Insert: {
          company_id: string
          confidence_score?: number | null
          cost_center_id: string
          created_at?: string
          created_by?: string | null
          id?: string
          mapping_type?: string
          metadata?: Json | null
          notes?: string | null
          project_id?: string | null
          updated_at?: string
          updated_by?: string | null
          work_hour_category_id: string
        }
        Update: {
          company_id?: string
          confidence_score?: number | null
          cost_center_id?: string
          created_at?: string
          created_by?: string | null
          id?: string
          mapping_type?: string
          metadata?: Json | null
          notes?: string | null
          project_id?: string | null
          updated_at?: string
          updated_by?: string | null
          work_hour_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_hour_cost_center_mappings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_cost_center_id_fkey"
            columns: ["cost_center_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hour_cost_center_mappings_work_hour_category_id_fkey"
            columns: ["work_hour_category_id"]
            isOneToOne: false
            referencedRelation: "work_hours_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      work_hours: {
        Row: {
          break_duration_minutes: number | null
          company_id: string
          cost_center_cat_id: string | null
          cost_center_sub_id: string | null
          cost_center_sup_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          holiday_hours: number
          hourly_rate: number | null
          hours: number
          id: string
          is_paid: boolean | null
          leave_request_id: string | null
          location_id: string | null
          metadata: Json | null
          night_hours: number
          overtime_hours: number
          project_id: string | null
          regular_hours: number
          shift_end_time: string | null
          shift_start_time: string | null
          sunday_hours: number
          total_cost: number | null
          updated_at: string
          updated_by: string | null
          user_id: string
          work_date: string
          work_hour_category_id: string | null
          work_hour_macro_category_id: string | null
          work_status_type_id: string
          work_type_id: string
        }
        Insert: {
          break_duration_minutes?: number | null
          company_id: string
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          holiday_hours?: number
          hourly_rate?: number | null
          hours: number
          id?: string
          is_paid?: boolean | null
          leave_request_id?: string | null
          location_id?: string | null
          metadata?: Json | null
          night_hours?: number
          overtime_hours?: number
          project_id?: string | null
          regular_hours?: number
          shift_end_time?: string | null
          shift_start_time?: string | null
          sunday_hours?: number
          total_cost?: number | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          work_date: string
          work_hour_category_id?: string | null
          work_hour_macro_category_id?: string | null
          work_status_type_id: string
          work_type_id: string
        }
        Update: {
          break_duration_minutes?: number | null
          company_id?: string
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          holiday_hours?: number
          hourly_rate?: number | null
          hours?: number
          id?: string
          is_paid?: boolean | null
          leave_request_id?: string | null
          location_id?: string | null
          metadata?: Json | null
          night_hours?: number
          overtime_hours?: number
          project_id?: string | null
          regular_hours?: number
          shift_end_time?: string | null
          shift_start_time?: string | null
          sunday_hours?: number
          total_cost?: number | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          work_date?: string
          work_hour_category_id?: string | null
          work_hour_macro_category_id?: string | null
          work_status_type_id?: string
          work_type_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hours_cost_center_cat_id_fkey"
            columns: ["cost_center_cat_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_cost_center_sub_id_fkey"
            columns: ["cost_center_sub_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_cost_center_sup_id_fkey"
            columns: ["cost_center_sup_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hours_leave_request_id_fkey"
            columns: ["leave_request_id"]
            isOneToOne: false
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["request_id"]
          },
          {
            foreignKeyName: "work_hours_leave_request_id_fkey"
            columns: ["leave_request_id"]
            isOneToOne: false
            referencedRelation: "v_worker_leave_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_leave_request_id_fkey"
            columns: ["leave_request_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_leave_request_id_fkey"
            columns: ["leave_request_id"]
            isOneToOne: false
            referencedRelation: "worker_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hours_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hours_work_status_type_id_fkey"
            columns: ["work_status_type_id"]
            isOneToOne: false
            referencedRelation: "work_status_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_work_type_id_fkey"
            columns: ["work_type_id"]
            isOneToOne: false
            referencedRelation: "industry_work_types"
            referencedColumns: ["id"]
          },
        ]
      }
      work_hours_categories: {
        Row: {
          code: string | null
          company_id: string
          created_at: string | null
          created_by: string
          description: string | null
          id: string
          level: number
          name: string
          parent_id: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          code?: string | null
          company_id: string
          created_at?: string | null
          created_by: string
          description?: string | null
          id?: string
          level: number
          name: string
          parent_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          code?: string | null
          company_id?: string
          created_at?: string | null
          created_by?: string
          description?: string | null
          id?: string
          level?: number
          name?: string
          parent_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hours_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hours_categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "work_hours_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_categories_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      work_hours_media: {
        Row: {
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          mime_type: string | null
          uploaded_by: string
          work_hours_id: string
        }
        Insert: {
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          mime_type?: string | null
          uploaded_by: string
          work_hours_id: string
        }
        Update: {
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          mime_type?: string | null
          uploaded_by?: string
          work_hours_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_media_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      work_status_types: {
        Row: {
          affects_working_hours: boolean | null
          category: string
          code: string
          color_hex: string | null
          created_at: string
          description_en: string | null
          description_it: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          is_active: boolean | null
          is_paid: boolean | null
          requires_approval: boolean | null
          requires_document: boolean | null
          sort_order: number | null
          updated_at: string
        }
        Insert: {
          affects_working_hours?: boolean | null
          category: string
          code: string
          color_hex?: string | null
          created_at?: string
          description_en?: string | null
          description_it?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          requires_approval?: boolean | null
          requires_document?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Update: {
          affects_working_hours?: boolean | null
          category?: string
          code?: string
          color_hex?: string | null
          created_at?: string
          description_en?: string | null
          description_it?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          is_active?: boolean | null
          is_paid?: boolean | null
          requires_approval?: boolean | null
          requires_document?: boolean | null
          sort_order?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      worker_categories: {
        Row: {
          base_role_id: string | null
          created_at: string
          description: string | null
          display_name_en: string
          display_name_it: string
          icon: string | null
          id: string
          industry_id: string
          is_active: boolean | null
          name: string
          updated_at: string
        }
        Insert: {
          base_role_id?: string | null
          created_at?: string
          description?: string | null
          display_name_en: string
          display_name_it: string
          icon?: string | null
          id?: string
          industry_id: string
          is_active?: boolean | null
          name: string
          updated_at?: string
        }
        Update: {
          base_role_id?: string | null
          created_at?: string
          description?: string | null
          display_name_en?: string
          display_name_it?: string
          icon?: string | null
          id?: string
          industry_id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_categories_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_categories_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "worker_categories_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "worker_categories_base_role_id_fkey"
            columns: ["base_role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "worker_categories_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_category_location_types: {
        Row: {
          created_at: string
          location_type_id: string
          worker_category_id: string
        }
        Insert: {
          created_at?: string
          location_type_id: string
          worker_category_id: string
        }
        Update: {
          created_at?: string
          location_type_id?: string
          worker_category_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_category_location_types_location_type_id_fkey"
            columns: ["location_type_id"]
            isOneToOne: false
            referencedRelation: "location_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_category_location_types_worker_category_id_fkey"
            columns: ["worker_category_id"]
            isOneToOne: false
            referencedRelation: "worker_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_documents: {
        Row: {
          attached_at: string
          attached_by: string | null
          created_at: string
          document_id: string
          id: string
          is_required: boolean
          notes: string | null
          worker_id: string
        }
        Insert: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id: string
          id?: string
          is_required?: boolean
          notes?: string | null
          worker_id: string
        }
        Update: {
          attached_at?: string
          attached_by?: string | null
          created_at?: string
          document_id?: string
          id?: string
          is_required?: boolean
          notes?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      worker_leave_request_details: {
        Row: {
          affects_balance: boolean | null
          created_at: string | null
          detailed_description: string | null
          duration_days: number
          end_date: string
          id: string
          is_paid: boolean | null
          leave_type_id: string
          reason: string | null
          request_id: string
          start_date: string
          updated_at: string | null
        }
        Insert: {
          affects_balance?: boolean | null
          created_at?: string | null
          detailed_description?: string | null
          duration_days: number
          end_date: string
          id?: string
          is_paid?: boolean | null
          leave_type_id: string
          reason?: string | null
          request_id: string
          start_date: string
          updated_at?: string | null
        }
        Update: {
          affects_balance?: boolean | null
          created_at?: string | null
          detailed_description?: string | null
          duration_days?: number
          end_date?: string
          id?: string
          is_paid?: boolean | null
          leave_type_id?: string
          reason?: string | null
          request_id?: string
          start_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_leave_request_details_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_request_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_leave_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["request_id"]
          },
          {
            foreignKeyName: "worker_leave_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_worker_leave_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_leave_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_leave_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "worker_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_material_request_details: {
        Row: {
          actual_cost: number | null
          approved_quantity: number | null
          cost_center_cat_id: string | null
          cost_center_sub_id: string | null
          cost_center_sup_id: string | null
          created_at: string | null
          delivered_at: string | null
          estimate_type_id: string | null
          id: string
          needed_by_date: string | null
          notes: string | null
          project_id: string | null
          purchase_order_number: string | null
          quantity: number
          request_id: string
          store_item_id: string
          supplier: string | null
          updated_at: string | null
          work_hour_category_id: string | null
          work_hour_macro_category_id: string | null
        }
        Insert: {
          actual_cost?: number | null
          approved_quantity?: number | null
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string | null
          delivered_at?: string | null
          estimate_type_id?: string | null
          id?: string
          needed_by_date?: string | null
          notes?: string | null
          project_id?: string | null
          purchase_order_number?: string | null
          quantity: number
          request_id: string
          store_item_id: string
          supplier?: string | null
          updated_at?: string | null
          work_hour_category_id?: string | null
          work_hour_macro_category_id?: string | null
        }
        Update: {
          actual_cost?: number | null
          approved_quantity?: number | null
          cost_center_cat_id?: string | null
          cost_center_sub_id?: string | null
          cost_center_sup_id?: string | null
          created_at?: string | null
          delivered_at?: string | null
          estimate_type_id?: string | null
          id?: string
          needed_by_date?: string | null
          notes?: string | null
          project_id?: string | null
          purchase_order_number?: string | null
          quantity?: number
          request_id?: string
          store_item_id?: string
          supplier?: string | null
          updated_at?: string | null
          work_hour_category_id?: string | null
          work_hour_macro_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_material_request_detail_work_hour_macro_category_id_fkey"
            columns: ["work_hour_macro_category_id"]
            isOneToOne: false
            referencedRelation: "work_hours_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_cat_id_fkey"
            columns: ["cost_center_cat_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sub_id_fkey"
            columns: ["cost_center_sub_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sup_id_fkey"
            columns: ["cost_center_sup_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_material_request_allocation_signals"
            referencedColumns: ["request_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_worker_leave_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_request_id_fkey"
            columns: ["request_id"]
            isOneToOne: true
            referencedRelation: "worker_requests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_work_hour_category_id_fkey"
            columns: ["work_hour_category_id"]
            isOneToOne: false
            referencedRelation: "work_hours_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      worker_request_types: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          description_it: string | null
          display_name: string
          display_name_it: string | null
          icon: string | null
          id: string
          is_active: boolean | null
          name: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_it?: string | null
          display_name: string
          display_name_it?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          description_it?: string | null
          display_name?: string
          display_name_it?: string | null
          icon?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      worker_requests: {
        Row: {
          company_id: string
          created_at: string | null
          description: string | null
          id: string
          priority: string | null
          request_type_id: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string
          submitted_at: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          request_type_id: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          description?: string | null
          id?: string
          priority?: string | null
          request_type_id?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string
          submitted_at?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "worker_requests_request_type_id_fkey"
            columns: ["request_type_id"]
            isOneToOne: false
            referencedRelation: "worker_request_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      companies_with_location: {
        Row: {
          address_line_1: string | null
          address_line_2: string | null
          city_id: string | null
          city_name: string | null
          company_type_id: string | null
          country_code: string | null
          country_id: string | null
          country_name: string | null
          created_at: string | null
          id: string | null
          latitude: number | null
          longitude: number | null
          name: string | null
          postal_code: string | null
          province_name: string | null
          region_name: string | null
          updated_at: string | null
          vat: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_company_type_id_fkey"
            columns: ["company_type_id"]
            isOneToOne: false
            referencedRelation: "company_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_details: {
        Row: {
          auth_created_at: string | null
          avatar_url: string | null
          created_at: string | null
          email: string | null
          email_confirmed_at: string | null
          id: string | null
          name: string | null
          phone: string | null
          surname: string | null
          updated_at: string | null
        }
        Insert: {
          auth_created_at?: never
          avatar_url?: string | null
          created_at?: string | null
          email?: never
          email_confirmed_at?: never
          id?: string | null
          name?: string | null
          phone?: string | null
          surname?: string | null
          updated_at?: string | null
        }
        Update: {
          auth_created_at?: never
          avatar_url?: string | null
          created_at?: string | null
          email?: never
          email_confirmed_at?: never
          id?: string | null
          name?: string | null
          phone?: string | null
          surname?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      v_boq_articles_with_details: {
        Row: {
          boq_id: string | null
          boq_name: string | null
          boq_type_id: string | null
          boq_type_name: string | null
          construction_site_id: string | null
          created_at: string | null
          description: string | null
          id: string | null
          id_in_boq: string | null
          measure_unit_id: string | null
          measure_unit_name: string | null
          order_number: number | null
          order_number_string: string | null
          quantity: number | null
          total_price: number | null
          unit_price: number | null
          updated_at: string | null
          work_category_id: string | null
          work_category_name: string | null
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "boq_articles_boq_id_fkey"
            columns: ["boq_id"]
            isOneToOne: false
            referencedRelation: "project_estimates"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_boq_id_fkey"
            columns: ["boq_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_id"]
          },
          {
            foreignKeyName: "boq_articles_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_category_id_fkey"
            columns: ["work_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_sub_category_id_fkey"
            columns: ["work_sub_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "boq_articles_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_estimate_type_id_fkey"
            columns: ["boq_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_estimates_estimate_type_id_fkey"
            columns: ["boq_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
        ]
      }
      v_boq_financials_current: {
        Row: {
          boq_depth_id: string | null
          boq_depth_name: string | null
          boq_id: string | null
          boq_name: string | null
          boq_type_id: string | null
          boq_type_name: string | null
          company_id: string | null
          construction_site_id: string | null
          created_at: string | null
          delta_costs: number | null
          delta_margin: number | null
          delta_paid_costs: number | null
          delta_paid_margin: number | null
          delta_paid_revenues: number | null
          delta_revenues: number | null
          discount: number | null
          forecasted_costs: number | null
          forecasted_margin: number | null
          forecasted_revenues: number | null
          max_child_sal_number: number | null
          paid_costs: number | null
          paid_margin: number | null
          paid_revenues: number | null
          paid_revenues_discounted: number | null
          production_value: number | null
          project_id: string | null
          real_costs: number | null
          real_margin: number | null
          real_revenues: number | null
          sal_number: number | null
          sal_progression: number | null
          updated_at: string | null
          workflow_step: number | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_boq_type_financials_current: {
        Row: {
          boq_type_id: string | null
          boq_type_name: string | null
          company_id: string | null
          construction_site_id: string | null
          created_at: string | null
          delta_costs: number | null
          delta_margin: number | null
          delta_revenues: number | null
          discount: number | null
          forecasted_costs: number | null
          forecasted_margin: number | null
          forecasted_revenues: number | null
          forecasted_revenues_discounted: number | null
          production_value: number | null
          real_costs: number | null
          real_margin: number | null
          real_revenues: number | null
          real_revenues_discounted: number | null
          sal_number: number | null
          sal_progression: number | null
          timestamp: string | null
          updated_at: string | null
          workflow_step: number | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_company_role_permissions: {
        Row: {
          action: string | null
          company_id: string | null
          company_name: string | null
          customized_at: string | null
          customized_by: string | null
          customized_by_email: string | null
          is_customized: boolean | null
          is_granted: boolean | null
          permission_id: string | null
          resource: string | null
          role_display_name: string | null
          role_id: string | null
          role_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_role_permissions_customized_by_fkey"
            columns: ["customized_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_company_store_items: {
        Row: {
          avatar_url: string | null
          barcode: string | null
          brand_description: string | null
          brand_id: string | null
          brand_name: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          created_by_full_name: string | null
          created_by_name: string | null
          created_by_surname: string | null
          description: string | null
          id: string | null
          item_category_description: string | null
          item_category_id: string | null
          item_category_level: number | null
          item_category_name: string | null
          item_macro_category_description: string | null
          item_macro_category_id: string | null
          item_macro_category_name: string | null
          max_stock_quantity: number | null
          measure_unit_description: string | null
          measure_unit_id: string | null
          measure_unit_name: string | null
          min_stok_quantity: number | null
          name: string | null
          supplier_email: string | null
          supplier_id: string | null
          supplier_name: string | null
          supplier_phone: string | null
          supplier_vat: string | null
          updated_at: string | null
          updated_by: string | null
          updated_by_full_name: string | null
          updated_by_name: string | null
          updated_by_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_store_items_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "item_brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["item_macro_category_id"]
          },
          {
            foreignKeyName: "company_store_items_measure_unit_id_fkey"
            columns: ["measure_unit_id"]
            isOneToOne: false
            referencedRelation: "measure_units"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_supplier_id_fkey"
            columns: ["supplier_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_company_suppliers: {
        Row: {
          avg_rating: number | null
          contact_count: number | null
          created_at: string | null
          customer_company_id: string | null
          last_order_date: string | null
          relationship_id: string | null
          review_count: number | null
          supplier_address: string | null
          supplier_avatar_url: string | null
          supplier_city: string | null
          supplier_company_id: string | null
          supplier_country: string | null
          supplier_email: string | null
          supplier_name: string | null
          supplier_phone: string | null
          supplier_postal_code: string | null
          supplier_vat: string | null
          total_orders: number | null
          total_spent: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_company_id_fkey"
            columns: ["customer_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationships_related_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_company_workers: {
        Row: {
          company_email: string | null
          company_id: string | null
          company_name: string | null
          company_phone: string | null
          company_vat: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          contract_type: string | null
          contract_type_en: string | null
          contract_type_id: string | null
          contract_type_it: string | null
          contracted_daily_hours: number | null
          hierarchy_level: number | null
          hourly_rate: number | null
          is_active: boolean | null
          joined_date: string | null
          last_updated: string | null
          role_display_name: string | null
          role_id: string | null
          role_id_full: string | null
          role_name: string | null
          user_company_id: string | null
          user_id: string | null
          work_areas: Database["public"]["Enums"]["work_areas"][] | null
          worker_address: string | null
          worker_avatar: string | null
          worker_city: string | null
          worker_country: string | null
          worker_dob: string | null
          worker_email: string | null
          worker_full_name: string | null
          worker_name: string | null
          worker_phone: string | null
          worker_postal_code: string | null
          worker_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_companies_contract_type_id_fkey"
            columns: ["contract_type_id"]
            isOneToOne: false
            referencedRelation: "work_contract_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_company_workers"
            referencedColumns: ["role_id_full"]
          },
          {
            foreignKeyName: "user_companies_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "v_worker_invitations"
            referencedColumns: ["role_id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_construction_site_financials_current: {
        Row: {
          actual_end_date: string | null
          avatar_url: string | null
          city_name: string | null
          company_id: string | null
          construction_site_id: string | null
          country_name: string | null
          created_at: string | null
          delta_costs: number | null
          delta_margin: number | null
          delta_paid_costs: number | null
          delta_paid_margin: number | null
          delta_paid_revenues: number | null
          delta_revenues: number | null
          discount: number | null
          expected_end_date: string | null
          forecasted_costs: number | null
          forecasted_margin: number | null
          forecasted_revenues: number | null
          forecasted_revenues_discounted: number | null
          paid_costs: number | null
          paid_margin: number | null
          paid_revenues: number | null
          paid_revenues_discounted: number | null
          production_value: number | null
          province_name: string | null
          real_costs: number | null
          real_margin: number | null
          real_revenues: number | null
          real_revenues_discounted: number | null
          sal_number: number | null
          sal_progression: number | null
          site_name: string | null
          site_status: string | null
          start_date: string | null
          state_name: string | null
          timestamp: string | null
          updated_at: string | null
          workflow_step: number | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_construction_sites_with_metrics: {
        Row: {
          actual_end_date: string | null
          address_line_1: string | null
          address_line_2: string | null
          avatar_url: string | null
          budget_variance: number | null
          city_id: string | null
          company_id: string | null
          completion_percentage: number | null
          created_at: string | null
          description: string | null
          expected_end_date: string | null
          id: string | null
          location_id: string | null
          name: string | null
          sal_number: number | null
          start_date: string | null
          status: string | null
          total_actual_amount: number | null
          total_boq_articles: number | null
          total_boqs: number | null
          total_budgeted_amount: number | null
          total_work_categories: number | null
          updated_at: string | null
          work_progress: number | null
          workflow_step: number | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_sites_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_sites_owner_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_document_compliance_summary: {
        Row: {
          active_documents: number | null
          actually_expired: number | null
          archived_documents: number | null
          company_id: string | null
          compliance_percentage: number | null
          compliance_status: string | null
          default_expiry_warning_days: number | null
          document_type_code: string | null
          document_type_id: string | null
          document_type_name: string | null
          draft_documents: number | null
          expired_documents: number | null
          expiring_critical: number | null
          expiring_warning: number | null
          macro_type_code: string | null
          macro_type_icon: string | null
          macro_type_id: string | null
          macro_type_name: string | null
          missing_documents: number | null
          requires_expiry: boolean | null
          total_documents: number | null
          total_for_compliance: number | null
          total_valid: number | null
          valid_no_expiry: number | null
          valid_with_expiry: number | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_document_expiry_report: {
        Row: {
          company_id: string | null
          company_relationship_id: string | null
          construction_site_id: string | null
          created_at: string | null
          days_until_expiry: number | null
          default_expiry_warning_days: number | null
          document_id: string | null
          document_number: string | null
          document_type_code: string | null
          document_type_id: string | null
          document_type_name: string | null
          entity_id: string | null
          entity_type: string | null
          expiry_date: string | null
          file_name: string | null
          file_url: string | null
          issue_date: string | null
          issuing_authority: string | null
          macro_type_code: string | null
          macro_type_icon: string | null
          macro_type_id: string | null
          macro_type_name: string | null
          notes: string | null
          related_company_name: string | null
          requires_expiry: boolean | null
          site_name: string | null
          status: string | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          uploaded_by_name: string | null
          urgency: string | null
          urgency_order: number | null
          verified_at: string | null
          verified_by: string | null
          verified_by_name: string | null
          worker_email: string | null
          worker_id: string | null
          worker_name: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_relationship_documents_company_relationship_id_fkey"
            columns: ["company_relationship_id"]
            isOneToOne: false
            referencedRelation: "company_relationships"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_relationship_documents_company_relationship_id_fkey"
            columns: ["company_relationship_id"]
            isOneToOne: false
            referencedRelation: "v_company_suppliers"
            referencedColumns: ["relationship_id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "site_documents_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_forecast_allocations_summary: {
        Row: {
          boq_type_id: string | null
          cat_name: string | null
          construction_site_id: string | null
          cost_item_count: number | null
          forecast_card_id: string | null
          forecasted_revenue: number | null
          status: string | null
          sub_name: string | null
          sup_name: string | null
          total_allocated: number | null
          total_allocated_cost: number | null
          total_allocated_imprevisti: number | null
          weight_percentage: number | null
          work_category_id: string | null
          work_sub_category_id: string | null
          work_super_category_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_category_id_fkey"
            columns: ["work_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_sub_category_id_fkey"
            columns: ["work_sub_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cost_allocations_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      v_forecast_card_summary: {
        Row: {
          boq_type_id: string | null
          cat_ids: string[] | null
          construction_site_id: string | null
          cost_item_count: number | null
          created_at: string | null
          created_by: string | null
          forecast_card_id: string | null
          grand_total: number | null
          name: string | null
          status: string | null
          sub_ids: string[] | null
          sup_name: string | null
          total_costs: number | null
          total_imprevisti: number | null
          updated_at: string | null
          updated_by: string | null
          work_super_category_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      v_forecast_card_with_margin: {
        Row: {
          boq_type_id: string | null
          cat_ids: string[] | null
          construction_site_id: string | null
          cost_item_count: number | null
          created_at: string | null
          created_by: string | null
          forecast_card_id: string | null
          grand_total: number | null
          margin: number | null
          margin_percentage: number | null
          name: string | null
          status: string | null
          sub_ids: string[] | null
          sup_name: string | null
          total_costs: number | null
          total_imprevisti: number | null
          total_revenues: number | null
          updated_at: string | null
          updated_by: string | null
          work_super_category_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "construction_sites"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_boq_type_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_site_financials_current"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_construction_sites_with_metrics"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_work_hours_complete"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_worker_material_requests"
            referencedColumns: ["material_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_construction_site_id_fkey"
            columns: ["construction_site_id"]
            isOneToOne: false
            referencedRelation: "v_workers_hours"
            referencedColumns: ["construction_site_id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "forecast_cards_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "forecast_cards_work_super_category_id_fkey"
            columns: ["work_super_category_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
        ]
      }
      v_inventory_movements: {
        Row: {
          batch_id: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          created_by_full_name: string | null
          from_location_id: string | null
          from_location_name: string | null
          from_location_type: string | null
          from_project_id: string | null
          id: string | null
          invoice_movement_id: string | null
          item_barcode: string | null
          item_id: string | null
          item_name: string | null
          measure_unit_name: string | null
          movement_date: string | null
          movement_reason: string | null
          movement_type: number | null
          movement_type_label: string | null
          notes: string | null
          purchase_order_id: string | null
          quantity_moved: number | null
          return_reason_description: string | null
          supplier_company_id: string | null
          supplier_item_id: string | null
          supplier_name: string | null
          to_location_id: string | null
          to_location_name: string | null
          to_location_type: string | null
          to_project_id: string | null
          total_cost: number | null
          total_price: number | null
          unitary_cost: number | null
          unitary_price: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_from_project_id_fkey"
            columns: ["from_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_invoice_movement_id_fkey"
            columns: ["invoice_movement_id"]
            isOneToOne: false
            referencedRelation: "invoice_movements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_supplier_company_id_fkey"
            columns: ["supplier_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "inventory_movements_to_project_id_fkey"
            columns: ["to_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
        ]
      }
      v_knowledge_notes_with_author: {
        Row: {
          author_avatar: string | null
          author_name: string | null
          company_id: string | null
          content: string | null
          created_at: string | null
          favorite: boolean | null
          id: string | null
          pinned: boolean | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          user_id: string | null
          visibility: string | null
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_material_request_allocation_signals: {
        Row: {
          approved_at: string | null
          approved_quantity: number | null
          cost_center_cat_code: string | null
          cost_center_cat_id: string | null
          cost_center_cat_name: string | null
          cost_center_sub_code: string | null
          cost_center_sub_id: string | null
          cost_center_sub_name: string | null
          cost_center_sup_code: string | null
          cost_center_sup_id: string | null
          cost_center_sup_name: string | null
          date_proximity_weight: number | null
          estimate_type_id: string | null
          estimate_type_name: string | null
          industry_id: string | null
          item_category_id: string | null
          item_match_weight: number | null
          item_name: string | null
          material_request_detail_id: string | null
          needed_by_date: string | null
          project_id: string | null
          project_name: string | null
          quantity_fulfilled: number | null
          quantity_to_fulfill: number | null
          request_id: string | null
          request_status: string | null
          requested_at: string | null
          requested_by: string | null
          requested_quantity: number | null
          store_item_id: string | null
          supplier: string | null
          supplier_match_weight: number | null
          unfulfilled_weight: number | null
        }
        Relationships: [
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "item_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_store_items_item_category_id_fkey"
            columns: ["item_category_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["item_macro_category_id"]
          },
          {
            foreignKeyName: "projects_industry_id_fkey"
            columns: ["industry_id"]
            isOneToOne: false
            referencedRelation: "industries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_cat_id_fkey"
            columns: ["cost_center_cat_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sub_id_fkey"
            columns: ["cost_center_sub_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sup_id_fkey"
            columns: ["cost_center_sup_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["store_item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["requested_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_production_footprint: {
        Row: {
          boq_article_id: string | null
          boq_id: string | null
          boq_type_id: string | null
          company_id: string | null
          construction_site_id: string | null
          cost_center_code: string | null
          cost_center_id: string | null
          cost_center_name: string | null
          cost_center_parent_ids: string[] | null
          detail_metadata: Json | null
          estimate_type_id: string | null
          estimate_type_name: string | null
          hierarchy_level: number | null
          hourly_rate: number | null
          hours: number | null
          is_paid: boolean | null
          level_number: number | null
          location_id: string | null
          project_id: string | null
          reference_type: string | null
          sal_number: number | null
          shift_end_time: string | null
          shift_start_time: string | null
          structure_level_id: string | null
          structure_level_name: string | null
          total_cost: number | null
          user_id: string | null
          work_category_id: string | null
          work_date: string | null
          work_description: string | null
          work_hour_category_id: string | null
          work_hour_category_name: string | null
          work_hour_macro_category_id: string | null
          work_hour_macro_category_name: string | null
          work_hour_tracking_mode:
            | Database["public"]["Enums"]["work_hour_tracking_mode"]
            | null
          work_hours_detail_id: string | null
          work_hours_id: string | null
          work_hours_metadata: Json | null
          work_status_type_id: string | null
          work_sub_category_id: string | null
          work_super_category_id: string | null
          work_type_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "construction_cost_center_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "estimate_structure_levels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_cost_center_details_structure_level_id_fkey"
            columns: ["structure_level_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_depth_id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "boq_articles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "construction_work_hours_details_boq_article_id_fkey"
            columns: ["boq_article_id"]
            isOneToOne: false
            referencedRelation: "v_boq_articles_with_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hours_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "work_hours_work_status_type_id_fkey"
            columns: ["work_status_type_id"]
            isOneToOne: false
            referencedRelation: "work_status_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_work_type_id_fkey"
            columns: ["work_type_id"]
            isOneToOne: false
            referencedRelation: "industry_work_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_tech_projects_with_financials: {
        Row: {
          actual_cost: number | null
          actual_end_date: string | null
          actual_start_date: string | null
          avatar_url: string | null
          client_company_id: string | null
          client_company_name: string | null
          client_contact_email: string | null
          client_contact_name: string | null
          color: string | null
          company_id: string | null
          cost_centers_count: number | null
          created_at: string | null
          current_sprint_number: number | null
          deployment_url: string | null
          description: string | null
          documentation_url: string | null
          expected_end_date: string | null
          forecasted_costs: number | null
          forecasted_margin: number | null
          forecasted_revenues: number | null
          location_id: string | null
          methodology: string | null
          name: string | null
          paid_costs: number | null
          paid_margin: number | null
          paid_revenues: number | null
          planned_budget: number | null
          primary_language: string | null
          priority: string | null
          project_code: string | null
          project_id: string | null
          project_type_code: string | null
          project_type_id: string | null
          project_type_name: string | null
          real_costs: number | null
          real_margin: number | null
          real_revenues: number | null
          repository_url: string | null
          sprint_length_weeks: number | null
          start_date: string | null
          status_code: string | null
          status_id: string | null
          status_name: string | null
          team_size: number | null
          tech_lead_name: string | null
          tech_project_id: string | null
          technology_stack: string[] | null
          timestamp: string | null
          total_hours_worked: number | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "projects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "v_production_footprint"
            referencedColumns: ["location_id"]
          },
          {
            foreignKeyName: "projects_status_id_fkey"
            columns: ["status_id"]
            isOneToOne: false
            referencedRelation: "project_statuses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tech_projects_client_company_id_fkey"
            columns: ["client_company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "tech_projects_project_type_id_fkey"
            columns: ["project_type_id"]
            isOneToOne: false
            referencedRelation: "tech_project_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_unallocated_invoices: {
        Row: {
          best_match_score: number | null
          company_id: string | null
          customer_supplier_description: string | null
          document_date: string | null
          document_number: string | null
          invoice_id: string | null
          invoice_type: number | null
          total_document_amount: number | null
          unallocated_movement_count: number | null
        }
        Insert: {
          best_match_score?: never
          company_id?: string | null
          customer_supplier_description?: string | null
          document_date?: string | null
          document_number?: string | null
          invoice_id?: string | null
          invoice_type?: number | null
          total_document_amount?: number | null
          unallocated_movement_count?: never
        }
        Update: {
          best_match_score?: never
          company_id?: string | null
          customer_supplier_description?: string | null
          document_date?: string | null
          document_number?: string | null
          invoice_id?: string | null
          invoice_type?: number | null
          total_document_amount?: number | null
          unallocated_movement_count?: never
        }
        Relationships: [
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_invoices_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
        ]
      }
      v_user_effective_permissions: {
        Row: {
          action: string | null
          company_id: string | null
          is_granted: boolean | null
          is_user_override: boolean | null
          permission_id: string | null
          resource: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_work_hours_complete: {
        Row: {
          break_duration_minutes: number | null
          company_email: string | null
          company_id: string | null
          company_name: string | null
          company_phone: string | null
          company_vat: string | null
          construction_site_actual_end_date: string | null
          construction_site_address: string | null
          construction_site_city: string | null
          construction_site_country: string | null
          construction_site_description: string | null
          construction_site_expected_end_date: string | null
          construction_site_id: string | null
          construction_site_latitude: number | null
          construction_site_longitude: number | null
          construction_site_name: string | null
          construction_site_postal_code: string | null
          construction_site_start_date: string | null
          construction_site_status: string | null
          emergency_description: string | null
          holiday_hours: number | null
          holiday_name: string | null
          is_emergency_work: boolean | null
          is_national_holiday: boolean | null
          is_regional_holiday: boolean | null
          night_hours: number | null
          overtime_hours: number | null
          owner_company_name: string | null
          owner_company_vat: string | null
          rain_hours: number | null
          regular_hours: number | null
          shift_end_time: string | null
          shift_start_time: string | null
          sunday_hours: number | null
          total_hours: number | null
          user_id: string | null
          work_date: string | null
          work_description: string | null
          work_hour_category_code: string | null
          work_hour_category_description: string | null
          work_hour_category_id: string | null
          work_hour_category_name: string | null
          work_hour_macro_category_code: string | null
          work_hour_macro_category_description: string | null
          work_hour_macro_category_id: string | null
          work_hour_macro_category_name: string | null
          work_hours_created_at: string | null
          work_hours_id: string | null
          work_hours_updated_at: string | null
          work_type: string | null
          worker_address: string | null
          worker_avatar: string | null
          worker_city: string | null
          worker_country: string | null
          worker_email: string | null
          worker_full_name: string | null
          worker_name: string | null
          worker_phone: string | null
          worker_postal_code: string | null
          worker_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_document_history: {
        Row: {
          attached_at: string | null
          attached_by: string | null
          company_id: string | null
          created_at: string | null
          doc_id: string | null
          document_id: string | null
          expiry_date: string | null
          file_name: string | null
          file_size: number | null
          file_url: string | null
          is_latest_version: boolean | null
          is_required: boolean | null
          is_superseded: boolean | null
          issue_date: string | null
          macro_type_code: string | null
          macro_type_name: string | null
          metadata: Json | null
          mime_type: string | null
          status: string | null
          superseded_by_document_id: string | null
          supersedes_document_id: string | null
          type_code: string | null
          type_id: string | null
          type_name: string | null
          updated_at: string | null
          uploaded_at: string | null
          uploaded_by: string | null
          version_number: number | null
          worker_doc_notes: string | null
          worker_document_id: string | null
          worker_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_attached_by_fkey"
            columns: ["attached_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_document_expiry_report"
            referencedColumns: ["document_id"]
          },
          {
            foreignKeyName: "worker_documents_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "v_worker_document_history"
            referencedColumns: ["doc_id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_document_stats: {
        Row: {
          company_id: string | null
          expired_documents_count: number | null
          expiring_documents_count: number | null
          next_expiry_date: string | null
          total_documents: number | null
          user_id: string | null
          valid_documents_count: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_documents_worker_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_invitations: {
        Row: {
          accepted_at: string | null
          company_id: string | null
          computed_status: string | null
          days_until_expiry: number | null
          email: string | null
          expires_at: string | null
          invitation_id: string | null
          invitation_token: string | null
          invited_at: string | null
          invited_by_email: string | null
          invited_by_full_name: string | null
          invited_by_name: string | null
          invited_by_surname: string | null
          invited_by_user_id: string | null
          is_expired: boolean | null
          name: string | null
          rejected_at: string | null
          role_display_name: string | null
          role_id: string | null
          role_name: string | null
          status: string | null
          surname: string | null
          temp_worker_id: string | null
          user_full_name: string | null
          user_id: string | null
          user_name: string | null
          user_surname: string | null
          worker_data: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by_user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_invited_by_fkey"
            columns: ["invited_by_user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_invitations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_leave_requests: {
        Row: {
          affects_balance: boolean | null
          company_id: string | null
          created_at: string | null
          description: string | null
          detailed_description: string | null
          document_count: number | null
          document_ids: string[] | null
          duration_days: number | null
          end_date: string | null
          id: string | null
          is_paid: boolean | null
          leave_type_color: string | null
          leave_type_display: string | null
          leave_type_icon: string | null
          leave_type_id: string | null
          leave_type_name: string | null
          priority: string | null
          reason: string | null
          requires_document: boolean | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_name: string | null
          start_date: string | null
          status: string | null
          submitted_at: string | null
          title: string | null
          updated_at: string | null
          user_avatar: string | null
          user_email: string | null
          user_full_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_leave_request_details_leave_type_id_fkey"
            columns: ["leave_type_id"]
            isOneToOne: false
            referencedRelation: "leave_request_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_material_requests: {
        Row: {
          company_id: string | null
          cost_center_cat_code: string | null
          cost_center_cat_id: string | null
          cost_center_cat_name: string | null
          cost_center_sub_code: string | null
          cost_center_sub_id: string | null
          cost_center_sub_name: string | null
          cost_center_sup_code: string | null
          cost_center_sup_id: string | null
          cost_center_sup_name: string | null
          created_at: string | null
          description: string | null
          document_count: number | null
          document_ids: string[] | null
          estimate_type_id: string | null
          estimate_type_name: string | null
          id: string | null
          material_actual_cost: number | null
          material_approved_quantity: number | null
          material_category: string | null
          material_delivered_at: string | null
          material_item_barcode: string | null
          material_item_description: string | null
          material_item_name: string | null
          material_max_stock_quantity: number | null
          material_min_stock_quantity: number | null
          material_needed_by_date: string | null
          material_notes: string | null
          material_project_id: string | null
          material_project_name: string | null
          material_purchase_order_number: string | null
          material_quantity: number | null
          material_site_address: string | null
          material_site_id: string | null
          material_site_name: string | null
          material_store_item_id: string | null
          material_supplier: string | null
          material_unit: string | null
          priority: string | null
          quantity_fulfilled: number | null
          quantity_unfulfilled: number | null
          requested_at: string | null
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          reviewer_name: string | null
          status: string | null
          title: string | null
          updated_at: string | null
          user_avatar: string | null
          user_email: string | null
          user_full_name: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "worker_material_request_details_cost_center_cat_id_fkey"
            columns: ["cost_center_cat_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sub_id_fkey"
            columns: ["cost_center_sub_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_cost_center_sup_id_fkey"
            columns: ["cost_center_sup_id"]
            isOneToOne: false
            referencedRelation: "cost_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "estimate_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_estimate_type_id_fkey"
            columns: ["estimate_type_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["boq_type_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["material_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["material_project_id"]
            isOneToOne: false
            referencedRelation: "v_boq_financials_current"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_project_id_fkey"
            columns: ["material_project_id"]
            isOneToOne: false
            referencedRelation: "v_tech_projects_with_financials"
            referencedColumns: ["project_id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["material_store_item_id"]
            isOneToOne: false
            referencedRelation: "company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_material_request_details_store_item_id_fkey"
            columns: ["material_store_item_id"]
            isOneToOne: false
            referencedRelation: "v_company_store_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_reviewed_by_fkey"
            columns: ["reviewed_by"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "worker_requests_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_worker_statistics: {
        Row: {
          absences_30d: number | null
          company_id: string | null
          contract_end_date: string | null
          contract_start_date: string | null
          contract_type: string | null
          contract_type_en: string | null
          contract_type_id: string | null
          contract_type_it: string | null
          delays_30d: number | null
          expired_documents_count: number | null
          expiring_documents_count: number | null
          hierarchy_level: number | null
          hourly_rate: number | null
          injury_days_30d: number | null
          is_active: boolean | null
          joined_date: string | null
          last_work_date: string | null
          next_expiry_date: string | null
          overtime_hours_30d: number | null
          regular_hours_30d: number | null
          role_display_name: string | null
          role_name: string | null
          sick_leave_days_30d: number | null
          sites_worked_30d: number | null
          total_delay_minutes_30d: number | null
          total_documents: number | null
          total_hours_30d: number | null
          total_hours_all_time: number | null
          total_hours_this_month: number | null
          total_work_days: number | null
          user_id: string | null
          vacation_days_30d: number | null
          valid_documents_count: number | null
          work_days_30d: number | null
          work_days_this_month: number | null
          worker_address: string | null
          worker_avatar: string | null
          worker_city: string | null
          worker_country: string | null
          worker_dob: string | null
          worker_email: string | null
          worker_full_name: string | null
          worker_name: string | null
          worker_phone: string | null
          worker_sex: string | null
          worker_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_companies_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "user_companies_contract_type_id_fkey"
            columns: ["contract_type_id"]
            isOneToOne: false
            referencedRelation: "work_contract_types"
            referencedColumns: ["id"]
          },
        ]
      }
      v_workers_hours: {
        Row: {
          break_duration_minutes: number | null
          company_id: string | null
          company_name: string | null
          construction_site_id: string | null
          construction_site_name: string | null
          created_at: string | null
          emergency_description: string | null
          holiday_hours: number | null
          holiday_name: string | null
          id: string | null
          is_emergency_work: boolean | null
          is_national_holiday: boolean | null
          is_regional_holiday: boolean | null
          night_hours: number | null
          overtime_hours: number | null
          rain_hours: number | null
          regular_hours: number | null
          shift_end_time: string | null
          shift_start_time: string | null
          sunday_hours: number | null
          total_hours: number | null
          updated_at: string | null
          user_id: string | null
          work_date: string | null
          work_description: string | null
          work_type: string | null
          worker_avatar: string | null
          worker_email: string | null
          worker_full_name: string | null
          worker_name: string | null
          worker_phone: string | null
          worker_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies_with_location"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_company_id_fkey1"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "v_company_role_permissions"
            referencedColumns: ["company_id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
      v_workers_total_hours_today: {
        Row: {
          companies_today: string | null
          construction_sites_today: string | null
          entries_count: number | null
          total_holiday_hours: number | null
          total_hours: number | null
          total_night_hours: number | null
          total_overtime_hours: number | null
          total_rain_hours: number | null
          total_regular_hours: number | null
          total_sunday_hours: number | null
          user_id: string | null
          worker_avatar: string | null
          worker_email: string | null
          worker_full_name: string | null
          worker_name: string | null
          worker_phone: string | null
          worker_surname: string | null
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_user_id_fkey1"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "v_worker_statistics"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Functions: {
      apply_permission_template: {
        Args: {
          p_applied_by: string
          p_company_id: string
          p_role_id: string
          p_template_id: string
        }
        Returns: boolean
      }
      auto_allocate_invoice_to_purchase_order: {
        Args: { p_auto_approve?: boolean; p_invoice_id: string }
        Returns: {
          allocated: boolean
          allocation_count: number
          match_score: number
          message: string
          purchase_order_id: string
        }[]
      }
      calculate_forecast_cost_allocations: {
        Args: { p_forecast_card_id: string }
        Returns: {
          allocation_count: number
          total_allocated_cost: number
          total_revenue: number
        }[]
      }
      calculate_invoice_po_match_score: {
        Args: { p_invoice_id: string; p_purchase_order_id: string }
        Returns: number
      }
      complete_invoice_classification: {
        Args: { p_queue_id: string; p_result: Json }
        Returns: undefined
      }
      convert_forecast_allocations_to_transactions:
        | {
            Args: {
              p_forecast_card_id: string
              p_sal_number: number
              p_transaction_type: number
            }
            Returns: {
              total_cost: number
              transaction_count: number
            }[]
          }
        | {
            Args: {
              p_forecast_card_id: string
              p_sal_number?: number
              p_transaction_type_code?: number
            }
            Returns: {
              total_cost: number
              transaction_count: number
            }[]
          }
      count_invoices_pending_classification: {
        Args: { p_company_id: string }
        Returns: number
      }
      count_invoices_with_categories: {
        Args: {
          p_company_id: string
          p_invoice_type?: number
          p_macro_category?: string
        }
        Returns: number
      }
      create_default_roles: {
        Args: { p_company_id: string; p_created_by: string }
        Returns: undefined
      }
      create_fiscal_year_hierarchy: {
        Args: { p_company_id: string; p_start_month?: number; p_year: number }
        Returns: string
      }
      create_inventory_movement: {
        Args: {
          p_company_id: string
          p_created_by: string
          p_from_location_id?: string
          p_from_location_type: string
          p_item_id: string
          p_movement_date?: string
          p_movement_reason?: string
          p_movement_type: number
          p_notes?: string
          p_purchase_order_id?: string
          p_quantity_moved: number
          p_supplier_company_id?: string
          p_supplier_item_id?: string
          p_to_location_id?: string
          p_to_location_type: string
          p_unitary_cost?: number
          p_unitary_price?: number
        }
        Returns: string
      }
      decrypt_credential: { Args: { p_ciphertext: string }; Returns: string }
      delete_inventory_movement: {
        Args: { p_movement_id: string }
        Returns: boolean
      }
      dequeue_invoice_classification: {
        Args: { p_batch_size?: number }
        Returns: {
          attempts: number | null
          classification_result: Json | null
          company_id: string
          completed_at: string | null
          created_at: string | null
          extracted_text: string | null
          extraction_metadata: Json | null
          file_type: string | null
          file_url: string | null
          id: string
          invoice_id: string
          last_error: string | null
          max_attempts: number | null
          priority: number | null
          queued_at: string | null
          started_at: string | null
          status: string
          updated_at: string | null
        }[]
        SetofOptions: {
          from: "*"
          to: "invoice_classification_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      encrypt_credential: { Args: { p_plaintext: string }; Returns: string }
      fail_invoice_classification:
        | { Args: { p_error: string; p_queue_id: string }; Returns: undefined }
        | {
            Args: {
              p_error: string
              p_error_context?: Json
              p_queue_id: string
            }
            Returns: undefined
          }
      find_matching_purchase_orders: {
        Args: { p_invoice_id: string; p_min_score?: number }
        Returns: {
          cost_center_cat_id: string
          cost_center_sub_id: string
          cost_center_sup_id: string
          estimate_type_id: string
          match_score: number
          order_amount: number
          order_number: string
          project_id: string
          purchase_order_id: string
          suggested_allocation_percentage: number
          supplier_name: string
          unfulfilled_amount: number
        }[]
      }
      fn_calculate_allocation_weights: {
        Args: { p_company_id: string; p_invoice_id: string }
        Returns: {
          allocation_percentage: number
          confidence_score: number
          construction_site_id: string
          cost_center_code: string
          cost_center_id: string
          cost_center_name: string
          estimate_type_id: string
          estimate_type_name: string
          hierarchy_level: number
          project_id: string
          sal_number: number
          structure_level_id: string
          structure_level_name: string
          total_cost: number
          total_hours: number
          worker_count: number
        }[]
      }
      fn_get_active_sal_number: {
        Args: {
          p_date?: string
          p_estimate_type_id: string
          p_project_id: string
        }
        Returns: number
      }
      get_city_by_id: {
        Args: { city_id: string }
        Returns: {
          city_name: string
          full_location_name: string
          id: string
        }[]
      }
      get_construction_sites_metrics: {
        Args: { p_company_id: string }
        Returns: {
          actual_end_date: string
          address_line_1: string
          address_line_2: string
          avatar_url: string
          budget_variance: number
          city_id: string
          company_id: string
          completion_percentage: number
          created_at: string
          description: string
          expected_end_date: string
          id: string
          location_id: string
          name: string
          sal_number: number
          sal_percentage: number
          start_date: string
          status: string
          total_actual_amount: number
          total_boq_articles: number
          total_boqs: number
          total_budgeted_amount: number
          total_work_categories: number
          updated_at: string
          work_progress: number
          workflow_step: number
        }[]
      }
      get_current_firebase_uid: { Args: never; Returns: string }
      get_effective_role_permissions: {
        Args: { p_company_id: string; p_role_id: string }
        Returns: {
          action: string
          is_customized: boolean
          is_granted: boolean
          permission_id: string
          resource: string
        }[]
      }
      get_financial_data_by_date_range: {
        Args: {
          end_date?: string
          entity_id?: string
          sal_number_filter?: number
          start_date?: string
          view_name: string
        }
        Returns: {
          result: Json
        }[]
      }
      get_forecast_card_margin: {
        Args: { p_forecast_card_id: string }
        Returns: {
          grand_total: number
          margin: number
          margin_percentage: number
          total_costs: number
          total_imprevisti: number
          total_revenues: number
        }[]
      }
      get_forecast_cards_with_margin: {
        Args: { p_site_id: string }
        Returns: {
          boq_type_id: string
          cat_ids: string[]
          construction_site_id: string
          cost_item_count: number
          created_at: string
          created_by: string
          forecast_card_id: string
          grand_total: number
          margin: number
          margin_percentage: number
          name: string
          status: string
          sub_ids: string[]
          sup_name: string
          total_costs: number
          total_imprevisti: number
          total_revenues: number
          updated_at: string
          updated_by: string
          work_super_category_id: string
        }[]
      }
      get_inventory_movements: {
        Args: {
          p_company_id: string
          p_from_date?: string
          p_item_id?: string
          p_limit?: number
          p_movement_type?: number
          p_offset?: number
          p_to_date?: string
        }
        Returns: {
          created_at: string
          created_by_full_name: string
          from_location_name: string
          from_location_type: string
          id: string
          item_barcode: string
          item_id: string
          item_name: string
          measure_unit_name: string
          movement_date: string
          movement_type: number
          movement_type_label: string
          notes: string
          quantity_moved: number
          supplier_name: string
          to_location_name: string
          to_location_type: string
          total_cost: number
          total_price: number
          unitary_cost: number
          unitary_price: number
        }[]
      }
      get_invoices_pending_classification: {
        Args: { p_company_id: string; p_limit?: number; p_offset?: number }
        Returns: {
          currency: string
          customer_supplier_description: string
          customer_supplier_vat_number: string
          description: string
          document_date: string
          document_number: string
          id: string
          invoice_type: number
          total_document_amount: number
        }[]
      }
      get_invoices_with_categories: {
        Args: {
          p_company_id: string
          p_invoice_type?: number
          p_limit?: number
          p_macro_category?: string
          p_offset?: number
        }
        Returns: {
          ai_confidence: string
          ai_extracted_at: string
          ai_notes: string
          category: string
          category_description: string
          company_id: string
          currency: string
          customer_supplier_description: string
          customer_supplier_vat_number: string
          description: string
          document_date: string
          document_number: string
          id: string
          invoice_category_id: string
          invoice_type: number
          macro_category: string
          total_document_amount: number
        }[]
      }
      get_location_delete_impact: {
        Args: { p_location_id: string }
        Returns: Json
      }
      get_role_translated: {
        Args: { p_language_code: string; p_role_id: string }
        Returns: {
          description: string
          display_name: string
          hierarchy_level: number
          id: string
          name: string
        }[]
      }
      get_site_delete_impact: { Args: { p_site_id: string }; Returns: Json }
      get_tech_project_detail: {
        Args: { p_tech_project_id: string }
        Returns: {
          actual_cost: number
          actual_end_date: string
          actual_start_date: string
          avatar_url: string
          client_company_id: string
          client_company_name: string
          client_contact_email: string
          client_contact_name: string
          color: string
          company_id: string
          cost_centers_count: number
          created_at: string
          current_sprint_number: number
          deployment_url: string
          description: string
          documentation_url: string
          expected_end_date: string
          forecasted_costs: number
          forecasted_margin: number
          forecasted_revenues: number
          id: string
          location_id: string
          methodology: string
          name: string
          paid_costs: number
          paid_margin: number
          paid_revenues: number
          planned_budget: number
          primary_language: string
          priority: string
          project_code: string
          project_id: string
          project_type_code: string
          project_type_id: string
          project_type_name: string
          real_costs: number
          real_margin: number
          real_revenues: number
          repository_url: string
          sprint_length_weeks: number
          start_date: string
          status_code: string
          status_name: string
          team_size: number
          tech_lead_name: string
          technology_stack: string[]
          total_hours_worked: number
          updated_at: string
        }[]
      }
      get_tech_projects_metrics: {
        Args: { p_company_id: string }
        Returns: {
          actual_end_date: string
          avatar_url: string
          client_company_id: string
          client_company_name: string
          color: string
          company_id: string
          cost_centers_count: number
          created_at: string
          current_sprint_number: number
          description: string
          expected_end_date: string
          forecasted_costs: number
          forecasted_margin: number
          forecasted_revenues: number
          id: string
          methodology: string
          name: string
          primary_language: string
          priority: string
          project_code: string
          project_id: string
          project_type_code: string
          project_type_name: string
          real_costs: number
          real_margin: number
          real_revenues: number
          repository_url: string
          sprint_length_weeks: number
          start_date: string
          status_code: string
          status_name: string
          team_size: number
          tech_lead_name: string
          technology_stack: string[]
          total_hours_worked: number
          updated_at: string
        }[]
      }
      get_user_role: {
        Args: { p_company_id: string; p_user_id: string }
        Returns: {
          hierarchy_level: number
          role_id: string
          role_name: string
        }[]
      }
      get_work_category_financials: {
        Args: { p_site_id: string }
        Returns: {
          boq_depth_code: number
          boq_depth_name: string
          boq_type_id: string
          boq_type_name: string
          company_id: string
          construction_site_id: string
          created_at: string
          delta_costs: number
          delta_margin: number
          delta_paid_costs: number
          delta_paid_margin: number
          delta_paid_revenues: number
          delta_revenues: number
          discount: number
          forecasted_costs: number
          forecasted_margin: number
          forecasted_revenues: number
          forecasted_revenues_discounted: number
          paid_costs: number
          paid_margin: number
          paid_revenues: number
          paid_revenues_discounted: number
          production_value: number
          real_costs: number
          real_margin: number
          real_revenues: number
          real_revenues_discounted: number
          sal_number: number
          sal_progression: number
          timestamp: string
          updated_at: string
          work_category_id: string
          work_category_name: string
          work_category_parent_ids: string[]
          workflow_step: number
        }[]
      }
      get_work_hours_complete: {
        Args: { p_company_id: string }
        Returns: {
          break_duration_minutes: number
          company_email: string
          company_id: string
          company_name: string
          company_phone: string
          company_vat: string
          construction_site_actual_end_date: string
          construction_site_address: string
          construction_site_city: string
          construction_site_country: string
          construction_site_description: string
          construction_site_expected_end_date: string
          construction_site_id: string
          construction_site_latitude: number
          construction_site_longitude: number
          construction_site_name: string
          construction_site_postal_code: string
          construction_site_start_date: string
          construction_site_status: string
          emergency_description: string
          holiday_hours: number
          holiday_name: string
          is_emergency_work: boolean
          is_national_holiday: boolean
          is_regional_holiday: boolean
          night_hours: number
          overtime_hours: number
          owner_company_name: string
          owner_company_vat: string
          rain_hours: number
          regular_hours: number
          shift_end_time: string
          shift_start_time: string
          sunday_hours: number
          total_hours: number
          user_id: string
          work_date: string
          work_description: string
          work_hour_category_code: string
          work_hour_category_description: string
          work_hour_category_id: string
          work_hour_category_name: string
          work_hour_macro_category_code: string
          work_hour_macro_category_description: string
          work_hour_macro_category_id: string
          work_hour_macro_category_name: string
          work_hours_created_at: string
          work_hours_id: string
          work_hours_updated_at: string
          work_type: string
          worker_address: string
          worker_avatar: string
          worker_city: string
          worker_country: string
          worker_email: string
          worker_full_name: string
          worker_name: string
          worker_phone: string
          worker_postal_code: string
          worker_surname: string
        }[]
      }
      get_workers_hours: {
        Args: { p_company_id: string }
        Returns: {
          company_id: string
          holiday_hours: number
          id: string
          night_hours: number
          overtime_hours: number
          rain_hours: number
          regular_hours: number
          sunday_hours: number
          total_hours: number
          user_id: string
          worker_avatar: string
          worker_email: string
          worker_full_name: string
          worker_phone: string
        }[]
      }
      get_workers_total_hours_today: {
        Args: never
        Returns: {
          total_holiday_hours: number
          total_hours: number
          total_night_hours: number
          total_overtime_hours: number
          total_rain_hours: number
          total_regular_hours: number
          total_sunday_hours: number
          user_id: string
          worker_avatar: string
          worker_email: string
          worker_full_name: string
          worker_name: string
          worker_phone: string
          worker_surname: string
        }[]
      }
      migrate_all_construction_sites_to_projects: {
        Args: never
        Returns: {
          errors: number
          sites_already_migrated: number
          sites_migrated: number
          sites_processed: number
        }[]
      }
      migrate_construction_site_to_project: {
        Args: { p_construction_site_id: string }
        Returns: string
      }
      queue_notification: {
        Args: {
          p_app_id: string
          p_body: string
          p_deep_link_path?: string
          p_entity_id?: string
          p_entity_type?: string
          p_notification_type: string
          p_priority?: string
          p_title: string
          p_user_id: string
        }
        Returns: undefined
      }
      reset_role_permissions: {
        Args: { p_company_id: string; p_reset_by: string; p_role_id: string }
        Returns: boolean
      }
      retry_failed_classifications: { Args: never; Returns: undefined }
      rpc_acube_cache_jwt_token: {
        Args: { p_expires_at: string; p_jwt_token: string }
        Returns: boolean
      }
      rpc_acube_check_credentials_expiration: {
        Args: never
        Returns: {
          alert_level: string
          appointee_tax_code: string
          config_id: string
          credentials_status: Database["public"]["Enums"]["acube_credential_status"]
          days_remaining: number
        }[]
      }
      rpc_acube_check_duplicate: {
        Args: { p_sdi_identifier: string }
        Returns: {
          imported_at: string
          invoice_id: string
          is_duplicate: boolean
        }[]
      }
      rpc_acube_cleanup_old_sync_logs: {
        Args: { p_days?: number }
        Returns: number
      }
      rpc_acube_complete_sync_log: {
        Args: {
          p_acube_request_id?: string
          p_error_code?: string
          p_error_details?: Json
          p_error_message?: string
          p_invoices_failed?: number
          p_invoices_found?: number
          p_invoices_imported?: number
          p_invoices_skipped?: number
          p_log_id: string
          p_status: Database["public"]["Enums"]["acube_log_status"]
        }
        Returns: Json
      }
      rpc_acube_create_registration:
        | {
            Args: {
              p_authorization_status?: Database["public"]["Enums"]["acube_authorization_status"]
              p_business_registry_config_id?: string
              p_company_id: string
              p_sync_customer_invoices?: boolean
              p_sync_notifications?: boolean
              p_sync_supplier_invoices?: boolean
              p_tax_code: string
            }
            Returns: Json
          }
        | {
            Args: {
              p_company_id: string
              p_sync_customer_invoices?: boolean
              p_sync_notifications?: boolean
              p_sync_supplier_invoices?: boolean
              p_tax_code: string
            }
            Returns: Json
          }
      rpc_acube_create_sync_log: {
        Args: {
          p_registration_id: string
          p_request_id?: string
          p_sync_source?: Database["public"]["Enums"]["acube_sync_source"]
          p_sync_type: Database["public"]["Enums"]["acube_sync_type"]
          p_webhook_payload?: Json
        }
        Returns: string
      }
      rpc_acube_delete_registration: { Args: { p_id: string }; Returns: Json }
      rpc_acube_get_active_registrations: {
        Args: never
        Returns: {
          business_registry_config_id: string
          company_id: string
          id: string
          last_customer_invoice_date: string
          last_supplier_invoice_date: string
          last_sync_at: string
          sync_customer_invoices: boolean
          sync_supplier_invoices: boolean
          tax_code: string
        }[]
      }
      rpc_acube_get_configuration: {
        Args: never
        Returns: {
          data: Json
          error_message: string
          success: boolean
        }[]
      }
      rpc_acube_get_credentials_for_sync: {
        Args: never
        Returns: {
          acube_email: string
          acube_password: string
          environment: Database["public"]["Enums"]["acube_environment"]
          jwt_expires_at: string
          jwt_token: string
        }[]
      }
      rpc_acube_get_invoice_mapping: {
        Args: { p_invoice_id: string }
        Returns: {
          acube_invoice_id: string
          document_type: string
          id: string
          import_source: Database["public"]["Enums"]["acube_import_source"]
          imported_at: string
          invoice_direction: Database["public"]["Enums"]["acube_invoice_direction"]
          invoice_id: string
          original_pdf_path: string
          original_xml_path: string
          registration_id: string
          sdi_identifier: string
        }[]
      }
      rpc_acube_get_registration: {
        Args: { p_id: string }
        Returns: {
          authorization_completed_at: string
          authorization_error: string
          authorization_requested_at: string
          authorization_status: Database["public"]["Enums"]["acube_authorization_status"]
          business_registry_config_id: string
          company_id: string
          created_at: string
          id: string
          last_customer_invoice_date: string
          last_supplier_invoice_date: string
          last_sync_at: string
          last_sync_error: string
          last_sync_status: Database["public"]["Enums"]["acube_sync_status"]
          sync_customer_invoices: boolean
          sync_notifications: boolean
          sync_supplier_invoices: boolean
          tax_code: string
          total_invoices_imported: number
          updated_at: string
        }[]
      }
      rpc_acube_get_sync_statistics: {
        Args: { p_days?: number; p_registration_id?: string }
        Returns: {
          avg_duration_ms: number
          failed_syncs: number
          last_sync_at: string
          last_sync_status: Database["public"]["Enums"]["acube_log_status"]
          successful_syncs: number
          total_invoices_imported: number
          total_invoices_skipped: number
          total_syncs: number
        }[]
      }
      rpc_acube_import_invoice: {
        Args: {
          p_acube_invoice_id?: string
          p_company_id: string
          p_document_type?: string
          p_import_source?: Database["public"]["Enums"]["acube_import_source"]
          p_invoice_data: Json
          p_invoice_direction?: Database["public"]["Enums"]["acube_invoice_direction"]
          p_line_items?: Json
          p_original_pdf_path?: string
          p_original_xml_path?: string
          p_registration_id?: string
          p_sdi_identifier: string
          p_sync_log_id?: string
        }
        Returns: Json
      }
      rpc_acube_list_invoice_mappings: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_registration_id?: string
        }
        Returns: {
          counterparty_name: string
          document_date: string
          document_number: string
          document_type: string
          id: string
          import_source: Database["public"]["Enums"]["acube_import_source"]
          imported_at: string
          invoice_direction: Database["public"]["Enums"]["acube_invoice_direction"]
          invoice_id: string
          sdi_identifier: string
          total_amount: number
          total_count: number
        }[]
      }
      rpc_acube_list_registrations: {
        Args: { p_company_id?: string }
        Returns: {
          authorization_completed_at: string
          authorization_error: string
          authorization_requested_at: string
          authorization_status: Database["public"]["Enums"]["acube_authorization_status"]
          business_registry_config_id: string
          company_id: string
          created_at: string
          id: string
          last_sync_at: string
          last_sync_error: string
          last_sync_status: Database["public"]["Enums"]["acube_sync_status"]
          sync_customer_invoices: boolean
          sync_notifications: boolean
          sync_supplier_invoices: boolean
          tax_code: string
          total_invoices_imported: number
          updated_at: string
        }[]
      }
      rpc_acube_list_sync_logs: {
        Args: {
          p_limit?: number
          p_offset?: number
          p_registration_id?: string
          p_status?: Database["public"]["Enums"]["acube_log_status"]
        }
        Returns: {
          completed_at: string
          created_at: string
          duration_ms: number
          error_code: string
          error_message: string
          id: string
          invoices_failed: number
          invoices_found: number
          invoices_imported: number
          invoices_skipped: number
          registration_id: string
          request_id: string
          started_at: string
          status: Database["public"]["Enums"]["acube_log_status"]
          sync_source: Database["public"]["Enums"]["acube_sync_source"]
          sync_type: Database["public"]["Enums"]["acube_sync_type"]
          total_count: number
        }[]
      }
      rpc_acube_save_configuration: {
        Args: {
          p_acube_email: string
          p_acube_password: string
          p_appointee_tax_code?: string
          p_credentials_expires_at?: string
          p_environment?: Database["public"]["Enums"]["acube_environment"]
          p_webhook_secret?: string
          p_webhook_url?: string
        }
        Returns: {
          config_id: string
          error_message: string
          success: boolean
        }[]
      }
      rpc_acube_update_configuration: {
        Args: {
          p_api_key_id?: string
          p_appointee_id?: string
          p_appointee_tax_code?: string
          p_credentials_expires_at?: string
          p_credentials_status?: Database["public"]["Enums"]["acube_credential_status"]
          p_environment?: Database["public"]["Enums"]["acube_environment"]
          p_fisconline_password?: string
          p_fisconline_pin?: string
          p_fisconline_user?: string
          p_id: string
          p_private_key?: string
          p_webhook_secret?: string
          p_webhook_url?: string
        }
        Returns: Json
      }
      rpc_acube_update_last_api_call: {
        Args: { p_error?: string }
        Returns: undefined
      }
      rpc_acube_update_registration: {
        Args: {
          p_authorization_error?: string
          p_authorization_status?: Database["public"]["Enums"]["acube_authorization_status"]
          p_business_registry_config_id?: string
          p_id: string
          p_sync_customer_invoices?: boolean
          p_sync_notifications?: boolean
          p_sync_supplier_invoices?: boolean
        }
        Returns: Json
      }
      rpc_acube_update_registration_sync_status: {
        Args: {
          p_customer_invoice_date?: string
          p_error?: string
          p_invoices_imported?: number
          p_registration_id: string
          p_status: Database["public"]["Enums"]["acube_sync_status"]
          p_supplier_invoice_date?: string
        }
        Returns: Json
      }
      search_cities: {
        Args: { result_limit?: number; search_query: string }
        Returns: {
          city_name: string
          full_location_name: string
          id: string
        }[]
      }
      search_document_vectors: {
        Args: {
          filter_date_end?: string
          filter_date_start?: string
          filter_document_types?: string[]
          filter_entity_type?: string
          filter_languages?: string[]
          filter_min_quality?: number
          filter_status?: string
          match_count?: number
          match_threshold?: number
          query_company_id: string
          query_embedding: string
        }
        Returns: {
          chunk_id: string
          chunk_index: number
          chunk_metadata: Json
          chunk_text: string
          document_id: string
          document_name: string
          document_type: string
          page_number: number
          similarity_score: number
        }[]
      }
      search_notes: {
        Args: {
          filter_tags?: string[]
          filter_user_id?: string
          search_company_id: string
          search_limit?: number
          search_query?: string
        }
        Returns: {
          author_name: string
          content: string
          created_at: string
          note_id: string
          rank: number
          tags: string[]
          title: string
          updated_at: string
        }[]
      }
      set_acube_encryption_key: { Args: { p_key: string }; Returns: undefined }
      set_firebase_uid: { Args: { firebase_uid: string }; Returns: undefined }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      toggle_document_favorite: {
        Args: { company_id_param: string; document_id_param: string }
        Returns: boolean
      }
      toggle_document_pinned: {
        Args: { company_id_param: string; document_id_param: string }
        Returns: boolean
      }
      toggle_note_favorite: {
        Args: { note_id_param: string }
        Returns: boolean
      }
      toggle_note_pinned: { Args: { note_id_param: string }; Returns: boolean }
      update_inventory_movement: {
        Args: {
          p_movement_date?: string
          p_movement_id: string
          p_notes?: string
          p_quantity_moved?: number
          p_unitary_cost?: number
          p_unitary_price?: number
        }
        Returns: boolean
      }
      update_role_permission: {
        Args: {
          p_changed_by: string
          p_company_id: string
          p_is_granted: boolean
          p_permission_id: string
          p_reason?: string
          p_role_id: string
        }
        Returns: boolean
      }
      update_user_permission_override: {
        Args: {
          p_changed_by: string
          p_grant_type: string
          p_permission_id: string
          p_reason?: string
          p_user_company_id: string
        }
        Returns: boolean
      }
      user_has_permission: {
        Args: {
          p_action: string
          p_company_id: string
          p_resource: string
          p_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      acube_authorization_status:
        | "pending"
        | "awaiting_authorization"
        | "active"
        | "suspended"
        | "error"
      acube_credential_status: "pending" | "active" | "expiring" | "expired"
      acube_environment: "sandbox" | "production"
      acube_import_source: "webhook" | "polling" | "manual"
      acube_invoice_direction: "supplier" | "customer"
      acube_log_status:
        | "pending"
        | "processing"
        | "success"
        | "partial"
        | "error"
      acube_sync_source:
        | "supplier-invoice"
        | "customer-invoice"
        | "customer-notification"
        | "bulk-sync"
      acube_sync_status: "success" | "partial" | "error"
      acube_sync_type: "webhook" | "scheduled" | "manual"
      work_areas: "finance" | "technical" | "store" | "hr"
      work_hour_tracking_mode: "DIRECT_COST_CENTER" | "MAPPED_CATEGORIES"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      acube_authorization_status: [
        "pending",
        "awaiting_authorization",
        "active",
        "suspended",
        "error",
      ],
      acube_credential_status: ["pending", "active", "expiring", "expired"],
      acube_environment: ["sandbox", "production"],
      acube_import_source: ["webhook", "polling", "manual"],
      acube_invoice_direction: ["supplier", "customer"],
      acube_log_status: [
        "pending",
        "processing",
        "success",
        "partial",
        "error",
      ],
      acube_sync_source: [
        "supplier-invoice",
        "customer-invoice",
        "customer-notification",
        "bulk-sync",
      ],
      acube_sync_status: ["success", "partial", "error"],
      acube_sync_type: ["webhook", "scheduled", "manual"],
      work_areas: ["finance", "technical", "store", "hr"],
      work_hour_tracking_mode: ["DIRECT_COST_CENTER", "MAPPED_CATEGORIES"],
    },
  },
} as const


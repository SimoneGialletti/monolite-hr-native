export type RootStackParamList = {
  Auth: undefined;
  AuthCallback: {
    token_hash?: string;
    type?: string;
    redirect_to?: string;
    access_token?: string;
    refresh_token?: string;
    token?: string;
    error?: string;
    error_description?: string;
  } | undefined;
  ConfirmEmail: undefined;
  EmailConfirmed: undefined;
  EmailChangeConfirmed: { step: 'first' | 'complete'; otherEmail?: string };
  ResetPassword: undefined;
  UpdatePassword: undefined;
  PrivacyPolicy: undefined;
  TermsAndConditions: undefined;
  AppleCallback: undefined;
  AcceptInvitation: { token?: string };
  Main: undefined;
  Home: undefined;
  LogHours: undefined;
  MaterialRequest: undefined;
  LeaveRequest: undefined;
  MyActivities: undefined;
  Communications: undefined;
  Settings: undefined;
  PendingInvitation: undefined;
  NotFound: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ActivitiesTab: undefined;
  MessagesTab: undefined;
  ProfileTab: undefined;
};

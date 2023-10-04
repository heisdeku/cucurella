interface IMetadata {
  userId: string;
}

interface IHistoryItem {
  type: string;
  message: string;
  time: number;
}

interface ILog {
  start_time: number;
  time_spent: number;
  attempts: number;
  authentication: string;
  errors: number;
  success: boolean;
  mobile: boolean;
  input: any[];
  history: IHistoryItem[];
}

interface IAuthorization {
  authorization_code: string;
  bin: string;
  last4: string;
  exp_month: string;
  exp_year: string;
  channel: string;
  card_type: string;
  bank: string;
  country_code: string;
  brand: string;
  reusable: boolean;
  signature: any;
  account_name: any;
  receiver_bank_account_number: any;
  receiver_bank: any;
}

interface ICustomer {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email: string;
  customer_code: string;
  phone: string | null;
  metadata: any;
  risk_action: string;
  international_format_phone: string | null;
}

export interface IPaymentVerifyData {
  id: number;
  domain: string;
  status: string;
  reference: string;
  receipt_number: null;
  amount: number;
  message: string;
  gateway_response: string;
  paid_at: string;
  created_at: string;
  channel: string;
  currency: string;
  ip_address: string;
  metadata: IMetadata;
  log: ILog;
  fees: number;
  fees_split: null;
  authorization: IAuthorization;
  customer: ICustomer;
  plan: null;
  split: any;
  order_id: null;
  paidAt: string;
  createdAt: string;
  requested_amount: number;
  pos_transaction_data: null;
  source: null;
  fees_breakdown: null;
  transaction_date: string;
  plan_object: any;
  subaccount: any;
}

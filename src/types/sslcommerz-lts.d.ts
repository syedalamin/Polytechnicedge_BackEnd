declare module 'sslcommerz-lts' {
  interface PaymentInitData {
    total_amount: number | string | { toNumber(): number } | { toString(): string };
    currency: string;
    tran_id: string;
    success_url: string;
    fail_url: string;
    cancel_url: string;
    ipn_url?: string;
    shipping_method?: string;
    product_name?: string;
    product_category?: string;
    product_profile?: string;
    cus_name?: string;
    cus_email?: string;
    cus_add1?: string;
    cus_add2?: string;
    cus_city?: string;
    cus_state?: string;
    cus_postcode?: string | number;
    cus_country?: string;
    cus_phone?: string;
    cus_fax?: string;
    ship_name?: string;
    ship_add1?: string;
    ship_add2?: string;
    ship_city?: string;
    ship_state?: string;
    ship_postcode?: string | number;
    ship_country?: string;
    emi_option?: number;
    emi_max_inst_option?: number;
    emi_selected_inst?: number;
    value_a?: string;
    value_b?: string;
    value_c?: string;
    value_d?: string;
    [key: string]: any;
  }

  interface ValidationData {
    val_id: string;
  }

  interface RefundData {
    refund_amount: number;
    refund_remarks: string;
    bank_tran_id: string;
    refe_id: string;
  }

  interface RefundQueryData {
    refund_ref_id: string;
  }

  interface TransactionQueryBySessionData {
    sessionkey: string;
  }

  interface TransactionQueryByTransactionData {
    tran_id: string;
  }

  interface ApiResponse {
    status: string;
    GatewayPageURL?: string;
    [key: string]: any;
  }

  class SSLCommerzPayment {
    constructor(store_id: string, store_passwd: string, live: boolean);

    init(data: PaymentInitData, url?: string, method?: string): Promise<ApiResponse>;
    validate(data: ValidationData, url?: string, method?: string): Promise<any>;
    initiateRefund(data: RefundData, url?: string, method?: string): Promise<any>;
    refundQuery(data: RefundQueryData, url?: string, method?: string): Promise<any>;
    transactionQueryBySessionId(data: TransactionQueryBySessionData, url?: string, method?: string): Promise<any>;
    transactionQueryByTransactionId(data: TransactionQueryByTransactionData, url?: string, method?: string): Promise<any>;
  }

  export = SSLCommerzPayment;
}

import { Connection } from "mongoose";
import { Store, StoreSchema } from "../modules/store/schema/store.schema";

export const tenantModels = {
    storeModel: {
      provide: "STORE_MODEL",
      useFactory: async (tenantConnection: Connection) => {
        return tenantConnection.model(Store.name, StoreSchema);
      },
      inject: ["TENANT_CONNECTION"],
    },
};
// userModel: {
//   provide: "USERS_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(User.name, UserSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// contactModel: {
//   provide: "CONTACT_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Contact.name, ContactSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// recordingModel: {
//   provide: "RECORDING_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Recording.name, RecordingSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// listModel: {
//   provide: "LIST_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(List.name, ListSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// roleModel: {
//   provide: "ROLE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Role.name, RoleSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// campaginModel: {
//   provide: "CAMPAGIN_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Campaign.name, CampaignSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// twilioNumberModel: {
//   provide: "TWILIO_NUMBER_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(TwilioNumber.name, TwilioNumberSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// knowledgeBaseModel: {
//   provide: "KNOWLEDGE_BASE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(KnowledgeBase.name, KnowledgeBaseSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// IsvRegistrationModel: {
//   provide: "ISV_REGISTRATION_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       IsvRegistration.name,
//       IsvRegistrationSchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// paymentMethodModel: {
//   provide: "PAYMENT_METHOD_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(PaymentMethod.name, PaymentMethodSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// billingAddressModel: {
//   provide: "BILLING_ADDRESS_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(BillingAddress.name, BillingAddressSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// subscriptionModel: {
//   provide: "SUBSCRIPTION_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Subscriptions.name, SubscriptionsSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// invoiceModel: {
//   provide: "INVOICE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Invoice.name, InvoiceSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// subscriptionHistoryModel: {
//   provide: "SUBSCRIPTION_HISTORY_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       SubscriptionHistory.name,
//       SubscriptionHistorySchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// transactionHistoryModel: {
//   provide: "TRANSACTION_HISTORY_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       TransactionHistory.name,
//       TransactionHistorySchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// paymentHistoryModel: {
//   provide: "PAYMENT_HISTORY_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(PaymentHistory.name, PaymentHistorySchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// numberPricingModel: {
//   provide: "NUMBER_PRICING_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(NumberPricing.name, NumberPricingSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// teamsModel: {
//   provide: "TEAMS_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Team.name, TeamSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// orgnizationsModel: {
//   provide: "ORGNIZATIONS_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Organizations.name, OrganizationSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },

// eventTypeModel: <Provider>{
//   provide: "EVENTTYPE_MODEL",
//   useFactory: (connection: Connection) =>
//     connection.model(EventType.name, EventTypeSchema), // 'EventType' must match the schema
//   inject: ["TENANT_CONNECTION"],
// },

// appointmentTypeModel: <Provider>{
//   provide: "APPOINTMENTTYPE_MODEL",
//   useFactory: (connection: Connection) =>
//     connection.model(AppointmentType.name, AppointmentTypeSchema), // 'EventType' must match the schema
//   inject: ["TENANT_CONNECTION"],
// },
// affiliatesModel: {
//   provide: "AFFILIATE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Affiliate.name, AffiliateSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// affiliatesRevenueModel: {
//   provide: "AFFILIATE_REVENUE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       AffiliateRevenue.name,
//       AffiliateRevenueSchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// affiliatesPayoutModel: {
//   provide: "AFFILIATE_PAYOUT_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       AffiliatePayout.name,
//       AffiliatePayoutSchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// referralCodesModel: {
//   provide: "REFERRAL_CODE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(ReferralCode.name, ReferralCodeSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// aiAgentsModel: {
//   provide: "AI_AGENT_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(AiAgent.name, AiAgentSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// aiAgentTemplatesModel: {
//   provide: "AI_AGENT_TEMPLATE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       AiAgentTemplate.name,
//       AiAgentTemplateSchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// industryTemplatesModel: {
//   provide: "INDUSTRY_TEMPLATE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(
//       IndustryTemplate.name,
//       IndustryTemplateSchema
//     );
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// avatarTemplatesModel: {
//   provide: "AVATAR_TEMPLATE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(AvatarTemplate.name, AvatarTemplateSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// crmModel: {
//   provide: "CRM_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(CRM.name, CRMSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// crmLogsModel: {
//   provide: "CRM_LOGS_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(crmLog.name, crmLogSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },

// templateModel: {
//   provide: "TEMPLATE_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Template.name, templateSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },

// feedbackModel: {
//   provide: "FEEDBACK_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(Feedback.name, FeedbackSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// toolFnModel: {
//   provide: "TOOLFN_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(ToolFn.name, ToolFnSchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
// apiKeyModal: {
//   provide: "API_KEY_MODEL",
//   useFactory: async (tenantConnection: Connection) => {
//     return tenantConnection.model(ApiKey.name, ApiKeySchema);
//   },
//   inject: ["TENANT_CONNECTION"],
// },
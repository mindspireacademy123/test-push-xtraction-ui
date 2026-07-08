# 📄 Frontend Implementation Roadmap - Xtraction UI

This document maps out the required frontend issues to implement in the `xtraction-ui` Angular codebase to fully align with the changes and new features in the `xtraction-api` backend.

---

## 🛠️ Category 1: Authentication & Onboarding
The backend has restructured OAuth2 logins, password recoveries, and brute-force lockouts. The frontend needs to adapt to these changes.

### 1.1 OAuth2 callback Route & Token Handler (`/oauth2/callback`)
* **Rationale**: The backend's social login redirects users to the frontend at `http://localhost:4200/oauth2/callback?token=...&profileComplete=...` or with an `?error=...` query param.
* **Requirements**:
  * Implement `OAuth2CallbackComponent` and register the route `/oauth2/callback` in `app.routes.ts`.
  * Parse query parameters: `token` (JWT access token) and `profileComplete` (boolean).
  * Save the JWT in state/storage, handle session initialization, and redirect to:
    * `/onboarding` if `profileComplete` is `false`.
    * `/user/dashboard` if `profileComplete` is `true`.
  * Handle the `error` parameter to display appropriate failure alerts with retry options.

### 1.2 Onboarding Profile Details Page (`/onboarding`)
* **Rationale**: Social signups from Google/GitHub have verified emails but lack professional metadata.
* **Requirements**:
  * Create `OnboardingComponent` for users redirecting from social logins with incomplete profiles.
  * Form fields: `country` (required drop-down/auto-complete), `profession` (optional), `organization` (optional), and checkboxes for `acceptTerms` (must be true) and `subscribeToMarketing`.
  * On submit, send a `PUT /api/v1/user/profile/{userId}` request to save onboarding metadata, then redirect to `/user/dashboard`.

### 1.3 Login Lockout Alert & Attempts Tracker
* **Rationale**: The backend implements brute-force protection, locking accounts for 5 days after 4 consecutive failures, returning status code `403 Forbidden` with the remaining lockout duration.
* **Requirements**:
  * Catch rate-limiting/lockout errors in the HTTP interceptors or login view.
  * Render explicit alerts based on server-returned messages:
    * *"Invalid credentials. You have X attempts left."* (when attempts remain).
    * *"Your account is temporarily locked. Try again in X days/hours/minutes."* (when account is locked out).

---

## 🔌 Category 2: WebSockets & Push Notifications
Asynchronous pipelines (uploads, OCR, and AI indexing) now use ticket-based WebSockets. Push notifications are registered and managed via FCM.

### 2.1 Ticket-Based WebSocket Connection Manager
* **Rationale**: Browsers do not support custom authorization headers in WebSocket handshakes. The backend requires a one-time ticket before connection.
* **Requirements**:
  * Create a `WebSocketService` using SockJS and STOMP (`@stomp/stompjs`).
  * Before connecting, call `POST /api/v1/ws/ticket` with the JWT bearer header to get a one-time `ticket` token.
  * Connect to `/ws/extraction-progress` passing the ticket in STOMP connection headers.
  * Auto-subscribe to `/user/queue/extraction-progress`.

### 2.2 Live Document Upload & Processing Progress Bar
* **Rationale**: The backend streams live progress events via WebSocket instead of polling.
* **Requirements**:
  * Integrate the `WebSocketService` in `DocumentUploadComponent` and `DocumentsListComponent`.
  * Listen for `ExtractionProgressEvent` phases: `UPLOAD_STARTED`, `FILE_UPLOADING`, `FILE_UPLOADED`, `EXTRACTION_PROGRESS`, `EXTRACTION_COMPLETED`, and `PIPELINE_COMPLETED`.
  * Bind progress percentages (`0` to `100`) to dynamic progress bars for each uploading/processing file.

### 2.3 FCM Device Registration & Push Handler
* **Rationale**: The API integrates with Firebase Cloud Messaging (FCM) to trigger instant alerts.
* **Requirements**:
  * Initialize the Firebase Web SDK and request browser notification permissions.
  * Register the FCM device token via `POST /api/v1/notifications/device` specifying `ios` or `android` (web acts as android/ios client or standard device type).
  * Handle incoming message payloads in the foreground.

### 2.4 Notification Drawer & Preferences View
* **Rationale**: Users can query notification logs, toggle read statuses, and edit alert preferences.
* **Requirements**:
  * Build a Notification Drawer component in the dashboard header displaying a paginated notification feed.
  * Add buttons to:
    * Mark individual notifications as read (`PATCH /api/v1/notifications/{id}/read`).
    * Mark all as read (`PATCH /api/v1/notifications/read-all`).
    * Delete alert (`DELETE /api/v1/notifications/{id}`).
  * Implement a "Notification Preferences" tab in user settings linked to `GET/PUT /api/v1/notifications/preferences` to toggle channel controls (email, push, SMS, marketing).

---

## 📂 Category 3: Document Management & Elasticsearch Search
The document workspace is enhanced with encryption options, OCR text editing, exports, and Elasticsearch.

### 3.1 Document Storage Space Footprint Indicator
* **Rationale**: Per-user storage limits are now actively enforced.
* **Requirements**:
  * Call `GET /api/v1/storage` on dashboard load.
  * Display a visual storage gauge in the dashboard sidebar showing used space vs. total allocated space (e.g., *"15.2 MB of 2.66 GB used (0.5%)"*).

### 3.2 Rich Text OCR Editor
* **Rationale**: Extracted text content can now be manually adjusted on the client side.
* **Requirements**:
  * Implement an editing view in the document detail interface.
  * Display OCR extracted text inside a rich text area (supporting Markdown or HTML).
  * Allow users to save edits via `PUT /api/v1/collections/{collectionId}/document/{documentId}/content`, updating the `editedContent` field.

### 3.3 Word Document (.docx) Exporter & Downloader
* **Rationale**: Users can export original or edited text as a structured Word document.
* **Requirements**:
  * Place a "Download DOCX" action button in the document toolbar.
  * Expose a selection dropdown to choose between downloading the "Original Raw Text" or the "Edited/Corrected Text" version.
  * Request the binary stream from `GET /api/v1/collections/{collectionId}/documents/{documentId}/download/docx?type=original|edited` and handle streaming downloads in the browser.

### 3.4 Advanced Search with Highlight Matches
* **Rationale**: Advanced full-text search is powered by Elasticsearch and provides matching query snippets.
* **Requirements**:
  * Create a `/search` landing view.
  * Include a filter bar: Date Range (ISO 8601), Target Collection selection, and toggle configurations.
  * Display search matches, rendering matched keywords surrounded by high-match fragments (decoding `<em>` HTML highlight tags safely to prevent XSS).

---

## 💰 Category 4: Billing, Credits, & Payments
Payment gateways are fully implemented. Users can purchase credit packs, transfer credits, apply promo codes, and download S3 receipts.

### 4.1 Credits Purchase with Promo Codes & Checkout
* **Rationale**: Credits can be purchased via PayPal/Paystack, supporting promo code validations.
* **Requirements**:
  * Create a Credit Pack selection view (`/credits/packs`).
  * Add a checkout modal showing: selected pack details, a "Promo Code" input field, and gateway options.
  * Validate promo codes via `GET /api/v1/promo_codes/validate/{code}`.
  * Apply code calculations using `POST /api/v1/promo_codes/apply` to display a breakdown: *Original Price*, *Discount Amount*, and *Final Price*.

### 4.2 PayPal checkout Redirect & callback Capturer
* **Rationale**: PayPal purchases require order initialization, redirection, and capture.
* **Requirements**:
  * Initialize purchase with `POST /api/v1/paypal/orders` (one-time) or `/api/v1/paypal/subscriptions` (recurring).
  * Redirect users to the approved PayPal redirect URL.
  * Implement `/payments/paypal/callback` to capture orders (`POST /api/v1/paypal/orders/{id}/capture`) and show success/failure confirmation.

### 4.3 Paystack checkout Redirect & callback Capturer
* **Rationale**: African currency payments are routed through Paystack.
* **Requirements**:
  * Call `POST /api/v1/paystack/transaction/initialize` and redirect the user to the gateway checkout.
  * Implement `/payments/paystack/callback` to verify references (`GET /api/v1/paystack/transaction/verify/{ref}`) and show status.
  * Subscriptions: Add a toggle to enable/disable Paystack auto-renewals (this requests a verification token sent via email, then calls `/api/v1/paystack/subscription/{code}/enable` or `disable?emailToken=...`).

### 4.4 Peer-to-Peer Credit Transfer Form
* **Rationale**: Users can transfer credits, subject to monthly limits and minimum balance rules.
* **Requirements**:
  * Build a "Transfer Credits" form panel (`/credits/transfer`).
  * Display the user's active credit balance and note the rules:
    * Senders must retain at least **5 credits** post-transfer.
    * Limit is **30 credits / month** maximum.
  * Fields: `recipientEmail` and `amount`. Submit to `POST /api/v1/credits/transfer`.

### 4.5 Credits Transaction Logs Feed
* **Rationale**: Credit allocations are tracked via paginated ledger tables.
* **Requirements**:
  * Build a paginated ledger feed page showing transaction dates, amount (incoming/deducted), transaction types (`PURCHASE`, `DEDUCTION`, `BONUS`, `REFUND`), and reason notes.

### 4.6 Credit Cost Estimator
* **Rationale**: Calculates cost projections before launching document extractions.
* **Requirements**:
  * Create an estimator widget in the document upload card.
  * On file selection, call `POST /api/v1/credits/calculate` (sending files as multipart form data).
  * Display: *Estimated Page Count*, *Credits Required*, *Current Balance*, and a warning badge if the balance is insufficient.

### 4.7 Billing Receipts PDF Downloader
* **Rationale**: Payment lifecycle actions generate PDF receipts stored on S3.
* **Requirements**:
  * Create a "Receipts & Invoices" tab under billing settings.
  * Render a paginated list of receipts showing transaction details.
  * Include a download button that queries `GET /api/v1/receipts/{receiptNumber}/download` and opens the resulting S3/CloudFront URL.
  * Add multi-select checkboxes for bulk-deletions (`DELETE /api/v1/receipts?receiptNumbers=ref1,ref2`).

---

## 🤖 Category 5: AI Document Insights
Document classifications and summarizations are performed via Mistral or OpenAI.

### 5.1 Document Summary & Insights Panel
* **Rationale**: Users can summarize completed documents with size and provider overrides.
* **Requirements**:
  * Implement an "AI Insights" drawer next to the document viewer.
  * Display a form containing:
    * Summary Type selection: `SHORT` (3 bullet points) or `DETAILED` (structured sectioned summary).
    * Model Preference toggle: `OpenAI (GPT-4o)` or `Mistral (Mistral Small)`.
  * Trigger summarization via `POST /api/v1/ai/summarize` and display the generated summary text.
  * Add a warning explaining that detailed summaries charge 2 credits (or 2 AI operations), while short summaries charge 1 credit.

### 5.2 Document Auto-Classifier & Tags Widget
* **Rationale**: Auto-classifies documents and applies tags.
* **Requirements**:
  * Add a "Classify Document" action button.
  * Call `POST /api/v1/ai/classify/{documentId}`.
  * Display the returned `documentType` classification badge (e.g. `INVOICE`, `CONTRACT`, `RECEIPT`) and dynamic `tags` pill buttons in the document metadata sidebar.

---

## 🛡️ Category 6: Unified Admin Console
An administrative dashboard for team moderators and platform admins to manage users, plans, credit packs, and system syncs.

### 6.1 Admin Console Base & Navigation Layout
* **Rationale**: Platform administration is centralized under a protected namespace.
* **Requirements**:
  * Create an Admin portal module `/admin` protected by a role guard requiring `ADMIN`, `SUPER_ADMIN`, or `MODERATOR`.
  * Build a custom sidebar dashboard layout containing navigation: Dashboard Stats, Users Directory, Subscription Plans, Credit Pack Settings, Promo Codes Console, and Sync Controls.

### 6.2 Admin Analytics & KPI Dashboard
* **Rationale**: Aggregated charts of server telemetry and growth KPIs are available via Actuators and Stats APIs.
* **Requirements**:
  * Build the landing admin view fetching KPIs from `/api/v1/admin/dashboard/stats`.
  * Integrate chart libraries (e.g., Chart.js / Ngx-charts) displaying:
    * Active vs. inactive user ratios, user growth series, role distributions.
    * Subscription plan breakdown, MRR indicators, trial conversion graphs.
    * Total storage consumed, average file sizes.
    * Notification deliveries, SMS logs, gateway performance success rates.

### 6.3 Advanced User Directory & Profile Manager
* **Rationale**: Allows comprehensive searching, filtering, and troubleshooting of user profiles.
* **Requirements**:
  * Create an admin user search grid with filter selectors: verified, locked out, profession, plan tier, country, and date ranges.
  * Create an "Enriched User Detail" side-drawer or detail view showing: profile info, status flags, subscription limits/quotas (used vs limit), credit ledger balance, and Redis login lockouts details.
  * Implement administrative action buttons:
    * Activate/Deactivate with reason pop-up.
    * Force verify email.
    * Unlock account (clears Redis blocks).
    * Trigger password reset email.
    * Soft-delete user (SUPER_ADMIN only).
    * Impersonate user (SUPER_ADMIN only; exchanges admin token to retrieve a user JWT and signs in as them).
    * Reset quotas for the current billing cycle.
    * Adjust subscription overrides (SUPER_ADMIN only) with plan selector and billing interval inputs.

### 6.4 Subscription Plans Administrator
* **Rationale**: Enables direct modifications of product offerings.
* **Requirements**:
  * Create a plans list manager view.
  * Display plan details: price, billing intervals, limits (storage, uploads, ocr pages, ai operations).
  * Build an edit form (SUPER_ADMIN only) to modify plan limits.
  * Build a plan toggle action to deactivate plans with reason inputs.
  * Show a paginated subscribers list for each plan.

### 6.5 Credit Packs Settings
* **Rationale**: Allows editing credit packages and allocating support credits.
* **Requirements**:
  * List all packs (including inactive ones).
  * Forms to create a new pack or edit pricing and credit sizes of existing ones.
  * Build a "Support Credit Allocation" card allowing admins to input a user ID/email and directly add credits with an audit note.

### 6.6 Promo Codes & Bulk Generation Console
* **Rationale**: Admin can orchestrate marketing campaigns and trace discount conversions.
* **Requirements**:
  * List all promo codes (status, discount, expirations, usage counters).
  * Create promo code forms (setting validity dates, recipient limits, custom codes).
  * View promo code usage logs (users, transaction references, amounts) and conversion graphs.
  * Bulk Generate Wizard: select template, quantity, code prefix, and auto-distribute settings. Show progress indicators tracking bulk generator jobs.

### 6.7 Elasticsearch Sync & Migration Console
* **Rationale**: Admins can synchronize Postgres nodes and Elasticsearch clusters.
* **Requirements**:
  * Create a utility control dashboard.
  * Implement action triggers to sync indices: Users index, Documents index, Payments index, or Full database sync (asynchronously).
  * Render status results (e.g. *"Full sync job: 1450 users indexed successfully"*).
  * A "Recalculate Storage footprint" trigger button (SUPER_ADMIN only) to start background profile size migrations.

# 🚀 NeuroBank Technical Walkthrough

NeuroBank is a high-performance, microservices-based banking platform designed to simulate real-world fintech operations, including secure transactions, automated notifications, and distributed data consistency.

## 📐 System Architecture

NeuroBank follows a modern Microservices architecture, utilizing RabbitMQ for asynchronous event-driven communication and MongoDB for persistent storage per service.

```mermaid
graph TD
    subgraph Clients [Frontend Layer]
        C[Web Client - React/Vite]
        M[Mobile App - Expo/RN]
    end

    subgraph Gateway [Entry Point]
        AG[API Gateway / Direct Routing]
    end

    subgraph Services [Microservices Layer]
        Auth[Auth Service - Port 3001]
        Acc[Account Service - Port 3003]
        Trans[Transition Service - Port 3004]
        Notif[Notification Service]
    end

    subgraph Messaging [Message Broker]
        MQ[RabbitMQ]
    end

    subgraph Persistence [Data Layer]
        DB_Auth[(MongoDB - Auth)]
        DB_Acc[(MongoDB - Account)]
        DB_Trans[(MongoDB - Transition)]
    end

    Clients --> AG
    AG --> Auth
    AG --> Acc
    AG --> Trans

    Auth --> DB_Auth
    Acc --> DB_Acc
    Trans --> DB_Trans

    Auth -- "user_created" --> MQ
    Acc -- "account_created" --> MQ
    Trans -- "user_credited/debited" --> MQ

    MQ -- "sync account" --> Trans
    MQ -- "send alerts" --> Notif
```

## 🔄 The Transaction (Transition) Flow

When a user sends money, the system ensures atomicity and consistency through a multi-step ledger-based process:

```mermaid
sequenceDiagram
    participant User
    participant Client
    participant TransSvc as Transition Service
    participant MQ as RabbitMQ
    participant NotifSvc as Notification Service

    User->>Client: Initiate Transfer ($500)
    Client->>TransSvc: POST /api/transition/createTransition
    
    Note over TransSvc: 1. Validate Accounts & Status
    Note over TransSvc: 2. Calculate Balance (Ledger Sum)
    
    alt Insufficient Funds
        TransSvc-->>Client: Error: Insufficient Amount
    else Funds Available
        TransSvc->>TransSvc: Create 'pending' Transition
        TransSvc->>TransSvc: Record 'debit' in Ledger
        Note over TransSvc: Simulated Clearance Delay (15s)
        TransSvc->>TransSvc: Record 'credit' in Ledger
        TransSvc->>TransSvc: Update status to 'completed'
        
        TransSvc->>MQ: Publish 'user_credited' & 'user_debited'
        TransSvc-->>Client: Success: Transition Created
    end

    MQ->>NotifSvc: Consume Events
    NotifSvc->>User: Send Email Alerts (Credit/Debit)
```

## 🛠 Key Backend Implementations

### 1. Ledger-Based Accounting
Unlike simple balance updates, NeuroBank uses a **Ledger system**. The user's balance is calculated on-the-fly by summing up all credit and debit entries. This provides a robust audit trail and prevents common balance-update race conditions.

### 2. Event-Driven Data Sync
To avoid inter-service coupling, the **Transition Service** maintains a local copy of `Account` data. This data is kept in sync via RabbitMQ:
- When a new account is created in the **Account Service**, it publishes an `account.created` event.
- The **Transition Service** consumes this event and upserts the data into its local MongoDB.

### 3. Idempotency Support
The transaction system requires an `idempotencyKey` for every transfer. This ensures that even if a network retry occurs, the system will not process the same payment twice, protecting user funds.

### 4. Automated Notifications
The **Notification Service** is completely decoupled. It listens for various events (`user_created`, `user_credited`, etc.) and handles the complex logic of rendering HTML templates and dispatching emails via Nodemailer.

---
*Created as part of the NeuroBank Documentation.*

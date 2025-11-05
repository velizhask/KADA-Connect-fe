export const privacyPolicy = `# **KADA Connect Privacy Policy (Development Stage)**

**Effective Date:** November 2025  
**Entity:** Elice APAC Pte. Ltd. (a subsidiary of Elice Inc., Republic of Korea)  
**Applicable Regions:** Indonesia, Singapore, Republic of Korea

---

### **1\. Overview**

KADA Connect is a development-stage web platform under **Elice APAC Pte. Ltd.**, a Singapore-based subsidiary of **Elice Inc. (Republic of Korea)**, designed to support professional networking between **KADA trainees** and **partner companies** in ASEAN.

This Privacy Policy outlines how KADA Connect processes, stores, and safeguards user and institutional data during its **development and pre-launch phase**, in compliance with the **Personal Data Protection Law of Indonesia (UU No. 27/2022)**, the **Personal Data Protection Act (PDPA) of Singapore**, the **Personal Information Protection Act of the Republic of Korea**, and international standards such as the **GDPR**.

---

### **2\. Scope of Application**

This policy applies to data handled through the **KADA Connect microsite** ([https://kada-connect.vercel.app](https://kada-connect.vercel.app)) and its **upcoming deployment on git.elicer.io**, which will be hosted under Elice’s internal cloud infrastructure.

During this **development and Industry Visit phase**, the microsite is publicly accessible without login features. Certain trainee and company data are intentionally visible for **showcase, evaluation, and professional networking** within the scope of the KADA program.

---

### **3\. Purpose of Data Processing**

KADA Connect processes and stores data only for legitimate and clearly defined purposes:

* To display and match trainee profiles with company data for industry collaboration.

* To demonstrate Elice’s networking platform capabilities during the KADA Industry Visit.

* To support Elice’s data-driven education and regional talent development strategy.

* To enhance system usability, design, and backend integration for future authenticated release.

All personal data remain within the scope of educational and program objectives — not for marketing or resale.

---

### **4\. Categories of Personal Information**

| Category | Description | Example |
| :---- | :---- | :---- |
| **Trainee Data** | General profiles for visibility and matching | Name, cohort, major, portfolio summary |
| **Company Data** | Registered company profiles | Company name, logo, sector, description, contact link |
| **Uploaded Media** | Data imported from Google Sheets or Drive | Photos, logos, attachments |
| **System Data** | Operational or debugging info | Timestamps, request logs, browser details |

No sensitive or financial information is collected or shared publicly.

---

### **5\. Data Retention**

All KADA Connect data are stored and managed through **Supabase (PostgreSQL \+ Storage Bucket)** and **Elice GitLab Cloud Infrastructure**.

* Retention Period: Until completion of the **KADA Batch 2 program** and follow-up initiatives.

* Data may be retained for internal Elice APAC evaluation and ASEAN program development.

* Data deletion requests can be submitted via official email, but immediate removal may not be applicable during the program lifecycle.

---

### **6\. Hosting and Deployment Infrastructure**

The current deployment transition follows this setup:

| Environment | Platform | Region | Purpose |
| :---- | :---- | :---- | :---- |
| **Frontend** | GitLab Pages (via git.elicer.io CI/CD) | Singapore | Main web hosting managed under Elice internal server |
| **Backend** | Node.js \+ Express connected via API | Render (temporary) → git.elicer.io | Application logic and data management |
| **Database & Storage** | Supabase (PostgreSQL, Storage Bucket) | Singapore | Primary data storage for trainee and company profiles |
| **Integration (MVP)** | Google Sheets API | Global | Temporary data import source |
| **Version Control** | GitLab (Elice-managed) | Singapore | CI/CD automation and deployment control |

All network communications are encrypted (HTTPS/TLS), and access control is limited to authorized Elice APAC and KADA project team members.

---

### **7\. Public Visibility and Data Handling**

Since KADA Connect currently has no login system, some profile data (trainee name, company info, and portfolio links) are displayed **publicly for demonstration** during the KADA Industry Visit.

All publicly shown data are professional and non-sensitive.  
 Future versions will include:

* Role-based access (trainee, company, admin),

* Data visibility control by users, and

* Consent-based data sharing for career purposes.

---

### **8\. Security Measures**

Elice APAC ensures personal data safety through the following measures:

* Secure storage in **Supabase** with restricted API access.

* Controlled deployment within **Elice GitLab Cloud Environment (git.elicer.io)**.

* SSL/TLS encryption for all communications.

* File validation (size/type limits) before upload to prevent data overflow.

* Continuous system audit by Elice technical team to detect misuse or leaks.

---

### **9\. Third-Party Services**

KADA Connect utilizes limited third-party services only for data processing and hosting purposes:

| Service | Purpose | Compliance |
| :---- | :---- | :---- |
| **Supabase** | Database and file storage | PDPA (Singapore), GDPR |
| **Google Cloud** | Form and data integration | GDPR |
| **Render** (temporary) | Backend deployment | GDPR |
| **GitLab (Elice Internal)** | Deployment, CI/CD, version control | PDPA (Singapore), PIPA (Korea) |

No data are sold or transmitted to third parties beyond Elice’s internal operations.

---

### **10\. User Rights**

In accordance with PDPA, UU PDP, and PIPA, users have the right to:

* Request access to their personal data;

* Request correction of inaccurate data;

* Request deletion (where applicable after program completion);

* Inquire about data usage and transfer.

All requests can be submitted to **kada.id@elice.io** or **security@elicer.com** and will be handled by Elice APAC’s data protection officer.

---

### **11\. Data Controller Information**

**Data Controller:**  
 Elice APAC Pte. Ltd.  
 10 Anson Road, \#21-07, International Plaza, Singapore 079903  
 Email: \-

**Regional Data Contact (Indonesia):**  
 KADA Project Secretariat – Indonesia  
 Email: \-

**Parent Organization:**  
 Elice Inc. (Republic of Korea)

---

### **12\. Future Development and Data Migration**

After the Industry Visit, KADA Connect will advance into the **authenticated version** with:

* Secure login and user role management

* Consent-based data sharing model

* Integration with Elice’s unified learning platform (LXP)

* Institutional data analytics for ASEAN collaboration

At that stage, this Privacy Policy will be updated accordingly.

---

### **13\. Disclaimer**

KADA Connect (Development Stage) is a web platform developed under **Elice APAC Pte. Ltd.** for educational and networking purposes.  
The current system is used for **demonstration and data visibility during the KADA Industry Visit**, not for commercial operation.  
Elice APAC commits to responsible, lawful, and transparent handling of all personal and institutional data under the PDPA, UU PDP, and PIPA frameworks.
`;
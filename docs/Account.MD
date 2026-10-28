# ABOUT ACCOUNT 

An "ACCOUNT" serves as a control entity for all accounts dependent upon it; a "USER" can be associated with only one "ACCOUNT," whereas an "ACCOUNT" can have many "USERS."

The "type" attribute can be expanded to suit your specific needs. For instance, you could use it to distinguish between account types—such as business or personal accounts—or you could define it based on account categories, such as IT company, computer services, etc.

## Entity
```json
id: uuid
name: string
type: enum // Ex. ROOT, OPERATOR
status: enum // Ex. ACTIVE, SUSPENDED
taxIdentifier: string
cellphone: string | null
email: string | null
```
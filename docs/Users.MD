# ABOUT ACCOUNT 

A "USER" is the data actually used to perform authentication and meet other system requirements, it is associated with only one "ACCOUNT."

Although the "id" field is automatically generated—as it serves as the primary key—it has been designed to match the value of the account created within the IAM system. For instance, since I am using Keycloak as the IAM, the "user" ID must be the same as the one stored in Keycloak.

If the user creation process fails, a rollback must be performed to remove the user from both the database and IAM, preventing a creation error that would otherwise indicate the user already exists.

## Entity
```json
id: uuid
accountId: uuid
status: enum // Ex. ACTIVE, SUSPENDED
isMainAccount: boolean
name: string
cellphone: string | null
login: string
profileImageUrl: string | null
email: string | null
```
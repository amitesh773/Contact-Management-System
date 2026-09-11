# 📇 Contact Management System

A backend REST API for managing users, contacts, and contact groups.

Built using **Node.js, Express.js, TypeScript, Sequelize ORM, and MySQL**, with JWT-based authentication, password hashing, request validation, and a clean modular project structure.

🔗 **Repository:** https://github.com/amitesh773/Contact-Management-System

---

## 🚀 Features

### 👤 User Authentication

- User registration (signup)
- User login
- Password hashing using `bcrypt`
- JWT-based authentication
- Protected routes using authentication middleware
- User-specific data access (each user only sees their own data)

### 📇 Contact Management

Users can manage personal contacts with information such as:

- Name
- Email
- Phone
- Company
- Address
- City
- State
- Country
- Notes

Supported contact operations:

- Create contact
- Get all contacts
- Get contact by ID
- Update contact
- Delete contact

All contacts are scoped to the authenticated user.

### 👥 Contact Groups

Users can create and manage contact groups, for example:

- Family
- Friends
- Work
- Clients
- Custom Groups

Supported group operations:

- Create contact group
- Get all contact groups
- Get contact group by ID
- Update contact group
- Delete contact group

Each group belongs to the authenticated user.

### 🔐 Validation & Security

- JWT authentication
- Password hashing with `bcrypt`
- Request validation using `Joi`
- Protected API routes
- User-based data isolation
- Database-level unique constraints
- Centralized error handling

---

## 🛠️ Tech Stack

| Technology | Purpose                   |
| ---------- | ------------------------- |
| Node.js    | JavaScript runtime        |
| Express.js | REST API framework        |
| TypeScript | Type-safe development     |
| Sequelize  | ORM                       |
| MySQL      | Relational database       |
| JWT        | Authentication            |
| bcrypt     | Password hashing          |
| Joi        | Request validation        |
| dotenv     | Environment configuration |
| Nodemon    | Development server        |
| tsx        | TypeScript execution      |

Uses ES modules with a `dev` script powered by `nodemon` + `tsx`.

---

## 📁 Project Structure

```text
Contact-Management-System/
│
├── src/
│   │
│   ├── common/           # Common utilities / response handling
│   ├── config/            # Database and application configuration
│   ├── middleware/        # Authentication middleware
│   │
│   ├── models/
│   │   ├── user.ts
│   │   ├── contact.ts
│   │   └── contactGroup.ts
│   │
│   ├── modules/
│   │   ├── controllers/
│   │   │   ├── userController.ts
│   │   │   ├── contactController.ts
│   │   │   └── contactGroupController.ts
│   │   │
│   │   └── routers/
│   │       ├── userRouter.ts
│   │       ├── contactRouter.ts
│   │       └── contactGroupRouter.ts
│   │
│   ├── validation/        # Joi validation schemas
│   └── server.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json
```

---

## ⚙️ Installation

**1. Clone the repository**

```bash
git clone https://github.com/amitesh773/Contact-Management-System.git
```

**2. Move into the project**

```bash
cd Contact-Management-System
```

**3. Install dependencies**

```bash
npm install
```

---

## 🔧 Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_NAME=contact_management
DB_USER=root
DB_PASSWORD=your_password

JWT_SECRET=your_super_secret_key
```

> ⚠️ Use your actual database credentials and keep `.env` out of version control.

---

## ▶️ Run the Project

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

> Change the port according to your `.env` configuration.

---

## 🔐 Authentication Flow

```text
User
 │
 ├── Signup
 │      │
 │      └── Password → bcrypt hash
 │
 └── Login
        │
        ├── Email verification
        ├── Password verification
        └── JWT Token
                 │
                 ▼
          Protected Routes
                 │
                 ▼
           authMiddleware
                 │
                 ▼
        Authenticated User
```

---

## 🧪 API Testing

Recommended tool: **Postman**

Suggested testing order:

```text
1. Signup
2. Login
3. Get JWT token
4. Add Authorization header (Bearer <token>)
5. Create Contact
6. Get Contacts
7. Create Contact Group
8. Get Contact Groups
9. Update / Delete
```

---

## 📌 API Response Format

**Success**

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

**Error**

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

## 🚧 Planned Enhancements

### Contact ↔ Group Mapping (many-to-many)

```text
Contact
   │
   ▼
ContactGroupMember
   ▲
   │
ContactGroup
```

This would allow a single contact to belong to multiple groups, e.g.:

```text
Rahul
 ├── Friends
 └── Work
```

### Future Features

- [ ] Contact ↔ Group many-to-many mapping
- [ ] Add contact to group
- [ ] Remove contact from group
- [ ] Get all contacts inside a group
- [ ] Search contacts
- [ ] Contact pagination
- [ ] Sorting
- [ ] Filtering
- [ ] Profile management
- [ ] Forgot password
- [ ] Reset password
- [ ] Email verification
- [ ] Refresh tokens
- [ ] API documentation with Swagger
- [ ] Unit and integration tests
- [ ] Docker support
- [ ] Production deployment
- [ ] CI/CD pipeline

---

## 📈 Project Roadmap

```text
Authentication
     │
     ▼
Contact Management
     │
     ▼
Contact Groups
     │
     ▼
Contact ↔ Group Mapping
     │
     ▼
Search + Pagination
     │
     ▼
Swagger Documentation
     │
     ▼
Testing
     │
     ▼
Docker + Deployment
```

---

## 🤝 Contribution

Contributions are welcome!

```bash
# 1. Create a feature branch
git checkout -b feature/your-feature

# 2. Add your changes
git add .

# 3. Commit
git commit -m "Add your feature"

# 4. Push
git push origin feature/your-feature
```

Then open a Pull Request on GitHub.

---

## 📄 License

This project uses the **ISC License** as defined in `package.json`.

---

## 👨‍💻 Author

**Amitesh**

- GitHub: [@amitesh773](https://github.com/amitesh773)
- Project: [Contact-Management-System](https://github.com/amitesh773/Contact-Management-System)

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub!

---

### Project Status

🚧 **Active Development** — being enhanced with additional contact-management and grouping features.
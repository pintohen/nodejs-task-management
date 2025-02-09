import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://localhost:27017/nodejs_base",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",


  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    task: {
      name: "TaskController",
      path: "../controllers/taskController"
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    task: {
      name: "TaskRepo",
      path: "../repos/taskRepo"
    },
  },

  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    task: {
      name: "TaskService",
      path: "../services/taskService"
    },
  },

  schema: {
    user: {
      name: "userSchema",
      path: "../persistence/schemas/userSchema"
    },
    role: {
      name: "roleSchema",
      path: "../persistence/schemas/roleSchema"
    },
    task: {
      name: "taskSchema",
      path: "../persistence/schemas/taskSchema"
    },
  }
};

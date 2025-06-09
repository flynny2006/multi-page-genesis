import fs from 'fs/promises';
import path from 'path';
import type { User } from '../../types/user';

const USERS_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

interface UserData {
  users: User[];
  lastUpdated: string;
}

// Ensure the data directory exists
async function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Initialize users.json if it doesn't exist
async function initializeUsersFile() {
  try {
    await fs.access(USERS_FILE_PATH);
  } catch {
    const initialData: UserData = {
      users: [],
      lastUpdated: new Date().toISOString()
    };
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(initialData, null, 2));
  }
}

// Read all users
export async function readUsers(): Promise<User[]> {
  await ensureDataDirectory();
  await initializeUsersFile();
  
  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const userData: UserData = JSON.parse(data);
    return userData.users;
  } catch (error) {
    console.error('Error reading users:', error);
    return [];
  }
}

// Save a new user
export async function saveUser(user: User): Promise<void> {
  await ensureDataDirectory();
  await initializeUsersFile();

  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const userData: UserData = JSON.parse(data);
    
    // Check if user already exists
    const existingUserIndex = userData.users.findIndex(u => u.id === user.id);
    
    if (existingUserIndex >= 0) {
      // Update existing user
      userData.users[existingUserIndex] = {
        ...user,
        updatedAt: new Date().toISOString()
      };
    } else {
      // Add new user
      userData.users.push({
        ...user,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    }

    userData.lastUpdated = new Date().toISOString();
    
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(userData, null, 2));
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
}

// Update user data
export async function updateUser(userId: string, updates: Partial<User>): Promise<void> {
  await ensureDataDirectory();
  await initializeUsersFile();

  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const userData: UserData = JSON.parse(data);
    
    const userIndex = userData.users.findIndex(u => u.id === userId);
    if (userIndex >= 0) {
      userData.users[userIndex] = {
        ...userData.users[userIndex],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      userData.lastUpdated = new Date().toISOString();
      await fs.writeFile(USERS_FILE_PATH, JSON.stringify(userData, null, 2));
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(userId: string): Promise<void> {
  await ensureDataDirectory();
  await initializeUsersFile();

  try {
    const data = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const userData: UserData = JSON.parse(data);
    
    userData.users = userData.users.filter(u => u.id !== userId);
    userData.lastUpdated = new Date().toISOString();
    
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(userData, null, 2));
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.id === userId) || null;
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readUsers();
  return users.find(u => u.email === email) || null;
} 
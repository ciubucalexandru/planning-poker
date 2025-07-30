export interface Room {
  id: number;
  room_code: string;
  created_at: string;
  is_active: boolean;
}

export interface User {
  id: number;
  username: string;
  session_id: string;
  joined_at: string;
}

export interface Task {
  id: number;
  room_id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'voting' | 'completed';
  created_at: string;
}

export interface RoomUser {
  room_id: number;
  user_id: number;
  is_moderator: boolean;
  joined_at: string;
}

export interface Estimate {
  task_id: number;
  user_id: number;
  value: number;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: Room;
        Insert: Omit<Room, 'id'>;
        Update: Partial<Room>;
      };
      users: {
        Row: User;
        Insert: Omit<User, 'id'>;
        Update: Partial<User>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id'>;
        Update: Partial<Task>;
      };
      room_users: {
        Row: RoomUser;
        Insert: RoomUser;
        Update: Partial<RoomUser>;
      };
      estimates: {
        Row: Estimate;
        Insert: Estimate;
        Update: Partial<Estimate>;
      };
    };
  };
}

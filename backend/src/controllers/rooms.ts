import express from 'express';
import supabase from '../db/supabaseClient';
import { COOKIE_NAME } from '../helpers/constants';
import { nanoid } from 'nanoid';
import { v4 as uuidv4 } from 'uuid';

export const createRoom = async (req: express.Request, res: express.Response) => {
  try {
    const roomCode = nanoid(6);
    const userSession = uuidv4();
    const { username } = req.body;

    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .insert([{ room_code: roomCode }])
      .select('*');
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ username: username, session_id: userSession }])
      .select('*');

    if (!roomData || !userData) {
      return res.status(400).json({
        error: 'Failed to create room or user.',
      });
    }

    const { data: roomUserData, error: roomUserError } = await supabase
      .from('room_users')
      .insert([{ room_id: roomData[0]?.id, user_id: userData[0].id, is_moderator: true }])
      .select('*');

    if (roomError || userError || roomUserError) {
      throw roomError || userError || roomUserError;
    }

    res.cookie(COOKIE_NAME, userSession, { httpOnly: true, secure: false });
    res.status(201).json({
      room_id: roomData[0].id,
      room_code: roomData[0].room_code,
      username: userData[0].username,
      is_administrator: roomUserData[0].is_moderator,
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      error: 'An error occurred while creating the room.',
    });
  }
};

export const getRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { data, error } = await supabase
      .from('room_users')
      .select(
        `
    *,
    users!inner(*),
    rooms!inner(*)
  `,
      )
      .eq('users.session_id', req.cookies[COOKIE_NAME]);

    const { data: tasksData, error: tasksError } = await supabase
      .from('tasks')
      .select('*')
      .eq('room_id', data[0]?.rooms.id);

    if (!data || !tasksData) {
      return res.status(404).json({
        error: 'Room not found.',
      });
    }

    if (error || tasksError) throw error || tasksError;

    res.status(200).json({
      is_moderator: data[0].is_moderator,
      room_code: data[0].rooms.room_code,
      room_id: data[0].rooms.id,
      username: data[0].users.username,
      tasks: tasksData.map((task) => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      })),
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while fetching the room.',
    });
  }
};

import express from 'express';
import supabase from '../db/supabaseClient';
import { COOKIE_NAME } from '../helpers/constants';
import { v4 as uuidv4 } from 'uuid';

export const joinRoom = async (req: express.Request, res: express.Response) => {
  try {
    const { room_code, username } = req.body;

    if (!room_code || !username) {
      return res.status(400).json({
        error: 'Room code and username are required.',
      });
    }

    const { data: roomData, error: roomError } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_code', room_code)
      .single();

    if (!roomData) {
      return res.status(404).json({
        error: 'Room not found.',
      });
    }

    if (roomError) throw roomError;

    const userSession = uuidv4();
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert([{ username: username, session_id: userSession }])
      .select('*')
      .single();

    if (!userData) {
      return res.status(400).json({
        error: 'Failed to create user.',
      });
    }

    if (userError) throw userError;

    const { data: roomUserData, error: roomUserError } = await supabase
      .from('room_users')
      .insert([{ room_id: roomData.id, user_id: userData[0].id, isModerator: false }]);

    if (!roomUserData) {
      return res.status(400).json({
        error: 'Failed to join room.',
      });
    }

    if (roomUserError) throw roomUserError;

    res.cookie(COOKIE_NAME, userSession, { httpOnly: true, secure: true });
    res.status(200).json({
      room: roomData,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while creating the room.',
    });
  }
};

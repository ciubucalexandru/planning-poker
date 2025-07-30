import express from 'express';
import supabase from '../db/supabaseClient';
import { COOKIE_NAME } from '../helpers/constants';

export const createTask = async (req: express.Request, res: express.Response) => {
  try {
    const session_id = req.cookies[COOKIE_NAME];

    if (!session_id) {
      return res.status(401).json({
        error: 'No active room found for this user',
      });
    }

    const { data: roomUserData, error: roomUserError } = await supabase
      .from('room_users')
      .select('*')
      .eq('user_id', supabase.from('users').select('id').eq('session_id', session_id))
      .single();

    if (!roomUserData) {
      return res.status(400).json({
        error: 'Failed to create task or find room user.',
      });
    }

    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .insert([
        {
          description: req.body.description,
          title: req.body.title,
          room_id: roomUserData.room_id,
        },
      ])
      .single();

    if (!taskData) {
      return res.status(400).json({
        error: 'Failed to create task.',
      });
    }

    if (roomUserError || taskError) {
      throw roomUserError || taskError;
    }

    res.status(201).json({
      task: taskData,
    });
  } catch (error) {
    res.status(500).json({
      error: 'An error occurred while creating the room.',
    });
  }
};

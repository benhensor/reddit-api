import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/authSlice';

export default function Callback() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  useEffect(() => {
    if (code) {
      dispatch(login(code)).then(() => {
        navigate('/');
      });
    }
  }, [code, dispatch, navigate]);

  return <div>Logging in...</div>;
}
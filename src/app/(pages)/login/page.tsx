"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import Styles from './Login.module.css'
import logo from '@/app/assets/logo.svg'

const SingIn = () => {
    const router = useRouter();
    const apiurl = process.env.NEXT_PUBLIC_API_URL;
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!apiurl) {
        alert('App configuration error: API URL is missing. Check your .env file.');
        return;
      }
      setIsSubmitting(true);
      try {
        const response = await fetch(apiurl + '/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: formData.email, password: formData.password })
        });
        if (response.ok) {
          const data = await response.json();
          console.log('Token:', data.token);
          router.push('/ebook-library');
          return;
        }
        const data = await response.json().catch(() => ({}));
        alert(data.message || 'Login failed');
      } catch (error) {
        console.error('Error:', error);
        alert('Error logging in. Check that the server is running and NEXT_PUBLIC_API_URL is correct.');
      } finally {
        setIsSubmitting(false);
      }
    }

  return (
    <div className={Styles.signInContainer}>
      <Image 
        src={logo}
        alt='Logo'
        width={150} 
        height={50} 
        className={Styles.logo}
      />
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={formData.email} onChange={handleChange} required/>

        <div style={{
          display: 'flex', 
          justifyContent: 'space-between',
          width:'100%',
          alignItems: 'end'
          }}>
          <label htmlFor="password">Password</label>
          <a href="/#" className={Styles.fp}>Forgot Password?</a>
        </div>
        
        <input type="password" id="password" value={formData.password} onChange={handleChange} required/>

        <button type="submit" className={Styles.signInButton} disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>  
      </form>
      <p className={Styles.dontHaveAccount}>
        Don&apos;t have an account? 
        <a href="/signup" className={Styles.signupLink}>Sign Up</a>
      </p>
    </div>
  )
}

export default SingIn
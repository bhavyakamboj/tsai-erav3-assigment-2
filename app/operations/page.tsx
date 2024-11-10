'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFileAlt, FaMicrophone, FaImage, FaCube, FaEvernote } from 'react-icons/fa';
import React from 'react';

export default function Page() {
  const router = useRouter()
  return (
    <div style={containerStyle}>
      <Hero />
      <div style={iconWrapperStyle}>
        <div style={iconContainerStyle}>
        <Link href="/operations/text" style={linkStyle}>
            <FaFileAlt size={50} />
            <p>Text</p>
          </Link>
          <Link href="/operations/image" style={linkStyle}>
            <FaImage size={50} />
            <p>Image</p>
          </Link>
          <Link href="/operations/audio" style={linkStyle}>
            <FaMicrophone size={50} />
            <p>Audio</p>
          </Link>
          <Link href="/operations/three-d" style={linkStyle}>
            <FaCube size={50} />
            <p>3D</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div style={heroStyle}>
      <h1>Multi Modal Processing and Augmentation</h1>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
};

const heroStyle: React.CSSProperties = {
  marginBottom: '40px',
  fontFamily: '"Impact", "Arial Black", sans-serif',
  fontSize: '2.5rem',
  color: '#333',
};

const iconWrapperStyle: React.CSSProperties = {
  width: '70%',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '8px',
};

const iconContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '20px',
  width: '100%',
};

const linkStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textDecoration: 'none',
  color: 'black',
  border: '1px solid #ccc',
  padding: '20px',
  borderRadius: '8px',
  transition: 'transform 0.2s',
};
import Link from 'next/link';
import { FaFileAlt, FaMicrophone, FaVideo, FaCube } from 'react-icons/fa';

import React from 'react';

export default function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>What would you like to process?</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: '40px' }}>
        <Link href="/text">
          <a style={linkStyle}>
            <FaFileAlt size={50} />
            <p>Text</p>
          </a>
        </Link>
        <Link href="/audio">
          <a style={linkStyle}>
            <FaMicrophone size={50} />
            <p>Audio</p>
          </a>
        </Link>
        <Link href="/video">
          <a style={linkStyle}>
            <FaVideo size={50} />
            <p>Video</p>
          </a>
        </Link>
        <Link href="/3d">
          <a style={linkStyle}>
            <FaCube size={50} />
            <p>3D</p>
          </a>
        </Link>
      </div>
    </div>
  );
}

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

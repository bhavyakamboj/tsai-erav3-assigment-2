'use client';

import { Fragment, useState } from 'react';
import { FaFileAlt, FaMicrophone, FaImage, FaCube } from 'react-icons/fa';
import React from 'react';

export default function Operations() {
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);

  const renderComponent = () => {
    switch (selectedOperation) {
      case 'text':
        return <TextComponent />;
      case 'image':
        return <ImageComponent />;
      case 'audio':
        return <AudioComponent />;
      case 'three-d':
        return <ThreeDComponent />;
      default:
        return <Hero />;
    }
  };

  return (
    <div style={containerStyle}>
      <div style={iconWrapperStyle}>
        <div style={iconContainerStyle}>
          <div onClick={() => setSelectedOperation('text')} style={linkStyle}>
            <FaFileAlt size={50} />
            <p>Text</p>
          </div>
          <div onClick={() => setSelectedOperation('image')} style={linkStyle}>
            <FaImage size={50} />
            <p>Image</p>
          </div>
          <div onClick={() => setSelectedOperation('audio')} style={linkStyle}>
            <FaMicrophone size={50} />
            <p>Audio</p>
          </div>
          <div onClick={() => setSelectedOperation('three-d')} style={linkStyle}>
            <FaCube size={50} />
            <p>3D</p>
          </div>
        </div>
      </div>
      <div style={componentWrapperStyle}>
        {renderComponent()}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <Fragment>
      <div style={heroStyle}>
        <h3>Multi Modal Processing and Augmentation</h3>
      </div>
      <h3>Select an operation to get started</h3>
    </Fragment>
  );
}

function TextComponent() {
  return <div>Text Component</div>;
}

function ImageComponent() {
  return <div>Image Component</div>;
}

function AudioComponent() {
  return <div>Audio Component</div>;
}

function ThreeDComponent() {
  return <div>3D Component</div>;
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
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
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  padding: '20px',
  borderRadius: '8px',
  backgroundColor: '#ffffff', // Changed to white or remove this line to have no background color
};

const iconContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '20px',
  width: '100%',
  maxWidth: '600px',
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
  cursor: 'pointer',
};

const componentWrapperStyle: React.CSSProperties = {
  marginTop: '20px',
  width: '100%',
  maxWidth: '800px',
  padding: '20px',
  backgroundColor: '#ffffff', // Changed to white or remove this line to have no background color
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};
import React, { useState } from 'react';
import PDFFile from './PDFFile';
import Navbar from './Navbar';

const GenerateTranscript = () => {
  return (
    <div className="flex flex-row">
      <div>
      <Navbar />
      </div>
      <div className="my-24 mx-24">
      <PDFFile />     
      </div>

    </div>
  );
};

export default GenerateTranscript;
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import './BugForm.css'; 

const BugForm = ({ onSubmit }) => {
  const [repository, setRepository] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState('');
  const [priority, setPriority] = useState('');
  const [commitLink, setCommitLink] = useState('');
  const [bugStatus, setBugStatus] = useState('');
  const [solveLink, setSolveLink] = useState('');
  const [assignedMP, setAssignedMP] = useState('');

  const handleBugSubmit = () => {
    const bugData = {
      repository,
      description,
      severity,
      priority,
      commitLink,
      bugStatus,
      solveLink,
      assignedMP,
    };

    if (onSubmit && typeof onSubmit==='function') {
      onSubmit(bugData);

      setRepository('');
      setDescription('');
      setSeverity('');
      setPriority('');
      setCommitLink('');
      setBugStatus('NEREZOLVAT');
      setSolveLink('');
      setAssignedMP('');
    }
  };

  return (
    <div>
      <h2>Formular de raportare bug</h2>
      <div className="form-group">
        <label className="form-label">
          Repository: {' '}
          <input type="text" value={repository} onChange={(e) => setRepository(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Descriere: {' '}
          <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          Severitate: {' '}
          <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option value="">-- Selectează severitatea --</option>
            <option value="slaba">Slabă</option>
            <option value="medie">Medie</option>
            <option value="mare">Mare</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Prioritate: {' '}
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="">-- Selectează prioritatea --</option>
            <option value="mica">Mică</option>
            <option value="medie">Medie</option>
            <option value="mare">Mare</option>
            <option value="urgent_rau_de_tot">URGENT RAU DE TOT</option>
          </select>
        </label>
        <br />
        <label className="form-label">
          Link commit: {' '}
          <input type="text" value={commitLink} onChange={(e) => setCommitLink(e.target.value)} />
        </label>
        <br />

        <label className="form-label">
          Bug Status: {' '}
          <select value={bugStatus} onChange={(e) => setBugStatus(e.target.value)}>
            <option value="">-- Selectează status-ul bug-ului --</option>
            <option value="NEREZOLVAT">NEREZOLVAT</option>
            <option value="REZOLVAT">REZOLVAT</option>
          </select>
        </label>
        <br />

        <label className="form-label">
          Link Rezolvare: {' '}
          <input type="text" value={solveLink} onChange={(e) => setSolveLink(e.target.value)} />
        </label>
        <br />
        <label className="form-label">
          MP Responsabil: {' '}
          <input type="text" value={assignedMP} onChange={(e) => setAssignedMP(e.target.value)} />
        </label>
        <br />
      </div>
      <button onClick={handleBugSubmit}>Înregistrează Bug</button>
    </div>
  );
};

export default BugForm;

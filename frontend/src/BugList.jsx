/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BugList = () => {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bugs');
        setBugs(response.data);
      } catch (error) {
        console.error('Error fetching bugs:', error);
      }
    };

    fetchData();
  }, []); 

  return (
    <div>
      <h2>Bug List</h2>
      <table>
        <thead>
          <tr>
            <th>Descriere</th>
            <th>Severitate</th>
            <th>Prioritate</th>
            <th>Link Commit</th>
            <th>Status Bug</th>
            <th>Link Rezolvare</th>
            <th>MP Responsabil</th>
          </tr>
        </thead>
        <tbody>
          {bugs.map((bug) => (
            <tr key={bug.id}>
              <td>{bug.description}</td>
              <td>{bug.severity}</td>
              <td>{bug.priority}</td>
              <td>{bug.commitLink}</td>
              <td>{bug.bugStatus}</td>
              <td>{bug.solveLink}</td>
              <td>{bug.assignedMP}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BugList;
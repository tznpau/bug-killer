/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const ProjectForm = ({role, projects, setProjects, onProjectSubmit, onMakeTST }) => {
  
    const [repository, setRepository] = useState('');
    const [team, setTeam] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [projectStatus, setProjectStatus] = useState([]);
  
    const handleRepositoryChange = (e) => {
      setRepository(e.target.value);
    };
  
    const handleTeamChange = (e) => {
      setTeam(e.target.value);
    };
  
    const handleProjectSubmit = () => {
      if (!repository || !team) {
        setErrorMessage('Completati repository si echipa.')
        return;
      }

      if (role === 'MP') {
        onProjectSubmit({ repository, team });
        setProjects([...projects, {repository, team}]);
        setSuccessMessage('Proiect înregistrat cu succes!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

      } else {
            setErrorMessage('Doar MP poate înregistra proiecte.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }

      setRepository('');
      setTeam('');
    };

  // Funcție pentru afișarea statusului proiectului
  const showProjectStatus = () => {
    // Afișează proiectele în consolă sau poți afișa în alt mod
    console.log('Statusul proiectelor:', projectStatus);
  };


    return (
        <div>
            {/* Secțiune pentru înregistrarea proiectului */}
            <h3>Înregistrare Proiect</h3>
            <label>
            Repository Proiect:
            <input type="text" value={repository} onChange={handleRepositoryChange} />
            </label>
            <br />
            <label>
            Echipa Proiect:
            <input type="text" value={team} onChange={handleTeamChange} />
            </label>
            <br />
            <button onClick={handleProjectSubmit}>Înregistrează Proiect</button>
            <button onClick={onMakeTST}>Vreau sa fiu TST</button>
        
            {/* Buton pentru afișarea statusului proiectului */}
            <button onClick={showProjectStatus}>Vezi Statusul Proiectului</button>
        


        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
    );

};

export default ProjectForm;
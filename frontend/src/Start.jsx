/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './style.css';
import Login from './Login';
import ProjectForm from './ProjectForm';
import BugForm from './BugForm';

import ProjectList from './ProjectList';
import BugList from './BugList';


const Start = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('MP');

    const [users, setUsers] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [projects, setProjects] = useState([]); // stare pentru proiecte
    // const [bugFormVisible, setBugFormVisible] = useState(false); // redundant?
    // const [repository, setRepository] = useState('');
    // const [team, setTeam] = useState('');
    // const [teamNames, setTeamNames] = useState([]); // stare pentru nume de echipe
    const [existingRepositories, setExistingRepositories] = useState([]); // repos create deja


    // Login Logout logic ----------------------------------------------------
    const handleLogout = () => {
        setIsLoggedIn(false);
        setRole('MP'); // Resetează rolul la MP la deconectare
    };

    const handleLogin = () => {
        // Validare campuri
        if (!name || !email || !role) {
            setErrorMessage('Toate câmpurile trebuie completate.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        // Validare nume
        if (name.length < 2) {
            setErrorMessage('Numele trebuie să aibă cel puțin 2 caractere.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        // Validare email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setErrorMessage('Adresa de email nu are un format valid.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
            return;
        }

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            setIsLoggedIn(true);
            setErrorMessage('');
            setSuccessMessage(`Bun venit, ${existingUser.name}!`);

            setRole(existingUser.role);

            // if (existingUser.role === 'TST') {
            //     setBugFormVisible(true);
            // } else {
            //     setBugFormVisible(false);
            // }

            // Mesaj de succes temporar
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000); // Mesajul de succes va dispărea după 3 secunde


            // Verificam daca utilizatorul existent este de tip MP si il adaugam in lista de MP si echipe create de el
            if (existingUser.role === 'MP') {
                setMpsAndTeams(prevMpsAndTeams => ({
                    ...prevMpsAndTeams,
                    [existingUser.name]: { teams: [] }, // Initializam o lista goala de echipe
                }));
            }

        } else {
            const newUser = { name, email, role };
            setUsers([...users, newUser]);
            setIsLoggedIn(true);
            setErrorMessage('');
            console.log(`Bine ai venit, ${name}!`);
        }
    };
    // END Login Logout logic ----------------------------------------------------

    // Bug Form Logic ----------------------------------------------------
    const handleBugSubmit = (bugData) => {
        console.log('Bug data received: ', bugData);
        // de trimis catre server catre bd
        if (role === 'TST' && bugData.repository) {
            if (existingRepositories.includes(bugData.repository)) {
                // ar trebui adaugate info in bd
                
                console.log('Bug inregistrat: ', bugData);
                setSuccessMessage('Bug inregistrat cu succes.')

            } else {
                // repo nu exista
                setErrorMessage('Repository specificat nu exista!');
                setTimeout(() => {
                    setErrorMessage('');
                }, 3000);
            }
        } 
    };



    const handleBugAllocation = (bugId) => {
        // Verificăm dacă utilizatorul curent este MP și nu are deja un bug alocat
        if (role === 'MP' && !allocatedBug) {
            setAllocatedBug(bugId);
            setSuccessMessage('Bug alocat cu succes!');
        } else {
            setErrorMessage('Doar MP poate aloca bug-uri și poate avea un bug alocat la un moment dat.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };

     // END Bug Form Logic ----------------------------------------------------


      // Project Form Logic ----------------------------------------------------

    const handleProjectSubmit = (projectData) => {
        if (role === 'MP') {

            // setSuccessMessage('Proiect înregistrat cu succes!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);

        } else {
            setErrorMessage('Doar MP poate înregistra proiecte.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };




    const handleMakeTST = () => {
        // Verificăm dacă utilizatorul curent este MP
        if (role === 'MP') {
            // Actualizăm rolul utilizatorului la 'TST'
            console.log("aici esti MP");
            setRole('TST');
            console.log("aici esti TST");
            setSuccessMessage('Te-ai transformat în TST cu succes!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 3000);
            // setBugFormVisible(false); // Activăm formularul de bug pentru TST
        } else {
            setErrorMessage('Doar MP poate deveni TST.');
            setTimeout(() => {
                setErrorMessage('');
            }, 3000);
        }
    };



    return (
        <div>
            <Login
                name={name}
                email={email}
                role={role}
                onNameChange={(e) => setName(e.target.value)}
                onEmailChange={(e) => setEmail(e.target.value)}
                onRoleChange={(e) => setRole(e.target.value)}
                onLogin={handleLogin}
                onLogout={handleLogout}
            />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}



            {isLoggedIn && role === 'MP' && (
                <ProjectForm
                    role={role}
                    projects={projects}
                    setProjects={setProjects}
                    onProjectSubmit={(projectData) => {
                        handleProjectSubmit(projectData)
                        console.log("am ajuns in MP");
                    }} onMakeTST={handleMakeTST}
                />
            )}

            {isLoggedIn && role === 'TST' && (
                <BugForm
                    onSubmit={handleBugSubmit}
                    role={role}
                    projects={projects}
                    setProjects={setProjects}
                    onProjectSubmit={(projectData) => {
                        handleProjectSubmit(projectData);
                        console.log("am ajuns in TST");
                    }}
                    onMakeTST={handleMakeTST}
                />
            )}

            <div>
                <ProjectList />
                <BugList />
            </div>



        </div>
    );

};

export default Start;
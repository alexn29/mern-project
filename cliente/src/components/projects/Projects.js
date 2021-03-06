import React from 'react';
import Sidebar from '../layout/Sidebar';
import TopBar from '../layout/TopBar';
import FormTask from '../tasks/FormTask';
import TaskList from '../tasks/TaskList';

const Projects = () => {
    return (
        <div className="contenedor-app">
            <Sidebar />
            <div className="seccion-principal">
                <TopBar />
                <main>
                    <FormTask />
                    <div className="contenedor-tareas">
                        <TaskList />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Projects;
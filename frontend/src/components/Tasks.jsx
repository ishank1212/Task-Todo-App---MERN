import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: '/tasks', method: 'get', headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then((data) => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: 'delete', headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <div className="container mx-auto max-w-screen-md my-6 p-4">
      {tasks.length > 0 ? (
        <div>
          {loading ? (
            <Loader />
          ) : (
            <div>
              {tasks.map((task, index) => (
                <div
                  key={task._id}
                  className="bg-gradient-to-r from-blue-300 via-blue-500 to-purple-500 my-4 p-4 text-white rounded-lg shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{index + 1}</span>
                    <div className="flex space-x-4">
                      <Tooltip text="Edit this task" position="top">
                        <Link to={`/tasks/${task._id}`} className="text-green-600">
                          <i className="fa-solid fa-pen"></i>
                        </Link>
                      </Tooltip>
                      <Tooltip text="Delete this task" position="top">
                        <span className="text-red-600 cursor-pointer" onClick={() => handleDelete(task._id)}>
                          <i className="fa-solid fa-trash"></i>
                        </span>
                      </Tooltip>
                    </div>
                  </div>
                  <div className="mt-2">{task.description}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-4">
          <p className="text-lg font-semibold text-gray-700">No tasks found</p>
          <Link to="/tasks/add" className="btn btn-primary">
            + Add New Task
          </Link>
        </div>
      )}
    </div>
  );
};

export default Tasks;

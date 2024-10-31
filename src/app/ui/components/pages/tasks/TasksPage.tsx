'use client';

import React from 'react';
import useCreateTaskMutation from '@/hooks/useCreateTaskMutation';
import toast from 'react-hot-toast';
import { Task, TaskStatus } from '@/interfaces/task';
import Button from '../../common/Button';
import { Add } from '../../common/icons/Add';
import TaskCard from '../../common/TaskCard';
import CreateTaskForm from '../../forms/CreateTaskForm';
import TaskTabs from './Tabs';
import useTasks from '@/hooks/useTasks';
import { TaskSkeleton, TasksList, TaskListEmpty } from './TasksList';

import Pagination from '../../common/Pagination';
import ModalDeleteTask from '../../common/ModalDeleteTask';
import useUpdateTaskMutation from '@/hooks/useUpdateTaskMutation';
import useDeleteTaskMutation from '@/hooks/useDeleteTaskMutation';

const ITEMS_PER_PAGE = 9;

export default function TasksPage() {
  const [showModalTask, setShowModalTask] = React.useState(false);

  const [taskToUpdate, setTaskToUpdate] = React.useState<Task>();

  const [taskToDelete, setTaskToDelete] = React.useState<string>();

  const [filterTabs, setFilterTabs] = React.useState<{
    page: number;
    status: TaskStatus;
  }>({
    page: 1,
    status: TaskStatus.PENDING,
  });

  const {
    data: tasks,
    total: totalTasks,
    isLoading: tasksLoading,
    handleInvalidate,
  } = useTasks(filterTabs);

  // create task mutation
  const { isPending, createTask } = useCreateTaskMutation({
    onSuccess: () => {
      setShowModalTask(false);
      handleInvalidate();
      toast.success('Tarea creada exitosamente');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  // Update task mutation
  const { isPending: updateTaskPending, updateTask } = useUpdateTaskMutation({
    onSuccess: () => {
      setTaskToUpdate(undefined);
      handleInvalidate();
      toast.success('Tarea actualizada exitosamente');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  // Update task mutation
  const { deleteTask } = useDeleteTaskMutation({
    onSuccess: () => {
      setTaskToDelete(undefined);
      handleInvalidate();
      toast.success('Tarea eliminada exitosamente');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const scrollToTopSmoothly = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <TaskTabs
        currentTab={filterTabs.status!}
        setCurrentTab={(tab) => {
          setFilterTabs({
            page: 1,
            status: tab,
          });
        }}
      />

      <div className='my-4 flex justify-end '>
        <Button onClick={() => setShowModalTask(true)}>
          <Add />
          <span>Crear Tarea</span>
        </Button>
      </div>

      <hr className='my-4' />

      {tasksLoading ? <TaskSkeleton /> : null}

      {!tasksLoading && tasks && tasks?.length === 0 ? (
        <TaskListEmpty onCliCkCreate={() => setShowModalTask(true)} />
      ) : null}

      {!tasksLoading && tasks && tasks?.length > 0 ? (
        <div>
          <TasksList>
            {tasks?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onClickDelete={() => setTaskToDelete(task.id)}
                onClickEdit={() => setTaskToUpdate(task)}
                onClickUpdateStatus={(status) => {
                  updateTask({
                    id: task.id,
                    status,
                  });
                }}
              />
            ))}
          </TasksList>

          <div className='w-full flex items-center justify-center py-4'>
            <Pagination
              totalPages={
                totalTasks ? Math.ceil(totalTasks / ITEMS_PER_PAGE) : 1
              }
              currentPage={filterTabs.page}
              onPageChange={(page) => {
                scrollToTopSmoothly();
                setFilterTabs({
                  page,
                  status: filterTabs.status,
                });
              }}
            />
          </div>
        </div>
      ) : null}

      {showModalTask ? (
        <CreateTaskForm
          isOpenModal={showModalTask}
          onCloseModal={() => setShowModalTask(false)}
          loading={isPending}
          onSubmit={(data) => {
            const bodyToCreate = {
              ...data,
              status: filterTabs.status,
            };
            createTask(bodyToCreate);
          }}
        />
      ) : null}

      {taskToUpdate ? (
        <CreateTaskForm
          isOpenModal={Boolean(taskToUpdate)}
          onCloseModal={() => setTaskToUpdate(undefined)}
          initialValues={taskToUpdate}
          loading={updateTaskPending}
          isUpdating
          onSubmit={(data) => {
            updateTask({
              ...data,
              id: taskToUpdate?.id,
            });
          }}
        />
      ) : null}

      {taskToDelete && (
        <ModalDeleteTask
          open={Boolean(taskToDelete)}
          onClose={() => setTaskToDelete(undefined)}
          onClickDelete={() => {
            if (taskToDelete) {
              deleteTask(taskToDelete);
            }
          }}
        />
      )}

      {/* <FAB /> */}
    </div>
  );
}


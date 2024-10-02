import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import Greeting from './Greeting';
import { UserType } from './HW3';

type GreetingContainerPropsType = {
   users: UserType[];
   addUserCallback: (name: string) => void;
};

export const pureAddUser = (
   name: string,
   setError: (error: string | null) => void,
   setName: (name: string) => void,
   addUserCallback: (name: string) => void
) => {
   pureOnBlur(name, setError);
   addUserCallback(name);
   setName('');
   // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
};

export const pureOnBlur = (
   name: string,
   setError: (error: string | null) => void
) => {
   // если имя пустое - показать ошибку
   if (name.trim() === '') {
      setError('Ошибка! Введите имя!');
   }
};

export const pureOnEnter = (
   e: KeyboardEvent<HTMLInputElement>,
   addUser: () => void
) => {
   // если нажата кнопка Enter - добавить
   if (e.key === 'Enter') {
      addUser();
   }
};

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
   users,
   addUserCallback,
}) => {
   // деструктуризация пропсов
   const [name, setName] = useState<string>('');
   const [error, setError] = useState<string | null>('');

   const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
      setName(e.currentTarget.value);

      error && setError(null);
   };
   const addUser = () => {
      pureAddUser(name, setError, setName, addUserCallback);
   };

   const onBlur = () => {
      pureOnBlur(name, setError);
   };

   const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
      pureOnEnter(e, addUser);
   };

   const totalUsers = users.length;
   let lastUserName;
   if (totalUsers > 0) {
      lastUserName = users[users.length - 1].name; // need to fix
   } else {
      lastUserName = '';
   }

   return (
      <Greeting
         name={name}
         setNameCallback={setNameCallback}
         addUser={addUser}
         onBlur={onBlur}
         onEnter={onEnter}
         error={error}
         totalUsers={totalUsers}
         lastUserName={lastUserName}
      />
   );
};

export default GreetingContainer;

import React from 'react';

import preview from 'assets/preview.jpg';

import './style.scss';

export const Home = () => {
  const games = [
    {
      logo: 'https://upload.wikimedia.org/wikipedia/ru/thumb/2/22/World_of_Warcraft_logo.png/274px-World_of_Warcraft_logo.png',
      name: 'World of Warcraft',
      id: 0,
      genre: 'Action',
      author: 'Blizzard',
      price: '20$',
    },
    {
      logo: 'https://upload.wikimedia.org/wikipedia/ru/thumb/1/1c/Titan_Quest.jpg/274px-Titan_Quest.jpg',
      name: 'Titan quest',
      id: 1,
      genre: 'Adventure',
      author: 'Microsoft',
      price: '19.99$',
    },
    {
      id: 2,
      logo: 'https://upload.wikimedia.org/wikipedia/ru/thumb/b/bd/The_Last_of_Us_Cover.jpg/274px-The_Last_of_Us_Cover.jpg',
      name: 'The last of us',
      genre: 'Quest',
      author: 'Naughty Dogs',
      price: '33$',
    },
  ];
  return (
    <div className="home">
      <img src={preview} className="home__preview"></img>
      <div className="games">
        {games.map((game) => (
          <div className="games__card" key={game.id}>
            <img src={game.logo} className="games__logo"></img>
            <p className="games__name">Name: {game.name}</p>
            <p className="games__genre">Genre: {game.genre}</p>
            <p className="games__author">Author: {game.author}</p>
            <p className="games__price">Price: {game.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

import React from 'react';

import './style.scss';

export const About = () => {
  return (
    <div className="about">
      <h3 className="about__name">About Us</h3>
      <span className="about__description">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </span>
      <h3 className="about__contact"> Contact Us</h3>
      <p className="about__email">Email: example@example.com</p>
      <p className="about__phone">Phone: +375441111111</p>
    </div>
  );
};

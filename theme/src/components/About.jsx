import React from "react";

const About = () => {
  return (
    <div>
      <div className="text-center mt-9">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Know Who I am!
        </h2>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt impedit
          eum cupiditate ab beatae nobis, nihil sit perferendis saepe possimus?
          Magnam, accusantium!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </a>
          <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

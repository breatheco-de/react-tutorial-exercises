import ReactDOM from "react-dom";
import { WhatToRender } from "./app.jsx";
import renderer from "react-test-renderer";

const fs = require('fs');
const path = require('path');

const app_content = fs.readFileSync(path.resolve(__dirname, './app.jsx'), 'utf8');

jest.mock("react-dom", () => ({ render: jest.fn() }));

test("ReactDOM.render needs to be called once", () => {
  expect(ReactDOM.render.mock.calls.length).toBe(1);
});

test("The component should return the exact HTML", () => {
  const tree = renderer.create(ReactDOM.render.mock.calls[0][0]).toJSON();
  expect(tree).toMatchInlineSnapshot(`
<ul>
  <li>
    Horse
  </li>
  <li>
    Turtle
  </li>
  <li>
    Elephant
  </li>
  <li>
    Monkey
  </li>
</ul>
`);
});

test("You should use singleAnimal to get the animal for each of the iterations", () => {
    expect(app_content).toMatch("{singleAnimal}");
})

test("You should add the key for each of them and it should be unique", () => {
    expect(app_content).toMatch("key={i}");
})

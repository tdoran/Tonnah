import React from "react";

import {
  renderIntoDocument,
  Simulate,
  prettyDOM,
  render,
  fireEvent
} from "react-testing-library";

import fetchMock from "fetch-mock";
import { getData } from "../../utils/datahelpers.js";
import { dummyResponse, dummyArray } from "./dummyresponse";

// FETCH-MOCK: use fetch-mock to mock API call
fetchMock.get("begin:http://api.giphy.com/", { dummyResponse });
getData()
  .then(console.log)
  .catch(err => console.log(err.message));

import Board from "./Board";

describe("Test board works", () => {
  test("Score and button render on pageload", () => {
    const { getByText } = render(<Board />);
    const scoreNode = getByText("score: 0");
    expect(scoreNode).toBeTruthy();
    const buttonNode = getByText("Go!");
    expect(buttonNode).toBeTruthy();
  });
});

describe("Test board works", () => {});

// fetchMock.restore();

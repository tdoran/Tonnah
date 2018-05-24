import React from "react";
// import ReactDOM from "react-dom";
import {
  renderIntoDocument,
  Simulate,
  prettyDOM,
  render,
  fireEvent
} from "react-testing-library";
// import TestUtils from "react-dom/test-utils";
import fetchMock from "fetch-mock";
import { getData } from "../../utils/datahelpers.js";
import { dummyResponse, dummyArray } from "./dummyresponse";

// use fetch-mock to mock API call
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

  // test("Timer and Singlephoto render on Go button click", () => {
  //   const { getByText, getByTestId, getByAltText } = render(<Board />);
  //   const buttonNode = getByText("Go!");
  //   Simulate.click(buttonNode);
  //   const timerNode = getByTestId("timer");
  //   expect(timerNode).toBeTruthy();
  //   const firstImageNode = getByAltText("First image");
  //   expect(firstImageNode).toBeTruthy();
  // });
});

describe("Test board works", () => {});

// fetchMock.restore();

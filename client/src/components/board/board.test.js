import React from "react";
import {
  renderIntoDocument,
  Simulate,
  prettyDOM,
  render,
  fireEvent,
  wait
} from "react-testing-library";

import fetchMock from "fetch-mock";
import { getData } from "../../utils/datahelpers.js";
import { dummyResponse, dummyArray } from "./dummyresponse";
const data = dummyResponse;

// FETCH-MOCK: use fetch-mock to mock API call
fetchMock.get("begin:http://api.giphy.com/", { data });

import Board from "./Board";

describe("Test board works", () => {
  test("Score and button render on pageload", () => {
    const { getByText } = render(<Board />);
    const scoreNode = getByText("score: 0");
    expect(scoreNode).toBeTruthy();
    const buttonNode = getByText("Go!");
    expect(buttonNode).toBeTruthy();
  });

  test("Timer and Singlephoto render on Go button click", async () => {
    const { getByText, getByTestId, getByAltText } = renderIntoDocument(
      <Board />
    );
    const buttonNode = getByText("Go!");
    await wait(() => fireEvent.click(buttonNode));

    const timerNode = getByTestId("timer");
    expect(timerNode).toBeTruthy();
    const firstImageNode = getByTestId("singlephoto");
    expect(firstImageNode).toBeTruthy();
  });
});

// fetchMock.restore();

import App from "../../components/App";
import { render, fireEvent, waitForElement } from "@testing-library/react";

describe("<App />", () => {
  test("should show the component with Loading screen", async () => {
    render(<App />);
  });
});

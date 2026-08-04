import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("renders the header and 14 property cards", () => {
    const { container } = render(<App />);

    expect(screen.getByText("Apex Living")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search homes")).toBeInTheDocument();
    expect(container.querySelectorAll("article")).toHaveLength(14);
  });

  it("renders a known property card", () => {
    const { container } = render(<App />);

    expect(container.querySelectorAll('h2')[1]?.textContent).toBe('Harbor House');
  });
});

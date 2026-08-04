import { fireEvent, render, screen } from "@testing-library/react";
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

  it("renders the dark mode toggle button with label matching current theme", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Light");
  });

  it("toggles label between Light and Dark on click", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });

    expect(button).toHaveTextContent("Light");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Dark");

    fireEvent.click(button);
    expect(button).toHaveTextContent("Light");
  });

  it("adds and removes the dark class on the html element when toggled", () => {
    render(<App />);
    const button = screen.getByRole("button", { name: /switch to dark mode/i });

    expect(document.documentElement.classList.contains("dark")).toBe(false);

    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(true);

    fireEvent.click(button);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});

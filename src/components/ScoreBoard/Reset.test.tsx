import React, { FC } from "react";
import { fireEvent, render, screen } from "@testing-library/react";

import { Reset } from "./Reset";

describe("Reset button check", () => {
  const ResetWithDummyHandlerOnReset: FC = () => <Reset onReset={() => {}} />;
  it("Should render elements with default state", () => {
    render(<ResetWithDummyHandlerOnReset />);
    expect(screen.getByText("🙃")).toBeInTheDocument();
  });

  it("onReset handler sould be called", () => {
    const onResetMock = jest.fn();
    render(<Reset onReset={onResetMock} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onResetMock).toHaveBeenCalled();
  });

  it("Should change state when onMouseDown and onMouseUp events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙃"));
    expect(screen.getByText("😮")).toBeInTheDocument();
    fireEvent.mouseUp(screen.getByText("😮"));
    expect(screen.getByText("🙃")).toBeInTheDocument();
  });

  it("Should change state when onMouseDown and onMouseLeave events happened", () => {
    render(<ResetWithDummyHandlerOnReset />);

    fireEvent.mouseDown(screen.getByText("🙃"));
    expect(screen.getByText("😮")).toBeInTheDocument();
    fireEvent.mouseLeave(screen.getByText("😮"));
    expect(screen.getByText("🙃")).toBeInTheDocument();
  });
});

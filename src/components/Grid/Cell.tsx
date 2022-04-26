import React, { FC } from "react";
import styled from "@emotion/styled";

import { Cell as CellType, CellState, Coords } from "@/helpers/Field";
import { useMouseDown } from "@/hooks/useMouseDown";

interface CloseFrameProps {
  mouseDown?: boolean;
}

export const ClosedFrame = styled.div<CloseFrameProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  cursor: pointer;
  width: 1.8vh;
  height: 1.8vh;
  background-color: #d1d1d1;
  border: 0.6vh solid transparent;
  border-color: ${({ mouseDown = false }) =>
    mouseDown ? "transparent" : " white #9e9e9e #9e9e9e white"};
  &:hover {
    filter: brightness(1.1);
  }
`;

const RevealedFrame = styled(ClosedFrame)`
  border-color: #dddddd;
  cursor: default;
  font-size: 1em;
  color: ${({ children }) => colors[children as CellType] ?? transparent};
  &:hover {
    filter: brightness(1);
  }
`;

const Bomb = styled.div`
  border-radius: 50%;
  width: 1vh;
  height: 1vh;
  background-color: #333;
`;

const BombFrame = styled(RevealedFrame)`
  background-color: #ec433c;
`;

const Flag = styled.div`
  width: 0px;
  height: 0px;
  border-top: 0.5vh solid transparent;
  border-bottom: 0.5vh solid transparent;
  border-left: 0.5vh solid #ec433c;
`;

const TransparentFlag = styled(Flag)`
  border-left: 0.5vh solid #f19996;
`;

const transparent = "rgba(0,0,0,0)";
const colors: { [k in CellType]: string } = {
  0: "#000",
  1: "#2a48ec",
  2: "#2bb13d",
  3: "#ec6561",
  4: "#233db7",
  5: "#a6070f",
  6: "#e400af",
  7: "#906a02",
  8: "#fa0707",
  9: transparent,
  10: transparent,
  11: transparent,
  12: transparent,
};

export interface CellProps {
  /**
   * Cell status based on thr CellType
   */
  children: CellType;

  /**
   * Cell coordonates
   */
  coords: Coords;

  /**
   * onClick by cell handler
   */
  onClick: (coords: Coords) => void;

  /**
   * onContextMenu by cell handler
   */
  onContextMenu: (coords: Coords) => void;
}

interface ComponentsMapProps {
  children: CellType;
  onClick: (elem: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (elem: React.MouseEvent<HTMLElement>) => void;
  mouseDown: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  "data-testid"?: string;
  role?: string;
}

const ComponentsMap: FC<ComponentsMapProps> = ({ children, ...rest }) => {
  const nonActiveCellProps = {
    onContextMenu: rest.onContextMenu,
    "data-testid": rest["data-testid"],
    role: rest?.role,
  };

  switch (children) {
    case CellState.empty:
      return <RevealedFrame {...nonActiveCellProps} />;
    case CellState.bomb:
      return (
        <BombFrame {...nonActiveCellProps}>
          <Bomb />
        </BombFrame>
      );
    case CellState.mark:
      return (
        <ClosedFrame {...rest}>
          <Flag />
        </ClosedFrame>
      );
    case CellState.weakMark:
      return (
        <ClosedFrame {...rest}>
          <TransparentFlag />
        </ClosedFrame>
      );
    case CellState.hidden:
      return <ClosedFrame {...rest} />;
    default:
      return <RevealedFrame {...nonActiveCellProps}>{children}</RevealedFrame>;
  }
};

export const checkCellIsActive = (cell: CellType): boolean =>
  [CellState.hidden, CellState.mark, CellState.weakMark].includes(cell);

export const Cell: FC<CellProps> = ({ children, coords, ...rest }) => {
  const [mouseDown, onMouseDown, onMouseUp] = useMouseDown();
  const isActiveCell = checkCellIsActive(children);

  const onClick = () => rest?.onClick(coords);
  const onContextMenu = (elem: React.MouseEvent<HTMLElement>) => {
    /**
     * Prevent context menu by default
     */
    elem.preventDefault();

    if (isActiveCell) {
      rest.onContextMenu(coords);
    }
  };

  const props = {
    onClick,
    onContextMenu,
    mouseDown,
    onMouseDown,
    onMouseUp,
    onMouseLeave: onMouseUp,
    "data-testid": `${coords}`,
    role: "cell",
  };

  return <ComponentsMap {...props}>{children}</ComponentsMap>;
};

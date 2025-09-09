import { useRef } from "react";
import Join from "./Join";
import { CSSTransition } from "react-transition-group";

export const JoinOverlay: React.FC = () => {
  const nodeRef = useRef(null);

  return (
    <>
      <CSSTransition
        in={true}
        timeout={0}
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: "0.7",
            zIndex: 998,
          }}
        />
      </CSSTransition>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 999, 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Join />
      </div>
    </>
  );
};

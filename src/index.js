import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";

function SignAture(props, ref) {
  const canvas = useRef(null);
  const ctx = useRef(null);
  const isDrawing = useRef(false);

  useImperativeHandle(ref, () => ({
    getImg: () => canvas.current.toDataURL(),
    clear: () =>
      ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height),
  }));

  useEffect(() => {
    ctx.current = canvas.current.getContext("2d");

    canvas.current.addEventListener("mousedown", start);
    canvas.current.addEventListener("mousemove", draw);
    canvas.current.addEventListener("mouseup", stop);
    canvas.current.addEventListener("mouseleave", stop);

    canvas.current.addEventListener("touchstart", start);
    canvas.current.addEventListener("touchmove", draw);
    canvas.current.addEventListener("touchend", stop);
    canvas.current.addEventListener("touchcancel", stop);
  }, []);

  useEffect(() => {
    if (ctx.current) {
      init();
    }
  }, [ctx.current]);

  function start(e) {
    isDrawing.current = true;
    draw(e);
  }
  function stop() {
    isDrawing.current = false;
    ctx.current.beginPath();
  }

  function draw(e) {
    if (!isDrawing.current) return;

    const [x, y] = getCourdinates(e);

    ctx.current.lineTo(x, y);
    ctx.current.stroke();
  }

  const getCourdinates = (e) => {
    if (e.type.includes("touch")) {
      e.preventDefault();
      return [
        e.touches[0].pageX - canvas.current.offsetLeft,
        e.touches[0].pageY - canvas.current.offsetTop,
      ];
    }
    return [e.offsetX, e.offsetY];
  };

  function init() {
    canvas.width = props.width;
    canvas.height = props.height;
    ctx.current.fillStyle = "black";
    ctx.current.lineCap = "round";
    ctx.current.lineJoin = "round";
    ctx.current.lineWidth = 3;
  }

  return (
    <canvas ref={canvas} {...props}>
      {props.children || "Your browser is rabbish"}
    </canvas>
  );
}

export default forwardRef(SignAture);

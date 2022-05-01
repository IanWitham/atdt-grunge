import { Theme, useTheme } from "./utils/theme-provider";

type BulbParams = {
  x: number;
  y: number;
  phase: number;
};

const Bulb = ({ x, y, phase }: BulbParams) => {
  const delay = [
    "[animation-delay:-750ms]",
    "[animation-delay:-500ms]",
    "[animation-delay:-250ms]",
    "",
  ][phase];

  return (
    <>
      <circle cx={x} cy={y} r="4" className="fill-[#222]" />
      <circle cx={x} cy={y} r="1" className="fill-[#a75100]" />
      <circle
        cx={x}
        cy={y}
        r="4"
        className={"bulb animate-bulb fill-white " + delay}
      />
    </>
  );
};

const points: number[][] = [
  // vertical
  [18, 580],
  [16.8, 540],
  [15.6, 500],
  [14.4, 460],
  [13.1, 420],
  [11.9, 380],
  [10.7, 340],
  [9.5, 300],
  [8.3, 260],
  [7.1, 220],
  [5.9, 180],
  [4.6, 140],
  [3.4, 100],
  [13.5, 66.5],
  [50, 57],
  [90, 57],
  [130, 57],

  // horizontal
  [170, 57],
  [210, 57],
  [236, 57],
  [236, 30],
  [236, 4],
  [251, 19.5],
  [265, 35],
  [278, 50.5],
  [290, 66],
  [303, 82],
  [315, 97.5],

  [325, 114], // point

  [315, 129.5],
  [302, 145],
  [289, 160.5],
  [276, 177.2],
  [263, 193.4],
  [250, 209.9],
];

export default function Sign() {
  const [theme] = useTheme();

  return (
    <div>
      <svg
        className="h-screen"
        viewBox="-40 0 386 592"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <defs>
          <pattern
            id="image"
            x="0"
            y="-0"
            patternUnits="userSpaceOnUse"
            width="400"
            height="600"
          >
            <image
              x="0"
              y="0"
              height="100%"
              xlinkHref={
                theme !== Theme.LIGHT
                  ? "/_static/redwall.jpg"
                  : "/_static/redwall-light.jpg"
              }
            ></image>
          </pattern>
          <path
            d="M21.3698719,591 C7.55531617,299.683674 0.6480383,140.650759 0.6480383,113.901253 C0.6480383,73.7769954 12.2944152,57.4589126 39.0194337,57.4589126 C56.8361126,57.4589126 123.01062,57.4589126 237.542955,57.4589126 L237.542955,0.0624726672 L325.002086,113.901253 L237.542955,227.446593 L237.542955,158.08362 L45.744559,158.08362 L45.744559,591 L21.3698719,591 Z"
            id="SignShape"
            fill="url(#image)"
          ></path>
          <clipPath clipPathUnits="userSpaceOnUse" id="SignClip">
            <use xlinkHref="#SignShape" />
          </clipPath>
          <circle id="Bulb" cx="0" cy="0" r="6" />
        </defs>
        <use xlinkHref="#SignShape" />
        {/* <image
              preserveAspectRatio="xMinYMin slice"
              xlinkHref="istockphoto-1157807104-1024x1024.jpg"
              clipPath="url(#SignClip)"
            /> */}
        {points.map(([x, y], i) => (
          <Bulb x={x} y={y} phase={i % 4} key={i} />
        ))}
        {/* <text
              x="0"
              y="140"
              transform="rotate(-10)"
              className="text-4xl neon-back font-neon"
            >
              At The Drive-Thru
            </text> */}
        {/* <text
            x="0"
            y="140"
            transform="rotate(-10)"
            className="neon [text-shadow:0 0 5px #ffa500, 0 0 15px #ffa500, 0 0 20px #ffa500, 0 0 40px #ffa500, 0 0 60px #ff0000, 0 0 10px #ff8d00, 0 0 98px #ff0000] animate-buzz fill-white font-neon text-4xl"
          >
            At The Drive-Thru
          </text> */}
      </svg>
    </div>
  );
}

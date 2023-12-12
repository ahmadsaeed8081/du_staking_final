import React from "react";

function LogoutIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="21"
      height="21"
      fill="none"
      viewBox="0 0 21 21"
    >
      <path fill="url(#pattern0)" d="M0 0H21V21H0z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.0119)" xlinkHref="#image0_28_5"></use>
        </pattern>
        <image
          id="image0_28_5"
          width="84"
          height="84"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}

export default LogoutIcon;

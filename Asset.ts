import React, {FC} from 'react';
import {IconProps} from '@app/constants/types';
import Svg, {Path} from 'react-native-svg';
const GiftIcon: FC<IconProps> = props => {
  const {width = 24, height = 24, color = '#6A1CCD'} = props;
  return (
    <Svg width={width} height={height} fill="none">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M3.333 9.168v3.333c0 2.75 0 4.125.855 4.98.854.854 2.229.854 4.979.854h1.667c2.75 0 4.124 0 4.979-.855.854-.854.854-2.229.854-4.979V9.168"
      />
      <Path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M2.5 7.503c0-.623 0-.935.167-1.167.11-.152.268-.278.458-.366.29-.134.68-.134 1.458-.134h10.834c.778 0 1.168 0 1.458.134.19.088.348.214.457.366.168.232.168.544.168 1.167s0 .934-.168 1.166c-.11.152-.267.279-.457.366-.29.134-.68.134-1.458.134H4.583c-.779 0-1.168 0-1.458-.134a1.158 1.158 0 0 1-.458-.366C2.5 8.437 2.5 8.126 2.5 7.503ZM5 3.156c0-.822.666-1.488 1.488-1.488h.298A3.214 3.214 0 0 1 10 4.882v.953H7.679C6.199 5.835 5 4.635 5 3.156ZM15 3.156c0-.822-.666-1.488-1.488-1.488h-.298A3.214 3.214 0 0 0 10 4.882v.953h2.321c1.48 0 2.679-1.2 2.679-2.679Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M10 9.168v9.167"
      />
    </Svg>
  );
};
export {GiftIcon};

import React from 'react';
import { TextStyle } from 'react-native';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface GradientTextProps {
  colors: string[];
  children?: string | React.ReactNode;
  style?: TextStyle;
  start?: { x: number; y: number };
  end?: { x: number; y: number };
}

// True gradient text using SVG - matches web's bg-clip-text exactly
const GradientText = ({
  colors,
  children,
  style,
}: GradientTextProps) => {
  const fontSize = (style?.fontSize as number) || 40;
  const fontFamily = (style?.fontFamily as string) || 'Inter_800ExtraBold';
  const textAlign = (style?.textAlign as string) || 'center';

  // Convert children to string
  const text = typeof children === 'string' ? children : children ? String(children) : '';

  // Calculate text width (approximate) - more accurate for better rendering
  const textWidth = text.length * fontSize * 0.62;
  const lineHeight = (style?.lineHeight as number) || fontSize * 1.2;

  return (
    <Svg
      height={fontSize}
      width={textWidth}
      viewBox={`0 0 ${textWidth} ${fontSize}`}
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      <Defs>
        <SvgLinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor={colors[0]} stopOpacity="1" />
          <Stop offset="50%" stopColor={colors[1]} stopOpacity="1" />
          <Stop offset="100%" stopColor={colors[2]} stopOpacity="1" />
        </SvgLinearGradient>
      </Defs>
      <SvgText
        fill="url(#grad)"
        fontSize={fontSize}
        fontWeight="800"
        fontFamily={fontFamily}
        x={0}
        y={fontSize * 0.82}
        textAnchor="start"
      >
        {text}
      </SvgText>
    </Svg>
  );
};

export default GradientText;

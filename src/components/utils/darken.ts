/**
 * 降低颜色亮度
 */
export function darken(color: string, amount: number = 10): string {
  // 获取 R、G、B 参数值
  let rgb: number[] | null | undefined = [];
  let alpha = 1;
  if (color.match(/^#/)) {
    // 处理 16 进制颜色字符串
    rgb = hexToRgb(color);
  } else if (color.match(/^rgb/)) {
    // 处理 RGB 颜色字符串
    rgb = color
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i)
      ?.slice(1)
      ?.map(value => {
        return Number(value);
      });
    alpha = rgb?.[3] ?? 1;
  } else {
    // 非法颜色值则直接返回原始颜色
    return color;
  }
  // 将 RGB 映射到 HSL 以降低亮度
  // @ts-ignore
  const hsl = rgbToHsl(...rgb);
  const [h, s, l] = hsl;
  const newRgb = hslToRgb(h, s, Math.max(l - amount / 100, 0));
  return `rgba(${newRgb[0]}, ${newRgb[1]}, ${newRgb[2]}, ${alpha})`;
}

/**
 * 16禁止转rgb
 * @param hex
 * @returns
 */
function hexToRgb(hex: string): number[] | null {
  const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!match) {
    return null;
  }
  return [
    parseInt(match[1], 16),
    parseInt(match[2], 16),
    parseInt(match[3], 16),
  ];
}

function rgbToHsl(r: number, g: number, b: number): number[] {
  // 将 RGB 映射到 HSL 以降低亮度
  const [R, G, B] = [r / 255, g / 255, b / 255];
  const MAX = Math.max(R, G, B);
  const MIN = Math.min(R, G, B);
  const delta = MAX - MIN;
  let h = 0;
  let s = 0;
  let l = (MAX + MIN) / 2;

  if (delta !== 0) {
    s = l < 0.5 ? delta / (MAX + MIN) : delta / (2 - MAX - MIN);

    switch (MAX) {
      case R:
        h = (G - B) / delta + (G < B ? 6 : 0);
        break;
      case G:
        h = (B - R) / delta + 2;
        break;
      case B:
        h = (R - G) / delta + 4;
        break;
      default:
        break;
    }
  }

  return [h * 60, s, l];
}

function hslToRgb(h: number, s: number, l: number): number[] {
  const C = (1 - Math.abs(2 * l - 1)) * s;
  const X = C * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - C / 2;

  const [Rp, Gp, Bp] = (() => {
    if (h >= 0 && h < 60) {
      return [C, X, 0];
    }
    if (h >= 60 && h < 120) {
      return [X, C, 0];
    }
    if (h >= 120 && h < 180) {
      return [0, C, X];
    }
    if (h >= 180 && h < 240) {
      return [0, X, C];
    }
    if (h >= 240 && h < 300) {
      return [X, 0, C];
    }
    if (h >= 300 && h < 360) {
      return [C, 0, X];
    }
    return [0, 0, 0];
  })();
  return [
    Math.round((Rp + m) * 255),
    Math.round((Gp + m) * 255),
    Math.round((Bp + m) * 255),
  ];
  // return `rgb(${Math.round((Rp + m) * 255)}, ${Math.round(
  //   (Gp + m) * 255,
  // )}, ${Math.round((Bp + m) * 255)})`;
}

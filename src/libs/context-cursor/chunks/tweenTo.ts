type TweenVars = {
  x?: number;
  y?: number;
  scale?: number;
  width?: number;
  height?: number;
  borderRadius?: number | string;
  boxShadow?: string;
  filter?: string;
  backgroundImage?: string;
};

const TRANSITION_PROPS = [
  "transform",
  "width",
  "height",
  "border-radius",
  "box-shadow",
  "filter",
  "background-image",
].join(", ");

function getCurrentTransform(el: HTMLElement) {
  const transform = el.style.transform;
  if (!transform) return {};

  const current: { x?: number; y?: number; scale?: number } = {};
  const translateX = transform.match(/translateX\(([-\d.]+)px\)/);
  const translateY = transform.match(/translateY\(([-\d.]+)px\)/);
  const scale = transform.match(/scale\(([-\d.]+)\)/);

  if (translateX) current.x = parseFloat(translateX[1]);
  if (translateY) current.y = parseFloat(translateY[1]);
  if (scale) current.scale = parseFloat(scale[1]);

  return current;
}

function applyVars(el: HTMLElement, vars: TweenVars) {
  const hasTransformVar =
    vars.x != null || vars.y != null || vars.scale != null;

  if (hasTransformVar) {
    const current = getCurrentTransform(el);
    const x = vars.x ?? current.x;
    const y = vars.y ?? current.y;
    const scale = vars.scale ?? current.scale;

    const transforms: string[] = [];
    if (x != null) transforms.push(`translateX(${x}px)`);
    if (y != null) transforms.push(`translateY(${y}px)`);
    if (scale != null) transforms.push(`scale(${scale})`);

    if (transforms.length) {
      el.style.transform = transforms.join(" ");
    }
  }

  if (vars.width != null) el.style.width = `${vars.width}px`;
  if (vars.height != null) el.style.height = `${vars.height}px`;

  if (vars.borderRadius != null) {
    el.style.borderRadius =
      typeof vars.borderRadius === "number"
        ? `${vars.borderRadius}px`
        : vars.borderRadius;
  }

  if (vars.boxShadow != null) el.style.boxShadow = vars.boxShadow;
  if (vars.filter != null) el.style.filter = vars.filter;
  if (vars.backgroundImage != null) {
    el.style.backgroundImage = vars.backgroundImage;
  }
}

export function tweenTo(
  el: HTMLElement,
  duration: number,
  vars: TweenVars
) {
  el.style.transition = TRANSITION_PROPS.split(", ")
    .map((prop) => `${prop} ${duration}s ease-out`)
    .join(", ");
  applyVars(el, vars);
}

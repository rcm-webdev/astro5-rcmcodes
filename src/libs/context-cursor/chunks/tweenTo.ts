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

function applyVars(el: HTMLElement, vars: TweenVars) {
  const transforms: string[] = [];

  if (vars.x != null) transforms.push(`translateX(${vars.x}px)`);
  if (vars.y != null) transforms.push(`translateY(${vars.y}px)`);
  if (vars.scale != null) transforms.push(`scale(${vars.scale})`);

  if (transforms.length) {
    el.style.transform = transforms.join(" ");
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

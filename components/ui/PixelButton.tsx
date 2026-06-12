import { cn } from "@/lib/cn";

type CommonProps = {
  children: React.ReactNode;
  variant?: "amber" | "green" | "ghost";
  className?: string;
};

type AnchorProps = CommonProps & {
  href: string;
  /** Opens in a new tab with safe rel attributes. */
  external?: boolean;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

type ButtonProps = CommonProps & {
  href?: undefined;
  external?: undefined;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  ariaLabel?: string;
};

/**
 * Minecraft-style push button. Renders an <a> when `href` is given,
 * otherwise a <button>. The raised face sits inside a dark outline and
 * presses down on :active.
 */
export function PixelButton(props: AnchorProps | ButtonProps) {
  const { children, variant = "amber", className } = props;
  const classes = cn("pixel-btn pix", `pixel-btn--${variant}`, className);

  const inner = (
    <>
      <span className="pixel-btn-face pix-sm" aria-hidden="true" />
      <span className="pixel-btn-label">{children}</span>
    </>
  );

  if ("href" in props && typeof props.href === "string") {
    return (
      <a
        href={props.href}
        onClick={props.onClick}
        className={classes}
        {...(props.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }

  const { onClick, type = "button", ariaLabel } = props as ButtonProps;
  return (
    <button
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
    >
      {inner}
    </button>
  );
}
